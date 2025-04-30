import { ChatInterface } from "@/app/components/chat-interface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter">Unternehmens-Assistent</h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Stellen Sie Fragen zu Unternehmensrichtlinien, Prozessen und mehr
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>KI-Assistent</CardTitle>
              <CardDescription>
                Unser KI-Assistent ist mit Unternehmenswissen trainiert und kann Ihnen bei Fragen helfen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChatInterface />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
