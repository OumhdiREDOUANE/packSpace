"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CartDetailsDialog } from "@/components/cart-details-dialog"
import { Search, Eye, ShoppingCart, Clock, DollarSign, Users, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

const mockCarts: Cart[] = [
  {
    id: "CART-001",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    items: [
      {
        id: "1",
        name: "Wireless Headphones",
        price: 199.99,
        quantity: 1,
        image: "/wireless-headphones.png",
      },
      {
        id: "2",
        name: "Smart Watch",
        price: 299.99,
        quantity: 1,
        image: "/smartwatch-lifestyle.png",
      },
    ],
    total: 499.98,
    status: "active",
    lastActivity: "2024-02-20T10:30:00Z",
    createdAt: "2024-02-20T09:15:00Z",
  },
  {
    id: "CART-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    items: [
      {
        id: "3",
        name: "Coffee Mug",
        price: 15.99,
        quantity: 3,
        image: "/simple-coffee-mug.png",
      },
      {
        id: "4",
        name: "Laptop Stand",
        price: 79.99,
        quantity: 1,
        image: "/laptop-stand.png",
      },
    ],
    total: 127.96,
    status: "abandoned",
    lastActivity: "2024-02-18T14:22:00Z",
    createdAt: "2024-02-18T13:45:00Z",
  },
  {
    id: "CART-003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@example.com",
    items: [
      {
        id: "5",
        name: "Bluetooth Speaker",
        price: 89.99,
        quantity: 2,
        image: "/bluetooth-speaker.png",
      },
    ],
    total: 179.98,
    status: "converted",
    lastActivity: "2024-02-19T16:45:00Z",
    createdAt: "2024-02-19T15:30:00Z",
  },
  {
    id: "CART-004",
    customerName: "Sarah Wilson",
    customerEmail: "sarah.wilson@example.com",
    items: [
      {
        id: "1",
        name: "Wireless Headphones",
        price: 199.99,
        quantity: 1,
        image: "/wireless-headphones.png",
      },
      {
        id: "3",
        name: "Coffee Mug",
        price: 15.99,
        quantity: 2,
        image: "/simple-coffee-mug.png",
      },
    ],
    total: 231.97,
    status: "active",
    lastActivity: "2024-02-20T11:15:00Z",
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "CART-005",
    customerName: "David Brown",
    customerEmail: "david.brown@example.com",
    items: [
      {
        id: "4",
        name: "Laptop Stand",
        price: 79.99,
        quantity: 1,
        image: "/laptop-stand.png",
      },
    ],
    total: 79.99,
    status: "abandoned",
    lastActivity: "2024-02-17T09:30:00Z",
    createdAt: "2024-02-17T08:45:00Z",
  },
]

export function CartOverview() {
  const [carts, setCarts] = useState<Cart[]>(mockCarts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null)
  const [isCartDetailsOpen, setIsCartDetailsOpen] = useState(false)

  const filteredCarts = carts.filter((cart) => {
    const matchesSearch =
      cart.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || cart.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewCart = (cart: Cart) => {
    setSelectedCart(cart)
    setIsCartDetailsOpen(true)
  }

  const handleClearCart = (cartId: string) => {
    setCarts(carts.filter((cart) => cart.id !== cartId))
  }

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

  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Less than 1 hour ago"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  // Calculate statistics
  const activeCarts = carts.filter((cart) => cart.status === "active")
  const abandonedCarts = carts.filter((cart) => cart.status === "abandoned")
  const convertedCarts = carts.filter((cart) => cart.status === "converted")
  const totalCartValue = carts.reduce((sum, cart) => sum + cart.total, 0)

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Carts</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCarts.length}</div>
            <p className="text-xs text-muted-foreground">Currently shopping</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abandoned Carts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{abandonedCarts.length}</div>
            <p className="text-xs text-muted-foreground">Need follow-up</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Converted Carts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{convertedCarts.length}</div>
            <p className="text-xs text-muted-foreground">Successful orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cart Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCartValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Potential revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Carts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Shopping Carts ({filteredCarts.length})</CardTitle>
          </div>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search carts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="abandoned">Abandoned</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cart ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCarts.map((cart) => (
                  <TableRow key={cart.id}>
                    <TableCell className="font-medium">{cart.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{cart.customerName}</div>
                        <div className="text-sm text-muted-foreground">{cart.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {cart.items.slice(0, 3).map((item, index) => (
                            <img
                              key={item.id}
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-8 w-8 rounded-full border-2 border-background object-cover"
                              style={{ zIndex: cart.items.length - index }}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {cart.items.length} item{cart.items.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>${cart.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(cart.status)}>{cart.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{formatLastActivity(cart.lastActivity)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewCart(cart)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleClearCart(cart.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CartDetailsDialog cart={selectedCart} open={isCartDetailsOpen} onOpenChange={setIsCartDetailsOpen} />
    </div>
  )
}
