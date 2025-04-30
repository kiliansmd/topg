import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">Unternehmens-Helpdesk</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/faq" className="transition-colors hover:text-foreground/80">
                FAQ
              </Link>
              <Link href="/guides" className="transition-colors hover:text-foreground/80">
                Anleitungen
              </Link>
              <Link href="/learning" className="transition-colors hover:text-foreground/80">
                E-Learning
              </Link>
              <Link href="/contact" className="transition-colors hover:text-foreground/80">
                Zuständigkeiten
              </Link>
              <Link href="/chat" className="transition-colors hover:text-foreground/80 font-semibold">
                KI-Assistent
              </Link>
              <Link href="/admin/ai-test" className="transition-colors hover:text-foreground/80">
                KI-Test
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Suchen..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Willkommen im Selbstbedienungs-Helpdesk
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Finden Sie schnell Antworten auf Ihre Fragen, Anleitungen und Ressourcen
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex space-x-2">
                  <Input type="text" placeholder="Wonach suchen Sie?" className="max-w-lg flex-1" />
                  <Button type="submit">Suchen</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:px-6">
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="guides">Anleitungen</TabsTrigger>
              <TabsTrigger value="learning">E-Learning</TabsTrigger>
              <TabsTrigger value="contact">Zuständigkeiten</TabsTrigger>
            </TabsList>
            <TabsContent value="faq" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Häufig gestellte Fragen</CardTitle>
                    <CardDescription>Antworten auf die am häufigsten gestellten Fragen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/faq/password-reset" className="text-blue-600 hover:underline dark:text-blue-400">
                          Wie setze ich mein Passwort zurück?
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq/vpn-access" className="text-blue-600 hover:underline dark:text-blue-400">
                          VPN-Zugang einrichten
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq/email-setup" className="text-blue-600 hover:underline dark:text-blue-400">
                          E-Mail auf mobilen Geräten einrichten
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq/all" className="text-blue-600 hover:underline dark:text-blue-400">
                          Alle FAQs anzeigen →
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tipps & Tricks</CardTitle>
                    <CardDescription>Nützliche Hinweise für den Arbeitsalltag</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/tips/productivity" className="text-blue-600 hover:underline dark:text-blue-400">
                          Produktivitätstipps für Office 365
                        </Link>
                      </li>
                      <li>
                        <Link href="/tips/meetings" className="text-blue-600 hover:underline dark:text-blue-400">
                          Effektive Online-Meetings
                        </Link>
                      </li>
                      <li>
                        <Link href="/tips/security" className="text-blue-600 hover:underline dark:text-blue-400">
                          IT-Sicherheit im Homeoffice
                        </Link>
                      </li>
                      <li>
                        <Link href="/tips/all" className="text-blue-600 hover:underline dark:text-blue-400">
                          Alle Tipps anzeigen →
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Neueste Updates</CardTitle>
                    <CardDescription>Aktuelle Änderungen und Neuerungen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <Link href="/updates/software" className="text-blue-600 hover:underline dark:text-blue-400">
                          Software-Update: Office 365
                        </Link>
                        <span className="text-xs text-gray-500">15.04.2025</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <Link href="/updates/policy" className="text-blue-600 hover:underline dark:text-blue-400">
                          Neue Richtlinie: Datenschutz
                        </Link>
                        <span className="text-xs text-gray-500">10.04.2025</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <Link href="/updates/system" className="text-blue-600 hover:underline dark:text-blue-400">
                          Systemwartung am 05.05.2025
                        </Link>
                        <span className="text-xs text-gray-500">01.04.2025</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="guides" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Schritt-für-Schritt Anleitungen</CardTitle>
                    <CardDescription>Detaillierte Prozessanleitungen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/guides/onboarding" className="text-blue-600 hover:underline dark:text-blue-400">
                          Onboarding neuer Mitarbeiter
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/guides/expense-report"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Spesenabrechnung einreichen
                        </Link>
                      </li>
                      <li>
                        <Link href="/guides/vacation" className="text-blue-600 hover:underline dark:text-blue-400">
                          Urlaubsantrag stellen
                        </Link>
                      </li>
                      <li>
                        <Link href="/guides/all" className="text-blue-600 hover:underline dark:text-blue-400">
                          Alle Anleitungen anzeigen →
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Software-Dokumentation</CardTitle>
                    <CardDescription>Anleitungen für unternehmensinterne Software</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/docs/crm" className="text-blue-600 hover:underline dark:text-blue-400">
                          CRM-System Benutzerhandbuch
                        </Link>
                      </li>
                      <li>
                        <Link href="/docs/erp" className="text-blue-600 hover:underline dark:text-blue-400">
                          ERP-System Grundlagen
                        </Link>
                      </li>
                      <li>
                        <Link href="/docs/intranet" className="text-blue-600 hover:underline dark:text-blue-400">
                          Intranet-Portal Anleitung
                        </Link>
                      </li>
                      <li>
                        <Link href="/docs/all" className="text-blue-600 hover:underline dark:text-blue-400">
                          Alle Dokumentationen anzeigen →
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Vorlagen & Ressourcen</CardTitle>
                    <CardDescription>Nützliche Vorlagen für den Arbeitsalltag</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/templates/presentation"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Präsentationsvorlagen
                        </Link>
                      </li>
                      <li>
                        <Link href="/templates/report" className="text-blue-600 hover:underline dark:text-blue-400">
                          Berichtsvorlagen
                        </Link>
                      </li>
                      <li>
                        <Link href="/templates/email" className="text-blue-600 hover:underline dark:text-blue-400">
                          E-Mail-Vorlagen
                        </Link>
                      </li>
                      <li>
                        <Link href="/templates/all" className="text-blue-600 hover:underline dark:text-blue-400">
                          Alle Vorlagen anzeigen →
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="learning" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Zoho Learn</CardTitle>
                    <CardDescription>Unsere E-Learning Plattform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Zugang zu allen Schulungsinhalten und Kursen auf unserer Zoho Learn Plattform.
                    </p>
                    <Button asChild>
                      <Link href="https://learn.zoho.com" target="_blank" rel="noopener noreferrer">
                        Zu Zoho Learn
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Empfohlene Kurse</CardTitle>
                    <CardDescription>Beliebte Schulungen für Mitarbeiter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/courses/data-security"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Datenschutz & IT-Sicherheit
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/courses/project-management"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Grundlagen Projektmanagement
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/courses/communication"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Effektive Kommunikation
                        </Link>
                      </li>
                      <li>
                        <Link href="/courses/all" className="text-blue-600 hover:underline dark:text-blue-400">
                          Alle Kurse anzeigen →
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Schulungsvideos</CardTitle>
                    <CardDescription>Video-Tutorials zu verschiedenen Themen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/videos/excel-advanced"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Excel Fortgeschrittene Funktionen
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/videos/teams-collaboration"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Microsoft Teams für Zusammenarbeit
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/videos/time-management"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Zeitmanagement im Büroalltag
                        </Link>
                      </li>
                      <li>
                        <Link href="/videos/all" className="text-blue-600 hover:underline dark:text-blue-400">
                          Alle Videos anzeigen →
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="contact" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>IT-Support</CardTitle>
                    <CardDescription>Technische Unterstützung</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Ansprechpartner:</strong> IT-Helpdesk
                      </p>
                      <p>
                        <strong>E-Mail:</strong> it-support@unternehmen.de
                      </p>
                      <p>
                        <strong>Telefon:</strong> +49 123 456789
                      </p>
                      <p>
                        <strong>Erreichbarkeit:</strong> Mo-Fr, 8:00-17:00 Uhr
                      </p>
                      <p className="mt-4">
                        <strong>Zuständig für:</strong>
                      </p>
                      <ul className="list-disc pl-5">
                        <li>Hardware- und Softwareprobleme</li>
                        <li>Netzwerkzugang</li>
                        <li>Systemzugriffe</li>
                        <li>Passwort-Resets</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Personalabteilung</CardTitle>
                    <CardDescription>HR-Angelegenheiten</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Ansprechpartner:</strong> HR-Team
                      </p>
                      <p>
                        <strong>E-Mail:</strong> personal@unternehmen.de
                      </p>
                      <p>
                        <strong>Telefon:</strong> +49 123 456790
                      </p>
                      <p>
                        <strong>Erreichbarkeit:</strong> Mo-Do, 9:00-16:00 Uhr
                      </p>
                      <p className="mt-4">
                        <strong>Zuständig für:</strong>
                      </p>
                      <ul className="list-disc pl-5">
                        <li>Arbeitsverträge</li>
                        <li>Gehaltsabrechnungen</li>
                        <li>Urlaubsanträge</li>
                        <li>Weiterbildungen</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Facility Management</CardTitle>
                    <CardDescription>Gebäude und Einrichtung</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Ansprechpartner:</strong> Facility-Team
                      </p>
                      <p>
                        <strong>E-Mail:</strong> facility@unternehmen.de
                      </p>
                      <p>
                        <strong>Telefon:</strong> +49 123 456791
                      </p>
                      <p>
                        <strong>Erreichbarkeit:</strong> Mo-Fr, 8:00-16:30 Uhr
                      </p>
                      <p className="mt-4">
                        <strong>Zuständig für:</strong>
                      </p>
                      <ul className="list-disc pl-5">
                        <li>Raumreservierungen</li>
                        <li>Gebäudezugang</li>
                        <li>Reparaturen</li>
                        <li>Büroausstattung</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="container px-4 py-12 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter">KI-Chatbot für Unternehmenswissen</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Erhalten Sie sofortige Antworten auf Ihre Fragen mit unserem KI-gestützten Assistenten
              </p>
            </div>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="bg-gray-100 p-3 rounded-lg self-start max-w-[80%] dark:bg-gray-800">
                      <p>Wie kann ich einen Urlaubsantrag stellen?</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-lg self-end max-w-[80%]">
                      <p>
                        Um einen Urlaubsantrag zu stellen, loggen Sie sich bitte im Mitarbeiterportal ein und navigieren
                        Sie zum Bereich "Meine Zeit". Dort finden Sie die Option "Urlaub beantragen". Füllen Sie das
                        Formular mit Ihren gewünschten Urlaubsdaten aus und reichen Sie es zur Genehmigung ein. Ihr
                        Vorgesetzter wird automatisch benachrichtigt und kann Ihren Antrag prüfen.
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        <Link href="/guides/vacation" className="text-blue-600 hover:underline dark:text-blue-400">
                          Detaillierte Anleitung ansehen →
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button asChild className="mt-4">
                      <Link href="/chat">Mit dem KI-Assistenten chatten</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50 dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
              © 2025 Unternehmens-Helpdesk. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
