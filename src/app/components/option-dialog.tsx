"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, ImageIcon } from "lucide-react"

interface Option {
  id_option: string
  name_option: string
  image_option: string
  proprieter_id: string
}

interface Proprietor {
  id_proprieter: string
  name_proprieter: string
}

interface OptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  option?: Option | null
  proprietors: Proprietor[]
  onSave: (optionData: Partial<Option>) => void
}

export function OptionDialog({ open, onOpenChange, option, proprietors, onSave }: OptionDialogProps) {
  const [formData, setFormData] = useState({
    name_option: "",
    image_option: "",
    proprieter_id: "",
  })
  const [imagePreview, setImagePreview] = useState<string>("")

  useEffect(() => {
    if (option) {
      setFormData({
        name_option: option.name_option,
        image_option: option.image_option,
        proprieter_id: option.proprieter_id,
      })
      setImagePreview(option.image_option)
    } else {
      setFormData({
        name_option: "",
        image_option: "",
        proprieter_id: "",
      })
      setImagePreview("")
    }
  }, [option, open])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData({ ...formData, image_option: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview("")
    setFormData({ ...formData, image_option: "" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{option ? "Edit Option" : "Add New Option"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name_option">Option Name</Label>
            <Input
              id="name_option"
              value={formData.name_option}
              onChange={(e) => setFormData({ ...formData, name_option: e.target.value })}
              placeholder="Enter option name..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Option Image</Label>
            {imagePreview && (
              <div className="relative w-full h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Option preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            {!imagePreview && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" className="mb-2 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500">or</p>
                  <Input
                    placeholder="Enter image URL..."
                    value={formData.image_option}
                    onChange={(e) => {
                      setFormData({ ...formData, image_option: e.target.value })
                      setImagePreview(e.target.value)
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="proprieter_id">Proprietor</Label>
            <Select
              value={formData.proprieter_id}
              onValueChange={(value) => setFormData({ ...formData, proprieter_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select proprietor" />
              </SelectTrigger>
              <SelectContent>
                {proprietors.map((proprietor) => (
                  <SelectItem key={proprietor.id_proprieter} value={proprietor.id_proprieter}>
                    {proprietor.name_proprieter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{option ? "Update Option" : "Create Option"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
