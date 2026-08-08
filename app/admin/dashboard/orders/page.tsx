"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Filter } from "lucide-react"

// Mock initial data
const initialOrders = [
  { id: "GFT-452391", recipient: "Jane Doe", date: "2026-08-08", status: "Pending", amount: 8500 },
  { id: "GFT-923841", recipient: "Michael Smith", date: "2026-08-07", status: "Processing", amount: 12500 },
  { id: "GFT-129482", recipient: "Sarah Jenkins", date: "2026-08-07", status: "Shipped", amount: 4200 },
  { id: "GFT-847291", recipient: "Robert Williams", date: "2026-08-06", status: "Delivered", amount: 6800 },
  { id: "GFT-592813", recipient: "Emily Chen", date: "2026-08-05", status: "Delivered", amount: 5500 },
]

export default function ManageOrders() {
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.recipient.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "All" || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Pending": return "bg-amber-100 text-amber-700"
      case "Processing": return "bg-blue-100 text-blue-700"
      case "Shipped": return "bg-purple-100 text-purple-700"
      case "Delivered": return "bg-green-100 text-green-700"
      default: return "bg-zinc-100 text-zinc-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Manage Orders</h2>
          <p className="text-zinc-500">View and update customer order statuses.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Recent Orders</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Search order ID or name..."
                  className="pl-9 bg-zinc-50 border-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-zinc-50 border-none">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-zinc-500" />
                    <span>{statusFilter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-zinc-50">
                <TableRow>
                  <TableHead className="font-semibold text-zinc-900">Order ID</TableHead>
                  <TableHead className="font-semibold text-zinc-900">Recipient</TableHead>
                  <TableHead className="font-semibold text-zinc-900">Date</TableHead>
                  <TableHead className="font-semibold text-zinc-900">Total (KES)</TableHead>
                  <TableHead className="font-semibold text-zinc-900">Status</TableHead>
                  <TableHead className="text-right font-semibold text-zinc-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-zinc-900">{order.id}</TableCell>
                    <TableCell>{order.recipient}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Select 
                        value={order.status} 
                        onValueChange={(val) => handleStatusChange(order.id, val)}
                      >
                        <SelectTrigger className={`h-8 border-none font-medium w-[120px] ${getStatusColor(order.status)}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-900">
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
