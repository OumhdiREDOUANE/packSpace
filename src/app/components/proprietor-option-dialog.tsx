"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

interface ProprietorOptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  option?: any | null
  onSaved?: () => void
    proprieters: { id_proprieter: string; name_proprieter: string }[] // قائمة Proprietors
  products: { id_product: string; name_product: string }[]
}

export function ProprietorOptionDialog({ open, onOpenChange, option,proprieters,products, onSave }: ProprietorOptionDialogProps) {

  
  const [formData, setFormData] = useState({
    name_option: "",
    description_option: "",
    image_option: "",
    proprieter_id: "",
    product_id: "",
    prix: "",
    
  })

  

 

  useEffect(() => {
    if (option) {
      setFormData({
        name_option: option.name_option,
        description_option: option.description_option,
        image_option: option.image_option,
        proprieter_id: "",
        product_id: "" ,
        prix: option.prix ? String(option.prix) : "" ,
       
      })
    } else {
      setFormData({
        name_option: "",
        description_option: "",
        image_option: "",
        proprieter_id: "",
        product_id: "",
        prix: "",
       
      })
    }
  }, [option, open])

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSave(formData)
    }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{option ? "Edit Option" : "Add New Option"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name_option">Option Name</Label>
              <Input
                id="name_option"
                value={formData.name_option}
                onChange={(e) => setFormData({...formData, name_option: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proprieter_id">Proprietor</Label>
             <Select
  value={formData.proprieter_id  || ''} // null يعني لم يتم الاختيار بعد
  onValueChange={(value) => setFormData({ ...formData, proprieter_id: value })}
  required={option ?false  :  true}
>
  <SelectTrigger>
    <SelectValue placeholder="Select Proprietor" >
      
    </SelectValue>
  </SelectTrigger>
  <SelectContent>
    {proprieters.map((p) => (
      <SelectItem key={p.id_proprieter} value={String(p.id_proprieter)}>
        {p.name_proprieter}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description_option">Description</Label>
            <Textarea
              id="description_option"
              value={formData.description_option}
              onChange={(e) => setFormData({...formData, description_option: e.target.value})}
              required
            />
          </div>
<div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Product Images</Label>
                
              </div>
              <div className="space-y-3">
                
                  <div  className="flex items-start gap-3 p-3 border rounded-lg">
                    <Input
                      value={formData.image_option}
                         onChange={(e) => setFormData({...formData, image_option: e.target.value})}
                      placeholder="Enter image URL"
                      required
                    />
                    {formData.image_option && (
                      <img
                        src={formData.image_option}
                        alt={`Product image `}
                        className="h-16 w-16 rounded-md object-cover border"
                      />
                    )}
                    
                  </div>
                
              </div>
            </div>
          <div className="grid gap-4 md:grid-cols-2">
            
            <div className="space-y-2">
              <Label htmlFor="product_id">Product</Label>
                <Select
  value={formData.product_id || ''} // null يعني لم يتم الاختيار بعد
  onValueChange={(value) => setFormData({ ...formData, product_id: value })}
  required={option ? false : true}
>
  <SelectTrigger>
    <SelectValue placeholder="Select product" >
      
    </SelectValue>
  </SelectTrigger>
  <SelectContent>
    {products.map((p) => (
      <SelectItem key={p.id_product} value={String(p.id_product)}>
        {p.name_product}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prix">Prix</Label>
            <Input
              id="prix"
              type="number"
              value={formData.prix}
              onChange={(e) => setFormData({...formData, prix: e.target.value})}
                required={option ?false  :  true}
            />
          </div>

          

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{option ? "Update Option" : "Create Option"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
