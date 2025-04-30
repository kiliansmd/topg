import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Diese Funktion kann verwendet werden, um zu prüfen, ob die Supabase-Tabelle existiert
async function checkSupabaseSetup() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ""

    if (!supabaseUrl || !supabaseKey) {
      return false
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Prüfen, ob die Tabelle existiert
    const { error } = await supabase.from("company_knowledge").select("id").limit(1)

    return !error
  } catch (error) {
    console.error("Fehler beim Prüfen der Supabase-Einrichtung:", error)
    return false
  }
}

// Diese Variable speichert den Status der Supabase-Einrichtung
let isSupabaseSetup: boolean | null = null
let lastCheckTime = 0

export async function middleware(request: NextRequest) {
  // Nur für die Chat-API-Route
  if (request.nextUrl.pathname === "/api/chat" && request.method === "POST") {
    // Prüfen, ob Supabase eingerichtet ist (mit Caching)
    const currentTime = Date.now()
    if (isSupabaseSetup === null || currentTime - lastCheckTime > 60000) {
      // Prüfe höchstens einmal pro Minute
      isSupabaseSetup = await checkSupabaseSetup()
      lastCheckTime = currentTime
    }

    // Wenn Supabase nicht eingerichtet ist, zur Fallback-Route umleiten
    if (!isSupabaseSetup) {
      const url = new URL("/api/chat/fallback", request.url)
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/chat",
}
