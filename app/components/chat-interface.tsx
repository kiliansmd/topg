"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Loader2, Bot, User, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  error?: boolean
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Automatisches Scrollen zum Ende der Nachrichten
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Fokus auf das Eingabefeld setzen, wenn die Komponente geladen wird
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Beispielfragen für den Benutzer
  const exampleQuestions = [
    "Wie beantrage ich Urlaub?",
    "Wo finde ich die Onboarding-Unterlagen?",
    "Wer ist für IT-Support zuständig?",
    "Wie reiche ich eine Spesenabrechnung ein?",
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Fehler zurücksetzen
    setError(null)

    // Benutzernachricht hinzufügen
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // API-Anfrage senden mit Timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 Sekunden Timeout

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Server antwortete mit Status ${response.status}`)
      }

      const data = await response.json()

      if (!data.response) {
        throw new Error("Keine Antwort vom Server erhalten")
      }

      // Assistentenantwort hinzufügen
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("Fehler beim Senden der Nachricht:", error)

      let errorMessage = "Es ist ein unbekannter Fehler aufgetreten."

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "Die Anfrage hat zu lange gedauert. Bitte versuchen Sie es erneut."
        } else {
          errorMessage = `Fehler: ${error.message}`
        }
      }

      setError(errorMessage)

      // Systemfehler-Nachricht hinzufügen
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "system",
          content: "Entschuldigung, ich konnte Ihre Anfrage nicht verarbeiten. Bitte versuchen Sie es später erneut.",
          timestamp: new Date(),
          error: true,
        },
      ])
    } finally {
      setIsLoading(false)
      // Fokus zurück auf das Eingabefeld setzen
      inputRef.current?.focus()
    }
  }

  function handleExampleClick(question: string) {
    setInput(question)
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh]">
      <Card className="flex-1 overflow-hidden border-2">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 p-2">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8 space-y-6">
                <div>
                  <Bot className="h-12 w-12 mx-auto text-primary/60" />
                  <h3 className="mt-2 text-lg font-medium">Unternehmens-Assistent</h3>
                  <p className="text-sm mt-1">Stellen Sie eine Frage zu Ihrem Unternehmen</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-md mx-auto">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(question)}
                      className="text-sm text-left px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user"
                      ? "justify-end"
                      : message.role === "system"
                        ? "justify-center"
                        : "justify-start",
                  )}
                >
                  {message.role === "system" ? (
                    <Alert variant="destructive" className="max-w-[80%]">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{message.content}</AlertDescription>
                    </Alert>
                  ) : (
                    <div className="flex items-start gap-2 max-w-[80%]">
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "rounded-lg p-3",
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                          message.error ? "border-red-500 border" : "",
                        )}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs opacity-50 mt-1 text-right">
                          {new Intl.DateTimeFormat("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(message.timestamp)}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex space-x-2 items-center">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-500">Antwort wird generiert...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {error && !isLoading && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Stellen Sie eine Frage..."
              disabled={isLoading}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
