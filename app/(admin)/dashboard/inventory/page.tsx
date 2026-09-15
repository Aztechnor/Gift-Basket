"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Search, UploadCloud } from "lucide-react"

// Mock initial data
const initialProducts = [
  { id: 1, name: "Classic Red Rose Bouquet", price: 8500, category: "Bouquets", stock: 24, status: "Active" },
  { id: 2, name: "Artisan Chocolate Truffle Box", price: 4200, category: "Edibles", stock: 15, status: "Active" },
  { id: 3, name: "Spa Day Relaxation Basket", price: 12500, category: "Baskets", stock: 8, status: "Low Stock" },
  { id: 4, name: "Get Well Soon Care Package", price: 6800, category: "Care Packages", stock: 45, status: "Active" },
  { id: 5, name: "Premium Coffee Gift Set", price: 5500, category: "Baskets", stock: 0, status: "Out of Stock" },
]

export default function InventoryManagement() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null as File | null
  })

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      stock: Number(formData.stock),
      status: Number(formData.stock) > 10 ? "Active" : Number(formData.stock) > 0 ? "Low Stock" : "Out of Stock"
    }
    setProducts([...products, newProduct])
    setIsAddOpen(false)
    setFormData({ name: "", description: "", price: "", category: "", stock: "", image: null })
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentProduct) return
    const updated = products.map(p => {
      if (p.id === currentProduct.id) {
        return {
          ...p,
          name: formData.name,
          price: Number(formData.price),
          category: formData.category,
          stock: Number(formData.stock),
          status: Number(formData.stock) > 10 ? "Active" : Number(formData.stock) > 0 ? "Low Stock" : "Out of Stock"
        }
      }
      return p
    })
    setProducts(updated)
    setIsEditOpen(false)
  }

  const openEdit = (product: any) => {
    setCurrentProduct(product)
    setFormData({
      name: product.name,
      description: "A beautiful gift item.", // Mock description
      price: String(product.price),
      category: product.category,
      stock: String(product.stock),
      image: null
    })
    setIsEditOpen(true)
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const renderFormFields = () => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Price (KES)</Label>
          <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bouquets">Bouquets</SelectItem>
            <SelectItem value="Baskets">Baskets</SelectItem>
            <SelectItem value="Care Packages">Care Packages</SelectItem>
            <SelectItem value="Edibles">Edibles</SelectItem>
            <SelectItem value="Plants">Plants</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
      </div>
      <div className="grid gap-2">
        <Label>Product Image</Label>
        <div className="border-2 border-dashed border-zinc-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer">
          <UploadCloud className="w-8 h-8 text-zinc-400 mb-2" />
          <p className="text-sm font-medium text-zinc-700">Click to upload or drag and drop</p>
          <p className="text-xs text-zinc-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
          <Input type="file" className="hidden" id="image-upload" onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})} />
          <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => document.getElementById('image-upload')?.click()}>
            Select File
          </Button>
          {formData.image && <p className="text-xs text-green-600 mt-2">Selected: {formData.image.name}</p>}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Inventory Management</h2>
          <p className="text-zinc-500">Manage your product catalog and inventory levels.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Fill in the details below to add a new product to your catalog.</DialogDescription>
              </DialogHeader>
              {renderFormFields()}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button type="submit">Save Product</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Products</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search products..."
                className="pl-9 bg-zinc-50 border-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-zinc-50">
                <TableRow>
                  <TableHead className="font-semibold text-zinc-900">Name</TableHead>
                  <TableHead className="font-semibold text-zinc-900">Category</TableHead>
                  <TableHead className="font-semibold text-zinc-900">Price (KES)</TableHead>
                  <TableHead className="font-semibold text-zinc-900">Stock</TableHead>
                  <TableHead className="font-semibold text-zinc-900">Status</TableHead>
                  <TableHead className="text-right font-semibold text-zinc-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price.toLocaleString()}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Active' ? 'bg-green-100 text-green-700' :
                        product.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(product)}>
                        <Pencil className="w-4 h-4 text-zinc-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update the details for {currentProduct?.name}.</DialogDescription>
            </DialogHeader>
            {renderFormFields()}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
              <Button type="submit">Update Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
