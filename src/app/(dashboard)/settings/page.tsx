"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    contact_phone: "",
    contact_whatsapp: "",
    contact_email: "",
    promo_code: "",
  })
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/setting`)
        const data = await res.json()
        setSettings(data)
      } catch (err) {
            throw new Error("Erreur lors du chargement des commandes");
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/setting/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      const updated = await res.json()
      setSettings(updated)
      alert("Settings saved successfully!")
    } catch (err) {
           throw new Error("Erreur lors du chargement des commandes");
      alert("Error saving settings")
    }
  }

 

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Settings</CardTitle>
              <CardDescription>Manage your contact info</CardDescription>
            </CardHeader>
            {loading?
              <CardContent >
                <div className="text-center">loading...</div>
              </CardContent>
            :(
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={settings.contact_phone}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input
                  value={settings.contact_whatsapp}
                  onChange={(e) => setSettings({ ...settings, contact_whatsapp: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={settings.contact_email}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Prix Promo (Dicimal)</Label>
                <Input
                  value={settings.promo_code}
                  onChange={(e) => setSettings({ ...settings, promo_code: e.target.value })}
                />
              </div>
            </CardContent>)}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
