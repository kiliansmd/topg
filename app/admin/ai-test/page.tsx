"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function AITestPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<any>(null)
  const [autoTest, setAutoTest] = useState(true)

  // Automatischer Test beim Laden der Seite
  useEffect(() => {
    if (autoTest) {
      testConnection()
      setAutoTest(false)
    }
  }, [autoTest])

  async function testConnection() {
    setStatus("loading")

    try {
      const response = await fetch("/api/ai-test")
      const data = await response.json()

      setResult(data)
      setStatus(data.status === "success" ? "success" : "error")
    } catch (error) {
      console.error("Fehler beim Testen:", error)
      setResult({ error: error instanceof Error ? error.message : String(error) })
      setStatus("error")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter">KI-Verbindungstest</h1>
          <p className="mt-2 text-gray-500">
            Überprüfen Sie die Verbindung zu OpenAI und testen Sie die KI-Funktionalität
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Verbindungstest</CardTitle>
            <CardDescription>
              Dieser Test überprüft die Verbindung zu OpenAI und testet die Textgenerierung
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === "loading" && (
              <div className="flex items-center justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Verbindung wird getestet...</span>
              </div>
            )}

            {status === "success" && (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-600 dark:text-green-400">Verbindung erfolgreich</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 space-y-2">
                    <p>
                      <strong>Antwortzeit:</strong> {result.responseTime}
                    </p>
                    <p>
                      <strong>Test-Antwort:</strong> {result.response}
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {status === "error" && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Verbindungsfehler</AlertTitle>
                <AlertDescription>
                  <div className="mt-2">
                    <p>
                      <strong>Fehlermeldung:</strong> {result?.message || "Unbekannter Fehler"}
                    </p>
                    {result?.error && <p className="mt-1 text-sm opacity-80">{result.error}</p>}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={testConnection} disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wird getestet...
                </>
              ) : (
                "Verbindung testen"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fehlerbehebung</CardTitle>
            <CardDescription>Tipps zur Behebung häufiger Probleme mit der KI-Verbindung</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">API-Schlüssel überprüfen</h3>
                <p className="text-sm text-gray-500">
                  Stellen Sie sicher, dass der OPENAI_API_KEY korrekt in den Umgebungsvariablen gesetzt ist und gültig
                  ist.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Kontingent und Abrechnung</h3>
                <p className="text-sm text-gray-500">
                  Überprüfen Sie, ob Ihr OpenAI-Konto über ausreichendes Guthaben verfügt und keine Zahlungsprobleme
                  bestehen.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Netzwerkverbindung</h3>
                <p className="text-sm text-gray-500">
                  Stellen Sie sicher, dass Ihre Serverumgebung eine Verbindung zu den OpenAI-Servern herstellen kann.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Modellverfügbarkeit</h3>
                <p className="text-sm text-gray-500">
                  Prüfen Sie, ob das verwendete Modell (gpt-4o) für Ihren API-Schlüssel verfügbar ist.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
