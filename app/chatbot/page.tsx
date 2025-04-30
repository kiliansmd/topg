import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChatbotPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter">Unternehmenseigener KI-Chatbot</h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Erstellen Sie einen KI-Assistenten, der auf Ihr Unternehmenswissen trainiert ist
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Überblick</TabsTrigger>
            <TabsTrigger value="implementation">Implementierung</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="examples">Beispiele</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Was ist ein unternehmenseigener KI-Chatbot?</CardTitle>
                <CardDescription>Ein auf Ihre Unternehmensdaten trainierter Assistent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Ein unternehmenseigener KI-Chatbot ist ein intelligenter Assistent, der speziell auf die Daten,
                  Dokumente und das Wissen Ihres Unternehmens trainiert wurde. Im Gegensatz zu allgemeinen
                  KI-Assistenten kann dieser Bot:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unternehmensspezifische Fragen beantworten</li>
                  <li>Interne Prozesse und Richtlinien erklären</li>
                  <li>Auf Ihre Dokumentation, Schulungsvideos und Anleitungen verweisen</li>
                  <li>Mitarbeitern bei alltäglichen Aufgaben und Fragen helfen</li>
                  <li>24/7 verfügbar sein und konsistente Antworten liefern</li>
                </ul>
                <p className="font-medium">
                  Ja, es ist definitiv möglich, einen eigenen KI-Bot mit Ihren unternehmensspezifischen Inhalten zu
                  trainieren!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vorteile eines unternehmenseigenen Chatbots</CardTitle>
                <CardDescription>Warum sich die Implementierung lohnt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-medium">Effizienzsteigerung</h3>
                    <p className="text-sm text-gray-500">
                      Reduziert die Zeit, die Mitarbeiter mit der Suche nach Informationen verbringen, und entlastet den
                      Support.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Konsistente Antworten</h3>
                    <p className="text-sm text-gray-500">
                      Liefert einheitliche und aktuelle Informationen basierend auf Ihren Unternehmensdokumenten.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Rund-um-die-Uhr Verfügbarkeit</h3>
                    <p className="text-sm text-gray-500">
                      Bietet Unterstützung außerhalb der Geschäftszeiten und in verschiedenen Zeitzonen.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Wissensbewahrung</h3>
                    <p className="text-sm text-gray-500">
                      Bewahrt Unternehmenswissen und macht es für alle Mitarbeiter zugänglich.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Skalierbarkeit</h3>
                    <p className="text-sm text-gray-500">
                      Kann mit dem Unternehmen wachsen und immer mehr Wissen aufnehmen.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Verbesserte Onboarding-Erfahrung</h3>
                    <p className="text-sm text-gray-500">
                      Hilft neuen Mitarbeitern, sich schneller zurechtzufinden und produktiv zu werden.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technische Implementierung</CardTitle>
                <CardDescription>So integrieren Sie einen KI-Chatbot in Ihren Helpdesk</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Die Implementierung eines unternehmenseigenen KI-Chatbots erfolgt in mehreren Schritten:</p>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">1. Auswahl der KI-Plattform</h3>
                    <p className="mt-1 text-sm text-gray-500">Es gibt verschiedene Optionen für die Implementierung:</p>
                    <ul className="mt-2 list-disc pl-6 text-sm">
                      <li>Vercel AI SDK mit OpenAI, Anthropic oder anderen LLM-Anbietern [^1]</li>
                      <li>Microsoft Azure OpenAI Service mit eigenem Wissensmanagement</li>
                      <li>Google Vertex AI mit RAG (Retrieval Augmented Generation)</li>
                      <li>Eigenentwicklung mit Open-Source-Modellen wie Llama 2</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">2. Datenaufbereitung</h3>
                    <p className="mt-1 text-sm text-gray-500">Sammeln und Aufbereiten Ihrer Unternehmensdaten:</p>
                    <ul className="mt-2 list-disc pl-6 text-sm">
                      <li>Dokumentation in verschiedenen Formaten (PDF, Word, HTML)</li>
                      <li>Schulungsvideos (mit Transkriptionen)</li>
                      <li>Schritt-für-Schritt-Anleitungen</li>
                      <li>FAQs und Wissensdatenbanken</li>
                      <li>Interne Richtlinien und Prozessbeschreibungen</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">3. Technische Integration</h3>
                    <p className="mt-1 text-sm text-gray-500">Einbindung in Ihre bestehende Infrastruktur:</p>
                    <ul className="mt-2 list-disc pl-6 text-sm">
                      <li>Integration in Ihren Helpdesk oder Intranet</li>
                      <li>Anbindung an bestehende Authentifizierungssysteme</li>
                      <li>Einrichtung von Berechtigungen und Zugriffskontrollen</li>
                      <li>Implementierung von Feedback-Mechanismen zur kontinuierlichen Verbesserung</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Beispiel-Implementierung mit Vercel AI SDK</CardTitle>
                <CardDescription>Code-Beispiel für einen einfachen Unternehmens-Chatbot</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Hier ist ein einfaches Beispiel, wie Sie einen KI-Chatbot mit dem Vercel AI SDK implementieren können:
                </p>
                <div className="rounded-lg bg-gray-900 p-4 text-white">
                  <pre className="overflow-x-auto text-sm">
                    <code>{`// app/api/chat/route.ts
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createClient } from '@supabase/supabase-js'

// Supabase-Client für den Zugriff auf Ihre Wissensdatenbank
const supabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const { messages } = await req.json()
  const latestMessage = messages[messages.length - 1].content

  // Relevante Dokumente aus Ihrer Wissensdatenbank abrufen
  const { data: documents } = await supabaseClient
    .from('company_knowledge')
    .select('content, title')
    .textSearch('content', latestMessage)
    .limit(3)

  // Kontext aus den gefundenen Dokumenten erstellen
  const context = documents
    ? documents.map(doc => \`\${doc.title}:\\n\${doc.content}\`).join('\\n\\n')
    : 'Keine relevanten Informationen gefunden.'

  // System-Prompt mit Kontext
  const systemPrompt = \`
    Du bist ein hilfreicher Assistent für unser Unternehmen.
    Beantworte Fragen basierend auf dem folgenden Unternehmenskontext:
    
    \${context}
    
    Wenn du die Antwort nicht im Kontext findest, sage ehrlich, dass du es nicht weißt.
    Verweise auf relevante Dokumente oder Anleitungen, wenn möglich.
  \`

  // Antwort generieren
  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: systemPrompt,
    prompt: latestMessage
  })

  return Response.json({ response: text })
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Training mit Unternehmensdaten</CardTitle>
                <CardDescription>So trainieren Sie Ihren KI-Bot mit eigenen Inhalten</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Es gibt zwei Hauptansätze, um einen KI-Bot mit Ihren Unternehmensdaten zu trainieren:</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium">1. Retrieval Augmented Generation (RAG)</h3>
                    <p className="mt-1 text-gray-500">Die effizienteste und am häufigsten verwendete Methode:</p>
                    <ul className="mt-2 list-disc pl-6">
                      <li>Ihre Dokumente werden in einer Vektordatenbank gespeichert</li>
                      <li>Bei einer Anfrage werden relevante Dokumente abgerufen</li>
                      <li>Diese Dokumente werden als Kontext an das LLM übergeben</li>
                      <li>Das LLM generiert eine Antwort basierend auf diesem Kontext</li>
                    </ul>
                    <p className="mt-2 text-gray-500">
                      <strong>Vorteile:</strong> Schnelle Implementierung, keine Feinabstimmung des Modells
                      erforderlich, einfache Aktualisierung der Wissensbasis
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">2. Fine-Tuning eines Basismodells</h3>
                    <p className="mt-1 text-gray-500">Für spezifischere Anwendungsfälle:</p>
                    <ul className="mt-2 list-disc pl-6">
                      <li>Ein bestehendes LLM wird mit Ihren Daten weiter trainiert</li>
                      <li>Erfordert strukturierte Trainingsdaten (Frage-Antwort-Paare)</li>
                      <li>Höherer Ressourcenaufwand und technisches Know-how</li>
                    </ul>
                    <p className="mt-2 text-gray-500">
                      <strong>Vorteile:</strong> Potenziell bessere Leistung für sehr spezifische Domänen, weniger
                      Abhängigkeit von externem Kontext
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4 mt-4">
                  <h3 className="font-medium">Schritte zur Implementierung von RAG</h3>
                  <ol className="mt-2 list-decimal pl-6 space-y-2">
                    <li>
                      <strong>Datensammlung:</strong> Sammeln Sie alle relevanten Unternehmensdokumente
                    </li>
                    <li>
                      <strong>Datenaufbereitung:</strong> Konvertieren Sie Dokumente in Textformat und teilen Sie sie in
                      kleinere Abschnitte
                    </li>
                    <li>
                      <strong>Vektorisierung:</strong> Erstellen Sie Einbettungen (Embeddings) für jeden Textabschnitt
                    </li>
                    <li>
                      <strong>Speicherung:</strong> Speichern Sie die Einbettungen in einer Vektordatenbank (z.B.
                      Pinecone, Supabase, Qdrant)
                    </li>
                    <li>
                      <strong>Abfrage-Pipeline:</strong> Implementieren Sie eine Pipeline, die bei Benutzeranfragen
                      relevante Dokumente abruft
                    </li>
                    <li>
                      <strong>Antwortgenerierung:</strong> Übergeben Sie die abgerufenen Dokumente als Kontext an das
                      LLM
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Datenquellen für das Training</CardTitle>
                <CardDescription>Welche Unternehmensdaten Sie für Ihren Chatbot verwenden können</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-medium">Dokumentation</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      <li>Benutzerhandbücher</li>
                      <li>Prozessbeschreibungen</li>
                      <li>Technische Dokumentationen</li>
                      <li>Produktinformationen</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Schulungsmaterialien</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      <li>E-Learning-Inhalte</li>
                      <li>Schulungsvideos (transkribiert)</li>
                      <li>Präsentationen</li>
                      <li>Workshops-Materialien</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Interne Richtlinien</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      <li>Unternehmensrichtlinien</li>
                      <li>Compliance-Dokumente</li>
                      <li>Sicherheitsvorschriften</li>
                      <li>Verhaltenskodex</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Wissensdatenbanken</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      <li>FAQ-Sammlungen</li>
                      <li>Support-Tickets (anonymisiert)</li>
                      <li>Wiki-Artikel</li>
                      <li>Best Practices</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-amber-50 p-4 dark:bg-amber-950">
                  <h3 className="font-medium text-amber-800 dark:text-amber-300">Wichtiger Hinweis zum Datenschutz</h3>
                  <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                    Achten Sie darauf, dass keine personenbezogenen oder vertraulichen Daten ohne entsprechende
                    Sicherheitsmaßnahmen in den Trainingsdaten enthalten sind. Implementieren Sie geeignete
                    Anonymisierungs- und Zugriffskontrollen, um die Datenschutzbestimmungen einzuhalten.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Beispiel-Implementierung mit RAG</CardTitle>
                <CardDescription>
                  Vollständiges Code-Beispiel für einen Unternehmens-Chatbot mit Dokumentensuche
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Hier ist ein ausführlicheres Beispiel für die Implementierung eines Chatbots mit Retrieval Augmented
                  Generation:
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-900 p-4 text-white">
                    <h4 className="mb-2 text-sm font-medium text-gray-300">
                      1. Dokumente in Vektordatenbank speichern
                    </h4>
                    <pre className="overflow-x-auto text-sm">
                      <code>{`// scripts/index-documents.ts
import { createClient } from '@supabase/supabase-js'
import { openai } from '@ai-sdk/openai'
import fs from 'fs'
import path from 'path'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

// Funktion zum Erstellen von Embeddings
async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}

// Funktion zum Aufteilen von Dokumenten in Chunks
function splitIntoChunks(text: string, chunkSize = 1500) {
  const chunks = []
  let i = 0
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize))
    i += chunkSize
  }
  return chunks
}

async function indexDocument(filePath: string, title: string) {
  // Dokument lesen
  const content = fs.readFileSync(filePath, 'utf8')
  
  // In Chunks aufteilen
  const chunks = splitIntoChunks(content)
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    
    // Embedding erstellen
    const embedding = await getEmbedding(chunk)
    
    // In Supabase speichern
    await supabase.from('company_knowledge').insert({
      title: \`\${title} (Teil \${i+1})\`,
      content: chunk,
      embedding
    })
    
    console.log(\`Indexed: \${title} (Teil \${i+1})\`)
  }
}

// Hauptfunktion zum Indexieren aller Dokumente
async function indexAllDocuments() {
  const docsDir = path.join(process.cwd(), 'documents')
  const files = fs.readdirSync(docsDir)
  
  for (const file of files) {
    const filePath = path.join(docsDir, file)
    const title = path.basename(file, path.extname(file))
    await indexDocument(filePath, title)
  }
}

indexAllDocuments().catch(console.error)`}</code>
                    </pre>
                  </div>

                  <div className="rounded-lg bg-gray-900 p-4 text-white">
                    <h4 className="mb-2 text-sm font-medium text-gray-300">2. Chat API-Route implementieren</h4>
                    <pre className="overflow-x-auto text-sm">
                      <code>{`// app/api/chat/route.ts
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createClient } from '@supabase/supabase-js'

// Supabase-Client für den Zugriff auf Ihre Wissensdatenbank
const supabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// Funktion zum Erstellen von Embeddings für die Suche
async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages[messages.length - 1].content
    
    // Embedding für die Benutzeranfrage erstellen
    const embedding = await getEmbedding(latestMessage)
    
    // Ähnliche Dokumente in der Vektordatenbank suchen
    const { data: documents, error } = await supabaseClient.rpc(
      'match_documents',
      {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 5
      }
    )
    
    if (error) {
      console.error('Error searching documents:', error)
      return Response.json({ error: 'Failed to search knowledge base' }, { status: 500 })
    }
    
    // Kontext aus den gefundenen Dokumenten erstellen
    const context = documents && documents.length > 0
      ? documents.map(doc => \`\${doc.title}:\\n\${doc.content}\`).join('\\n\\n')
      : 'Keine relevanten Informationen in der Wissensdatenbank gefunden.'
    
    // Konversationsverlauf aufbauen
    const conversationHistory = messages
      .slice(0, -1)
      .map(m => \`\${m.role === 'user' ? 'Benutzer' : 'Assistent'}: \${m.content}\`)
      .join('\\n')
    
    // System-Prompt mit Kontext und Konversationsverlauf
    const systemPrompt = \`
      Du bist ein hilfreicher Assistent für unser Unternehmen.
      
      KONVERSATIONSVERLAUF:
      \${conversationHistory}
      
      UNTERNEHMENSKONTEXT:
      \${context}
      
      Beantworte die Frage des Benutzers basierend auf dem bereitgestellten Unternehmenskontext.
      Wenn du die Antwort nicht im Kontext findest, sage ehrlich, dass du es nicht weißt.
      Verweise auf relevante Dokumente oder Anleitungen, wenn möglich.
      Halte deine Antworten präzise und hilfreich.
    \`
    
    // Antwort generieren
    const { text } = await generateText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      prompt: latestMessage
    })
    
    return Response.json({ response: text })
  } catch (error) {
    console.error('Error in chat API:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}`}</code>
                    </pre>
                  </div>

                  <div className="rounded-lg bg-gray-900 p-4 text-white">
                    <h4 className="mb-2 text-sm font-medium text-gray-300">
                      3. Chat-Komponente für die Benutzeroberfläche
                    </h4>
                    <pre className="overflow-x-auto text-sm">
                      <code>{`// app/components/chat-interface.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Send } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!input.trim()) return
    
    // Benutzernachricht hinzufügen
    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    
    try {
      // API-Anfrage senden
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      })
      
      if (!response.ok) {
        throw new Error('Failed to get response')
      }
      
      const data = await response.json()
      
      // Assistentenantwort hinzufügen
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response }
      ])
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Entschuldigung, es gab ein Problem bei der Verarbeitung Ihrer Anfrage. Bitte versuchen Sie es später erneut.' 
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh]">
      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 p-2">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>Stellen Sie eine Frage zu Ihrem Unternehmen</p>
                <p className="text-sm mt-2">
                  Beispiele: "Wie beantrage ich Urlaub?", "Wo finde ich die Onboarding-Unterlagen?", 
                  "Wer ist für IT-Support zuständig?"
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={\`flex \${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }\`}
                >
                  <div
                    className={\`max-w-[80%] rounded-lg p-3 \${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }\`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Stellen Sie eine Frage..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Beispiele für Anwendungsfälle</CardTitle>
                <CardDescription>Wie ein KI-Chatbot in Ihrem Unternehmen eingesetzt werden kann</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">IT-Support und Helpdesk</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Der Chatbot kann häufige IT-Probleme lösen und bei der Fehlerbehebung helfen:
                    </p>
                    <div className="mt-3 space-y-3">
                      <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                        <p className="font-medium">Benutzer:</p>
                        <p>Wie setze ich mein Passwort zurück?</p>
                      </div>
                      <div className="rounded-lg bg-primary/10 p-3">
                        <p className="font-medium">KI-Assistent:</p>
                        <p>Um Ihr Passwort zurückzusetzen, gehen Sie bitte wie folgt vor:</p>
                        <ol className="mt-2 list-decimal pl-5 text-sm">
                          <li>Öffnen Sie das Mitarbeiterportal unter portal.unternehmen.de</li>
                          <li>Klicken Sie auf "Passwort vergessen"</li>
                          <li>Geben Sie Ihre E-Mail-Adresse ein</li>
                          <li>Folgen Sie den Anweisungen in der E-Mail, die Sie erhalten</li>
                        </ol>
                        <p className="mt-2 text-sm">
                          Falls Sie weiterhin Probleme haben, wenden Sie sich bitte an den IT-Support unter
                          it-support@unternehmen.de oder Tel. +49 123 456789.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Onboarding neuer Mitarbeiter</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Der Chatbot kann neuen Mitarbeitern helfen, sich schneller zurechtzufinden:
                    </p>
                    <div className="mt-3 space-y-3">
                      <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                        <p className="font-medium">Benutzer:</p>
                        <p>Welche Onboarding-Schulungen muss ich absolvieren?</p>
                      </div>
                      <div className="rounded-lg bg-primary/10 p-3">
                        <p className="font-medium">KI-Assistent:</p>
                        <p>
                          Als neuer Mitarbeiter müssen Sie innerhalb der ersten 30 Tage folgende Pflichtschulungen
                          absolvieren:
                        </p>
                        <ul className="mt-2 list-disc pl-5 text-sm">
                          <li>Unternehmenseinführung (1 Stunde, online)</li>
                          <li>IT-Sicherheit und Datenschutz (45 Minuten, online)</li>
                          <li>Compliance-Grundlagen (30 Minuten, online)</li>
                          <li>Arbeitssicherheit (je nach Abteilung, 1-2 Stunden)</li>
                        </ul>
                        <p className="mt-2 text-sm">
                          Alle Schulungen finden Sie auf unserer Zoho Learn Plattform. Ihr Vorgesetzter hat Ihnen
                          bereits Einladungen zu diesen Kursen gesendet. Bei Fragen wenden Sie sich bitte an Ihren
                          Onboarding-Buddy oder die Personalabteilung.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Prozessunterstützung</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Der Chatbot kann bei der Navigation durch komplexe Unternehmensprozesse helfen:
                    </p>
                    <div className="mt-3 space-y-3">
                      <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                        <p className="font-medium">Benutzer:</p>
                        <p>Wie reiche ich eine Spesenabrechnung ein?</p>
                      </div>
                      <div className="rounded-lg bg-primary/10 p-3">
                        <p className="font-medium">KI-Assistent:</p>
                        <p>Für die Einreichung einer Spesenabrechnung folgen Sie bitte diesem Prozess:</p>
                        <ol className="mt-2 list-decimal pl-5 text-sm">
                          <li>Loggen Sie sich im ERP-System ein</li>
                          <li>
                            Navigieren Sie zu &quot;Finanzen&quot; &gt; &quot;Spesen&quot; &gt; &quot;Neue
                            Abrechnung&quot;
                          </li>
                          <li>Füllen Sie das Formular aus und fügen Sie Belege als Scans oder Fotos hinzu</li>
                          <li>Reichen Sie die Abrechnung zur Genehmigung ein</li>
                        </ol>
                        <p className="mt-2 text-sm">
                          Beachten Sie bitte die Spesenrichtlinie, die Sie hier finden können:{" "}
                          <a href="/docs/expense-policy" className="text-blue-600 hover:underline dark:text-blue-400">
                            Spesenrichtlinie
                          </a>
                          . Bei Fragen zur Abrechnung wenden Sie sich bitte an accounting@unternehmen.de.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
