import { NextResponse } from "next/server"
import { generateAIResponse } from "@/lib/ai-service"

export async function GET() {
  try {
    const testPrompt = "Wie ist das Wetter heute?"
    const systemPrompt = "Du bist ein hilfreicher Assistent. Antworte kurz und präzise auf Deutsch."

    const startTime = Date.now()
    const response = await generateAIResponse(testPrompt, systemPrompt)
    const endTime = Date.now()

    return NextResponse.json({
      status: "success",
      response,
      responseTime: `${endTime - startTime}ms`,
      message: "KI-Verbindung funktioniert korrekt",
    })
  } catch (error) {
    console.error("Fehler beim Testen der KI-Verbindung:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Fehler bei der KI-Verbindung",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
