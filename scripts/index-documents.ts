import { createClient } from "@supabase/supabase-js"
import { openai } from "@ai-sdk/openai"
import fs from "fs"
import path from "path"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

// Supabase-Client mit dem Service-Key initialisieren
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.SUPABASE_SERVICE_KEY || "")

// Funktion zum Erstellen von Embeddings
async function getEmbedding(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    })
    return response.data[0].embedding
  } catch (error) {
    console.error("Fehler beim Erstellen des Embeddings:", error)
    throw error
  }
}

// Funktion zum Aufteilen von Dokumenten in Chunks
async function splitDocument(text: string, metadata: Record<string, any> = {}) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const docs = await splitter.createDocuments([text], [metadata])
  return docs
}

// Funktion zum Indexieren eines einzelnen Dokuments
async function indexDocument(
  filePath: string,
  options: {
    category?: string
    documentType?: string
    importance?: "high" | "medium" | "low"
  } = {},
) {
  console.log(`Indexiere Dokument: ${filePath}`)

  try {
    // Dateiinhalt lesen
    const content = fs.readFileSync(filePath, "utf8")

    // Metadaten erstellen
    const fileName = path.basename(filePath)
    const fileExt = path.extname(filePath)
    const title = path.basename(filePath, fileExt)

    const metadata = {
      source: fileName,
      category: options.category || "allgemein",
      documentType: options.documentType || "dokument",
      importance: options.importance || "medium",
      lastUpdated: new Date().toISOString(),
    }

    // Dokument in Chunks aufteilen
    const docs = await splitDocument(content, metadata)
    console.log(`Dokument in ${docs.length} Chunks aufgeteilt`)

    // Jeden Chunk in die Datenbank speichern
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i]
      const chunkTitle = `${title} (Teil ${i + 1}/${docs.length})`

      // Embedding erstellen
      const embedding = await getEmbedding(doc.pageContent)

      // In Supabase speichern
      const { error } = await supabase.from("company_knowledge").insert({
        title: chunkTitle,
        content: doc.pageContent,
        metadata: doc.metadata,
        embedding,
      })

      if (error) {
        throw new Error(`Fehler beim Speichern in Supabase: ${error.message}`)
      }

      console.log(`Gespeichert: ${chunkTitle}`)
    }

    return docs.length
  } catch (error) {
    console.error(`Fehler beim Indexieren von ${filePath}:`, error)
    throw error
  }
}

// Hauptfunktion zum Indexieren aller Dokumente in einem Verzeichnis
async function indexDirectory(
  dirPath: string,
  options: {
    recursive?: boolean
    fileTypes?: string[]
    category?: string
  } = {},
) {
  const recursive = options.recursive !== false
  const fileTypes = options.fileTypes || [".txt", ".md", ".pdf", ".docx"]

  console.log(`Indexiere Verzeichnis: ${dirPath}`)
  console.log(`Optionen: Rekursiv=${recursive}, Dateitypen=${fileTypes.join(", ")}`)

  try {
    // Prüfen, ob das Verzeichnis existiert
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Verzeichnis existiert nicht: ${dirPath}`)
    }

    // Alle Dateien im Verzeichnis lesen
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })

    let totalChunks = 0

    // Jede Datei verarbeiten
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)

      if (entry.isDirectory() && recursive) {
        // Rekursiv Unterverzeichnisse indexieren
        const subDirChunks = await indexDirectory(fullPath, {
          ...options,
          category: options.category || entry.name,
        })
        totalChunks += subDirChunks
      } else if (entry.isFile()) {
        // Prüfen, ob der Dateityp unterstützt wird
        const ext = path.extname(entry.name).toLowerCase()
        if (fileTypes.includes(ext)) {
          // Dokument indexieren
          const documentType = ext.replace(".", "")
          const chunks = await indexDocument(fullPath, {
            category: options.category,
            documentType,
          })
          totalChunks += chunks
        }
      }
    }

    console.log(`Indexierung abgeschlossen. Insgesamt ${totalChunks} Chunks erstellt.`)
    return totalChunks
  } catch (error) {
    console.error(`Fehler beim Indexieren des Verzeichnisses ${dirPath}:`, error)
    throw error
  }
}

// Beispielaufruf
async function main() {
  try {
    // Zuerst die Datenbank einrichten
    const setupScript = await import("./setup-supabase")

    // Dann Dokumente indexieren
    const docsDir = path.join(process.cwd(), "documents")
    await indexDirectory(docsDir, {
      recursive: true,
      fileTypes: [".txt", ".md", ".pdf", ".docx"],
    })

    console.log("Indexierung aller Dokumente abgeschlossen!")
  } catch (error) {
    console.error("Fehler beim Ausführen des Indexierungsskripts:", error)
  }
}

main()
