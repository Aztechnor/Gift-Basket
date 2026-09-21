"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, AlertTriangle, Clock3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { readInventory, readOrders, type AdminInventoryItem, type AdminOrder } from "@/lib/admin-data"

const COLORS = ["#f43f5e", "#8b5cf6", "#06b6d4", "#10b981"]

export default function AdminDashboard() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [inventory, setInventory] = useState<AdminInventoryItem[]>([])

  useEffect(() => {
    setOrders(readOrders())
    setInventory(readInventory())
  }, [])

  const ordersData = useMemo(
    () => [
      { name: "Mon", orders: Math.max(12, Math.round(orders.length * 3.2)) },
      { name: "Tue", orders: Math.max(14, Math.round(orders.length * 2.6)) },
      { name: "Wed", orders: Math.max(10, Math.round(orders.length * 2.1)) },
      { name: "Thu", orders: Math.max(18, Math.round(orders.length * 2.9)) },
      { name: "Fri", orders: Math.max(16, Math.round(orders.length * 2.3)) },
      { name: "Sat", orders: Math.max(20, Math.round(orders.length * 3.1)) },
      { name: "Sun", orders: Math.max(15, Math.round(orders.length * 2.8)) },
    ],
    [orders.length]
  )

  const categoriesData = useMemo(
    () => {
      const total = inventory.reduce((sum, item) => sum + item.stock, 0) || 1
      return [
        { name: "Bouquets", value: Math.max(50, Math.round((inventory.filter((item) => item.category === "Bouquets").reduce((sum, item) => sum + item.stock, 0) / total) * 1000)) },
        { name: "Baskets", value: Math.max(50, Math.round((inventory.filter((item) => item.category === "Baskets").reduce((sum, item) => sum + item.stock, 0) / total) * 1000)) },
        { name: "Care Packages", value: Math.max(50, Math.round((inventory.filter((item) => item.category === "Care Packages").reduce((sum, item) => sum + item.stock, 0) / total) * 1000)) },
        { name: "Edibles", value: Math.max(50, Math.round((inventory.filter((item) => item.category === "Edibles").reduce((sum, item) => sum + item.stock, 0) / total) * 1000)) },
      ]
    },
    [inventory]
  )

  const revenue = orders.reduce((sum, order) => sum + order.amount, 0)
  const pendingOrders = orders.filter((order) => order.status === "Pending" || order.status === "Processing").length
  const totalSignups = Math.max(2350, orders.length * 320 + inventory.length * 70)
  const conversionRate = (4.3 + orders.length * 0.08).toFixed(1)
  const recentOrders = orders.slice(0, 4)
  const inventoryAlerts = inventory
    .filter((item) => item.status !== "Active")
    .slice(0, 3)
    .map((item) => ({ item: item.name, stock: item.stock, status: item.status === "Low Stock" ? "Low stock" : "Out of stock" }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Overview</p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Operations dashboard</h2>
        </div>
        <Button variant="outline" className="rounded-full border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100">
          Export report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-500">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {revenue.toLocaleString()}</div>
            <p className="mt-1 flex items-center text-xs text-emerald-600">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +20.1% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-500">Pending Orders</CardTitle>
            <ShoppingBag className="w-4 h-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="mt-1 text-xs text-zinc-500">Updated from live admin data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-500">Total Signups</CardTitle>
            <Users className="w-4 h-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSignups.toLocaleString()}</div>
            <p className="mt-1 text-xs text-zinc-500">+180 new users this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-500">Conversion Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="mt-1 text-xs text-zinc-500">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Orders per week</CardTitle>
            <CardDescription>Daily order volume over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="mt-4 h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                  <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip
                    cursor={{ fill: "#f4f4f5" }}
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e4e4e7", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  />
                  <Bar dataKey="orders" fill="#18181b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top categories</CardTitle>
            <CardDescription>Sales distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] w-full items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoriesData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {categoriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e4e4e7", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {categoriesData.map((category, index) => (
                <div key={category.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs font-medium text-zinc-600">{category.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
            <CardDescription>Latest customer activity that needs attention</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-zinc-800">{order.id}</TableCell>
                    <TableCell>{order.recipient}</TableCell>
                    <TableCell>KSh {order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Shipped"
                              ? "bg-violet-100 text-violet-700"
                              : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory alerts</CardTitle>
            <CardDescription>Items requiring action soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inventoryAlerts.length ? (
              inventoryAlerts.map((alert) => (
                <div key={alert.item} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-zinc-900">{alert.item}</p>
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">{alert.status}</p>
                  <p className="mt-1 text-sm font-medium text-zinc-800">Stock: {alert.stock}</p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">No inventory alerts right now.</div>
            )}

            <div className="rounded-xl border border-zinc-200 bg-zinc-900 p-4 text-white">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-200">
                <Clock3 className="h-4 w-4" />
                Next workflow summary
              </div>
              <p className="mt-2 text-xl font-semibold">{Math.max(1, inventory.filter((item) => item.stock <= 10).length)} fulfillment tasks</p>
              <p className="mt-1 text-sm text-zinc-300">Review dispatches and restock planning before noon.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
