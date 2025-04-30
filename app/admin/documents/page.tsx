"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, FileText, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function DocumentUploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [category, setCategory] = useState<string>("allgemein")
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [message, setMessage] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Bitte wählen Sie mindestens eine Datei aus.")
      setStatus("error")
      return
    }

    setStatus("uploading")
    setMessage("Dokumente werden hochgeladen und indexiert...")

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("files", file)
      })
      formData.append("category", category)

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Fehler beim Hochladen der Dokumente")
      }

      const data = await response.json()
      setMessage(`${data.count} Dokumente erfolgreich hochgeladen und indexiert.`)
      setStatus("success")
      setFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Fehler beim Hochladen:", error)
      setMessage("Fehler beim Hochladen und Indexieren der Dokumente.")
      setStatus("error")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Dokumente hochladen</h1>
          <p className="mt-2 text-gray-500">
            Laden Sie Unternehmensdokumente hoch, um sie für den KI-Chatbot verfügbar zu machen
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Neue Dokumente hinzufügen</CardTitle>
            <CardDescription>Unterstützte Formate: PDF, DOCX, TXT, MD</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-10 w-10 mx-auto text-gray-400" />
              <p className="mt-2">Dateien hierher ziehen oder klicken zum Auswählen</p>
              <Input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.txt,.md"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Ausgewählte Dateien</Label>
                <div className="border rounded-lg divide-y">
                  {files.map((file, index) => (
                    <div key={index} className="p-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="flex-1 truncate">{file.name}</span>
                      <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="category">Kategorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Kategorie auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allgemein">Allgemein</SelectItem>
                  <SelectItem value="hr">Personalabteilung</SelectItem>
                  <SelectItem value="it">IT & Technik</SelectItem>
                  <SelectItem value="finance">Finanzen</SelectItem>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="policies">Richtlinien</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {status !== "idle" && (
              <Alert variant={status === "error" ? "destructive" : status === "success" ? "default" : "outline"}>
                {status === "uploading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "success" && <Check className="h-4 w-4" />}
                {status === "error" && <AlertCircle className="h-4 w-4" />}
                <AlertTitle>
                  {status === "uploading" && "Wird verarbeitet"}
                  {status === "success" && "Erfolg"}
                  {status === "error" && "Fehler"}
                </AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleUpload} disabled={status === "uploading" || files.length === 0} className="w-full">
              {status === "uploading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wird verarbeitet...
                </>
              ) : (
                "Dokumente hochladen und indexieren"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
