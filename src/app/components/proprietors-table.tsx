"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Building, Package } from "lucide-react"

interface Proprietor {
  id_proprieter: string
  name_proprieter: string
  description_proprieter?: string
  product_count: number
  option_count: number
  total_options_owned: number
  filtered_by_product?: number
}
interface ProprietorsTableProps {
  proprietors: Proprietor[]
  onEdit: (proprietor: Proprietor) => void
  onDelete: (proprietor: Proprietor) => void
}

export function ProprietorsTable({ proprietors, onEdit, onDelete }: ProprietorsTableProps) {
  return (
    <div className="space-y-4">
      {proprietors.map((proprietor) => (
        <Card key={proprietor.id_proprieter}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{proprietor.name_proprieter}</CardTitle>
                  <p className="text-sm text-muted-foreground">{proprietor.description_proprieter}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(proprietor)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(proprietor)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{proprietor.option_count} Options</span>
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{proprietor.product_count} products</span>
            </div>
          </CardContent>
        </Card>
      ))}
      
    </div>
  )
}
