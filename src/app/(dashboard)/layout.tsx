import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "PackSpace Dashboard",
  description: "Complete project management dashboard",
  generator: "v0.app",
}

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
   const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value || "";
  

  if (!token) {
    redirect("/login"); // إعادة التوجيه من السيرفر مباشرة
  }
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  ) 
}
