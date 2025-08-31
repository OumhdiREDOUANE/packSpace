"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OrderDetailsDialog } from "@/components/order-details-dialog"
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  shippingAddress: string
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
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
    status: "delivered",
    orderDate: "2024-02-15",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    items: [
      {
        id: "3",
        name: "Coffee Mug",
        price: 15.99,
        quantity: 2,
        image: "/simple-coffee-mug.png",
      },
    ],
    total: 31.98,
    status: "shipped",
    orderDate: "2024-02-16",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@example.com",
    items: [
      {
        id: "4",
        name: "Laptop Stand",
        price: 79.99,
        quantity: 1,
        image: "/laptop-stand.png",
      },
      {
        id: "5",
        name: "Bluetooth Speaker",
        price: 89.99,
        quantity: 1,
        image: "/bluetooth-speaker.png",
      },
    ],
    total: 169.98,
    status: "processing",
    orderDate: "2024-02-17",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "ORD-004",
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
    ],
    total: 199.99,
    status: "pending",
    orderDate: "2024-02-18",
    shippingAddress: "321 Elm St, Miami, FL 33101",
  },
  {
    id: "ORD-005",
    customerName: "David Brown",
    customerEmail: "david.brown@example.com",
    items: [
      {
        id: "2",
        name: "Smart Watch",
        price: 299.99,
        quantity: 1,
        image: "/smartwatch-lifestyle.png",
      },
    ],
    total: 299.99,
    status: "cancelled",
    orderDate: "2024-02-19",
    shippingAddress: "654 Maple Dr, Seattle, WA 98101",
  },
]

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsOrderDetailsOpen(true)
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />
      case "processing":
        return <Package className="h-3 w-3" />
      case "shipped":
        return <Truck className="h-3 w-3" />
      case "delivered":
        return <CheckCircle className="h-3 w-3" />
      case "cancelled":
        return <XCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  const getOrderTotal = () => {
    return filteredOrders.reduce((sum, order) => sum + order.total, 0)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
            <p className="text-sm text-muted-foreground">Total Value: ${getOrderTotal().toFixed(2)}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <img
                            key={item.id}
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-8 w-8 rounded-full border-2 border-background object-cover"
                            style={{ zIndex: order.items.length - index }}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select
                        value={order.status}
                        onValueChange={(value: Order["status"]) => handleUpdateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-[120px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <OrderDetailsDialog
        order={selectedOrder}
        open={isOrderDetailsOpen}
        onOpenChange={setIsOrderDetailsOpen}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </Card>
  )
}
