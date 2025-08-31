"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Clock, Mail, User, Calendar } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Cart {
  id: string
  customerName: string
  customerEmail: string
  items: CartItem[]
  total: number
  status: "active" | "abandoned" | "converted"
  lastActivity: string
  createdAt: string
}

interface CartDetailsDialogProps {
  cart: Cart | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDetailsDialog({ cart, open, onOpenChange }: CartDetailsDialogProps) {
  if (!cart) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "abandoned":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "converted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = 9.99

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Cart Details - {cart.id}</span>
            <Badge className={getStatusColor(cart.status)}>
              <ShoppingCart className="h-3 w-3 mr-1" />
              {cart.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>Cart created on {formatDate(cart.createdAt)}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Customer Information</h3>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{cart.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{cart.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Last activity: {formatDate(cart.lastActivity)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Created: {formatDate(cart.createdAt)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Cart Items */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Cart Items</h3>
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Cart Summary */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Cart Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Estimated Total:</span>
                <span>${(subtotal + tax + shipping).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-between">
            {cart.status === "abandoned" && <Button variant="outline">Send Recovery Email</Button>}
            {cart.status === "active" && <Button variant="outline">Send Reminder</Button>}
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
