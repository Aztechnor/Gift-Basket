const fs = require('fs');

let content = fs.readFileSync('components/my-gifting-life.tsx', 'utf8');

// Add imports
if (!content.includes('import { Dialog')) {
  content = content.replace(
    'import { Badge } from "@/components/ui/badge"',
    'import { Badge } from "@/components/ui/badge"\nimport { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"\nimport { Input } from "@/components/ui/input"\nimport { Label } from "@/components/ui/label"\nimport { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"\nimport { useState } from "react"'
  );
}

// Replace the Add button
const addButtonRe = /<Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900"><Plus className="w-4 h-4" \/><\/Button>/g;

const dialogCode = `<Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900"><Plus className="w-4 h-4" /></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Person & Reminder</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="e.g. Jane" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Select>
                      <SelectTrigger id="relationship">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="colleague">Colleague</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="occasion">Occasion to Remember</Label>
                    <Select>
                      <SelectTrigger id="occasion">
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Reminder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>`;

content = content.replace(addButtonRe, dialogCode);

// Fix Reorder links
content = content.replace(/<Button variant="outline" size="sm" className="h-7 text-xs px-2 w-full rounded-full font-medium">Reorder<\/Button>/g, '<Button asChild variant="outline" size="sm" className="h-7 text-xs px-2 w-full rounded-full font-medium"><Link href="/cart">Reorder</Link></Button>');

// Fix Similar links
content = content.replace(/<Button variant="ghost" size="sm" className="h-7 text-xs px-2 w-full bg-zinc-50 rounded-full font-medium">Similar<\/Button>/g, '<Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2 w-full bg-zinc-50 rounded-full font-medium"><Link href="/ai-recommendations">Similar</Link></Button>');

// Fix "See all" and "View all" links
content = content.replace(/<Button variant="ghost" size="sm" className="h-8 px-3 text-xs font-medium text-zinc-600 rounded-full hover:bg-zinc-100">See all<\/Button>/g, '<Button asChild variant="ghost" size="sm" className="h-8 px-3 text-xs font-medium text-zinc-600 rounded-full hover:bg-zinc-100"><Link href="/products">See all</Link></Button>');
content = content.replace(/<Button variant="ghost" className="text-sm h-8 px-3 font-medium text-zinc-600 rounded-full hover:bg-zinc-100">View all<\/Button>/g, '<Button asChild variant="ghost" className="text-sm h-8 px-3 font-medium text-zinc-600 rounded-full hover:bg-zinc-100"><Link href="/products">View all</Link></Button>');


fs.writeFileSync('components/my-gifting-life.tsx', content);
