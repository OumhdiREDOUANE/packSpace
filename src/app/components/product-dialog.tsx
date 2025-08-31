"use client"

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
import { Plus, X } from "lucide-react"

interface Category {
  id_categorie: number
  name_categorie: string
}

interface Product {
  id_product: number
  name_product: string
  description_product: string
  categorie_id: number
  categorie?: string
  images: { url_image: string }[]
}

interface ProductDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: any) => void
}

export function ProductDialog({ product, open, onOpenChange, onSave }: ProductDialogProps) {
  const [formData, setFormData] = useState({
    name_product: "",
    description_product: "",
    categorie_id: "",
    images: [] as string[],
  })

  const [categories, setCategories] = useState<Category[]>([])

  // جلب لائحة الكاتيجوري من API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
  }, [])

  useEffect(() => {
    if (product) {
      setFormData({
        name_product: product.name_product,
        description_product: product.description_product,
        categorie_id: product.categorie_id.toString(),
        images: product.images.map((img) => img.url_image),
      })
    } else {
      setFormData({
        name_product: "",
        description_product: "",
        categorie_id: "",
        images: ["/placeholder.svg"],
      })
    }
  }, [product, open])

  const addImage = () => setFormData({ ...formData, images: [...formData.images, ""] })

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({ ...formData, images: newImages })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Update product information below." : "Fill in the details to create a new product."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name_product">Product Name</Label>
              <Input
                id="name_product"
                value={formData.name_product}
                onChange={(e) => setFormData({ ...formData, name_product: e.target.value })}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description_product">Description</Label>
              <Textarea
                id="description_product"
                value={formData.description_product}
                onChange={(e) => setFormData({ ...formData, description_product: e.target.value })}
                placeholder="Enter product description"
                rows={3}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categorie_id">Category</Label>
              <Select
                value={formData.categorie_id}
                onValueChange={(value) => setFormData({ ...formData, categorie_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id_categorie} value={cat.id_categorie.toString()}>
                      {cat.name_categorie}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Product Images</Label>
                <Button type="button" variant="outline" size="sm" onClick={addImage}>
                  <Plus className="h-4 w-4" />
                  Add Image
                </Button>
              </div>
              <div className="space-y-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Input
                      value={image}
                      onChange={(e) => updateImage(index, e.target.value)}
                      placeholder="Enter image URL"
                      required
                    />
                    {image && (
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="h-16 w-16 rounded-md object-cover border"
                      />
                    )}
                    {formData.images.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{product ? "Update" : "Create"} Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
