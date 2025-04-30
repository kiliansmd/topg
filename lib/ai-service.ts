import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createClient } from "@supabase/supabase-js"

// Konfiguration
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // ms
const TIMEOUT = 30000 // 30 Sekunden

// Supabase-Client initialisieren
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

// Funktion zum Erstellen von Embeddings mit Wiederholungsversuchen
export async function createEmbedding(text: string, retries = MAX_RETRIES): Promise<number[] | null> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    })
    return response.data[0].embedding
  } catch (error: any) {
    console.error(`Fehler beim Erstellen des Embeddings: ${error.message}`)

    // Wiederholungsversuch bei bestimmten Fehlern
    if (retries > 0 && isRetryableError(error)) {
      console.log(`Wiederholungsversuch in ${RETRY_DELAY}ms... (${retries} verbleibend)`)
      await delay(RETRY_DELAY)
      return createEmbedding(text, retries - 1)
    }

    // Bei kritischen Fehlern null zurückgeben
    return null
  }
}

// Funktion zur Textgenerierung mit Wiederholungsversuchen
export async function generateAIResponse(prompt: string, systemPrompt: string, retries = MAX_RETRIES): Promise<string> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: prompt,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return text
  } catch (error: any) {
    console.error(`Fehler bei der KI-Antwortgenerierung: ${error.message}`)

    // Wiederholungsversuch bei bestimmten Fehlern
    if (retries > 0 && isRetryableError(error)) {
      console.log(`Wiederholungsversuch in ${RETRY_DELAY}ms... (${retries} verbleibend)`)
      await delay(RETRY_DELAY)
      return generateAIResponse(prompt, systemPrompt, retries - 1)
    }

    // Fallback-Antwort bei kritischen Fehlern
    return "Entschuldigung, ich konnte Ihre Anfrage nicht verarbeiten. Unser System ist momentan ausgelastet. Bitte versuchen Sie es in Kürze erneut oder wenden Sie sich an den Support."
  }
}

// Funktion zur Suche nach relevanten Dokumenten
export async function findRelevantDocuments(query: string, threshold = 0.7, limit = 5): Promise<any[]> {
  try {
    // Embedding für die Anfrage erstellen
    const embedding = await createEmbedding(query)

    if (!embedding) {
      console.warn("Konnte kein Embedding erstellen, gebe leere Dokumentenliste zurück")
      return []
    }

    // Ähnliche Dokumente in der Vektordatenbank suchen
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: threshold,
      match_count: limit,
    })

    if (error) {
      console.error("Fehler bei der Dokumentensuche:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Fehler bei der Dokumentensuche:", error)
    return []
  }
}

// Funktion zum Erstellen des Kontexts aus Dokumenten
export function createContextFromDocuments(documents: any[]): string {
  if (!documents || documents.length === 0) {
    return "Keine relevanten Informationen in der Wissensdatenbank gefunden."
  }

  return documents
    .map((doc) => {
      const metadata = doc.metadata
        ? `[Quelle: ${doc.metadata.source || "Unbekannt"}, Kategorie: ${doc.metadata.category || "Allgemein"}]`
        : ""
      return `${doc.title} ${metadata}:\n${doc.content}`
    })
    .join("\n\n")
}

// Hilfsfunktionen
function isRetryableError(error: any): boolean {
  // Prüfen, ob es sich um einen wiederholbaren Fehler handelt
  if (error.name === "AbortError") return false // Timeout, nicht wiederholen

  // Rate Limit oder Netzwerkfehler wiederholen
  if (error.status === 429) return true // Rate Limit
  if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT") return true

  // Serverprobleme wiederholen
  if (error.status >= 500 && error.status < 600) return true

  return false
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
