import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { openai } from "@ai-sdk/openai"
import { writeFile } from "fs/promises"
import { join } from "path"
import { mkdir } from "fs/promises"
import { existsSync } from "fs"

// Supabase-Client initialisieren
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

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

// Funktion zum Aufteilen von Text in Chunks
function splitIntoChunks(text: string, chunkSize = 1000, overlap = 200) {
  const chunks = []
  let i = 0

  while (i < text.length) {
    // Wenn wir nicht am Anfang sind, überlappen wir mit dem vorherigen Chunk
    const start = i === 0 ? 0 : i - overlap
    const end = start + chunkSize
    chunks.push(text.slice(start, end))
    i = end
  }

  return chunks
}

export async function POST(request: NextRequest) {
  try {
    // Temporäres Verzeichnis für hochgeladene Dateien erstellen
    const uploadDir = join(process.cwd(), "tmp", "uploads")
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const category = (formData.get("category") as string) || "allgemein"

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Keine Dateien hochgeladen" }, { status: 400 })
    }

    let totalChunks = 0

    // Jede Datei verarbeiten
    for (const file of files) {
      // Datei auf dem Server speichern
      const filePath = join(uploadDir, file.name)
      const buffer = Buffer.from(await file.arrayBuffer())
      await writeFile(filePath, buffer)

      // Dateiinhalt lesen
      const content = buffer.toString("utf-8")

      // Metadaten erstellen
      const metadata = {
        source: file.name,
        category,
        documentType: file.name.split(".").pop()?.toLowerCase() || "unknown",
        size: file.size,
        uploadedAt: new Date().toISOString(),
      }

      // Text in Chunks aufteilen
      const chunks = splitIntoChunks(content)

      // Jeden Chunk in die Datenbank speichern
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]
        const chunkTitle = `${file.name} (Teil ${i + 1}/${chunks.length})`

        // Embedding erstellen
        const embedding = await getEmbedding(chunk)

        // In Supabase speichern
        const { error } = await supabase.from("company_knowledge").insert({
          title: chunkTitle,
          content: chunk,
          metadata,
          embedding,
        })

        if (error) {
          console.error(`Fehler beim Speichern in Supabase: ${error.message}`)
          throw error
        }
      }

      totalChunks += chunks.length
    }

    return NextResponse.json({
      success: true,
      count: files.length,
      chunks: totalChunks,
      message: `${files.length} Dokumente erfolgreich hochgeladen und in ${totalChunks} Chunks indexiert.`,
    })
  } catch (error) {
    console.error("Fehler beim Verarbeiten des Uploads:", error)
    return NextResponse.json({ error: "Fehler beim Verarbeiten des Uploads" }, { status: 500 })
  }
}
