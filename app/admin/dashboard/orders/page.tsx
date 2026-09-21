"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Filter } from "lucide-react"
import { readOrders, saveOrders, type AdminOrder } from "@/lib/admin-data"

export default function ManageOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    setOrders(readOrders())
  }, [])

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.recipient.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "All" || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus as AdminOrder["status"] } : o))
    setOrders(updated)
    saveOrders(updated)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700"
      case "Processing":
        return "bg-blue-100 text-blue-700"
      case "Shipped":
        return "bg-purple-100 text-purple-700"
      case "Delivered":
        return "bg-green-100 text-green-700"
      default:
        return "bg-zinc-100 text-zinc-700"
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
                      <Select value={order.status} onValueChange={(val) => handleStatusChange(order.id, val)}>
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
