"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProprietorsTable } from "@/components/proprietors-table"
import { ProprietorDialog } from "@/components/proprietor-dialog"
import { DeleteProprietorDialog } from "@/components/delete-proprietor-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import type { Proprietor } from "@/types/proprietor"

interface Product {
  id_product: string
  name_product: string
}

export default function ProprietorsPage() {
  const [proprietors, setProprietors] = useState<Proprietor[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProprietor, setSelectedProprietor] = useState<Proprietor | null>(null)
  const [proprietorDialogOpen, setProprietorDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productFilter, setProductFilter] = useState<string | null>(null)

  // Fetch proprietors
  const fetchProprietors = async () => {
    let url = "http://127.0.0.1:8000/api/proprieterDashboard"
    if (productFilter) url += `?product_id=${productFilter}`

    const res = await fetch(url, { cache: "no-store" })
    const data = await res.json()

    setProprietors(data.proprieters || [])
    setProducts(data.products || [])
  }

  // Fetch products
  

  useEffect(() => {
    fetchProprietors()
  }, [productFilter])

  // Save
  const handleSave = async (formData: Partial<Proprietor>) => {
    if (selectedProprietor) {
      await fetch(`http://127.0.0.1:8000/api/proprieterDashboard/${selectedProprietor.id_proprieter}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    } else {
      await fetch("http://127.0.0.1:8000/api/proprieterDashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    }
    setProprietorDialogOpen(false)
    setSelectedProprietor(null)
    fetchProprietors()
  }

  // Delete
  const handleDelete = async () => {
    if (selectedProprietor) {
      await fetch(`http://127.0.0.1:8000/api/proprieterDashboard/${selectedProprietor.id_proprieter}`, {
        method: "DELETE",
      })
      setDeleteDialogOpen(false)
      setSelectedProprietor(null)
      fetchProprietors()
    }
  }

  // Search filter
  const filtered = proprietors.filter(
    (p) =>
      p.name_proprieter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description_proprieter || "").toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Proprietors Management</h1>
          <Button onClick={() => { setSelectedProprietor(null); setProprietorDialogOpen(true) }}>
            <Plus className="mr-2 h-4 w-4" /> Add Proprietor
          </Button>
        </div>

        {/* Search + Product Filter */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Dropdown filter */}
          <Select onValueChange={(value) => setProductFilter(value === "all" ? null : value)}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filter by Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              {products.map((product) => (
                <SelectItem key={product.id_product} value={product.id_product}>
                  {product.name_product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <ProprietorsTable
          proprietors={filtered}
          onEdit={(p) => { setSelectedProprietor(p); setProprietorDialogOpen(true) }}
          onDelete={(p) => { setSelectedProprietor(p); setDeleteDialogOpen(true) }}
        />
      </div>

      {/* Dialogs */}
      <ProprietorDialog
        open={proprietorDialogOpen}
        onOpenChange={setProprietorDialogOpen}
        proprietor={selectedProprietor}
        onSave={handleSave}
      />
      <DeleteProprietorDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        proprietor={selectedProprietor}
        onConfirm={handleDelete}
      />
    </DashboardLayout>
  )
}
