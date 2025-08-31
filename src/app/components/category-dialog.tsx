"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Category {
  id_categorie: string
  name_categorie: string
  description_categorie: string
  productCount: number
  
 
}

interface CategoryDialogProps {
  category: Category | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (category: Partial<Category>) => void
}

export function CategoryDialog({ category, open, onOpenChange, onSave }: CategoryDialogProps) {
  const [formData, setFormData] = useState({
    name_categorie: "",
    description_categorie:""   
  })

  useEffect(() => {
    if (category) {
      setFormData({
        name_categorie: category.name_categorie,
        description_categorie: category.description_categorie,
        
      })
    } else {
      setFormData({
        name_categorie: "",
        description_categorie: "",
       
      })
    }
  }, [category, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
          <DialogDescription>
            {category ? "Update the category information below." : "Create a new category for organizing products."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={formData.name_categorie}
                onChange={(e) => setFormData({ ...formData, name_categorie: e.target.value })}
                placeholder="Enter category name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description_categorie}
                onChange={(e) => setFormData({ ...formData, description_categorie: e.target.value })}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{category ? "Update Category" : "Create Category"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
