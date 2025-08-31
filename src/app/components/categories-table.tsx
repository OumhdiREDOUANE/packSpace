"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Package } from "lucide-react"
import { CategoryDialog } from "@/components/category-dialog"
import { DeleteCategoryDialog } from "@/components/delete-category-dialog"

interface Category {
  id_categorie: string
  name_categorie: string
  description_categorie: string
  products_count: number
  
}

export function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)

  const API_URL = "http://127.0.0.1:8000/api/categoryDashboard"

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setLoading(false)
      console.log(data)
      setCategories(data.data) // Laravel resource retourne data[]
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.name_categorie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description_categorie.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCategory = () => {
    setSelectedCategory(null)
    setIsDialogOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setIsDialogOpen(true)
  }

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveCategory = async (categoryData: Partial<Category>) => {
    try {
      if (selectedCategory) {
        // Edit existing category
        const res = await fetch(`${API_URL}/${selectedCategory.id_categorie}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        })
        if (!res.ok) throw new Error("Failed to update category")
      } else {
        // Add new category
        const res = await fetch("http://127.0.0.1:8000/api/categoryDashboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        })
        if (!res.ok) throw new Error("Failed to create category")
      }
      fetchCategories()
      setIsDialogOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  const confirmDelete = async () => {
    if (categoryToDelete) {
      try {
        const res = await fetch(`${API_URL}/${categoryToDelete.id_categorie}`, {
          method: "DELETE",
        })
        if (!res.ok) throw new Error("Failed to delete category")
        fetchCategories()
        setIsDeleteDialogOpen(false)
        setCategoryToDelete(null)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage product categories and their assignments</CardDescription>
            </div>
            <Button onClick={handleAddCategory}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Products</TableHead>
            
                  
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              {loading ? <p>Loading...</p> : <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id_categorie}>
                    <TableCell className="font-medium">{category.name_categorie}</TableCell>
                    <TableCell className="text-muted-foreground">{category.description_categorie}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        {category.products_count}
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> }           </Table>
          </div>
        </CardContent>
      </Card>

      <CategoryDialog
        category={selectedCategory}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveCategory}
      />

      <DeleteCategoryDialog
        category={categoryToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </>
  )
}
