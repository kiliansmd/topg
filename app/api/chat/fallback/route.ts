import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Einfache Fallback-API ohne Vektordatenbank
export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages[messages.length - 1].content

    // Statischer Kontext für häufige Anfragen
    const staticContext = `
      Urlaubsantrag: Mitarbeiter können Urlaub über das Mitarbeiterportal beantragen. Gehen Sie zu "Meine Zeit" > "Urlaub beantragen".
      
      IT-Support: Der IT-Support ist unter it-support@unternehmen.de oder telefonisch unter +49 123 456789 erreichbar.
      
      Spesenabrechnung: Spesenabrechnungen werden über das ERP-System eingereicht. Belege müssen als Scan oder Foto beigefügt werden.
      
      Onboarding: Neue Mitarbeiter müssen innerhalb von 30 Tagen die Pflichtschulungen absolvieren.
      
      Zoho Learn: Unsere E-Learning-Plattform ist unter learn.zoho.com erreichbar. Dort finden Sie alle Schulungsmaterialien.
    `

    // System-Prompt mit statischem Kontext
    const systemPrompt = `
      Du bist ein hilfreicher Assistent für unser Unternehmen.
      Beantworte Fragen basierend auf dem folgenden Unternehmenskontext:
      
      ${staticContext}
      
      Wenn du die Antwort nicht im Kontext findest, sage ehrlich, dass du es nicht weißt.
      Verweise auf relevante Dokumente oder Anleitungen, wenn möglich.
      Antworte auf Deutsch.
    `

    // Antwort generieren
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: latestMessage,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error("Fehler in der Fallback-Chat-API:", error)
    return Response.json(
      {
        response: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
      },
      { status: 200 },
    )
  }
}
