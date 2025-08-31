"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plus, Search, Edit, Trash2, ChevronDown, ChevronRight, HelpCircle } from "lucide-react"
import { FAQDialog } from "@/components/faq-dialog"
import { DeleteFAQDialog } from "@/components/delete-faq-dialog"

const mockFAQs = [
  {
    id: "1",
    question: "How do I add a new product to my inventory?",
    answer:
      "To add a new product, navigate to the Products section and click the 'Add Product' button. Fill in all required fields including name, description, price, and category.",
    category: "Products",
    isPublished: true,
    views: 245,
  },
  {
    id: "2",
    question: "How can I track my orders?",
    answer:
      "You can track all orders in the Orders section. Each order has a status indicator showing whether it's pending, processing, shipped, or delivered.",
    category: "Orders",
    isPublished: true,
    views: 189,
  },
  {
    id: "3",
    question: "What payment methods are supported?",
    answer:
      "We support all major credit cards, PayPal, and bank transfers. You can configure payment methods in the Settings section.",
    category: "Payments",
    isPublished: true,
    views: 156,
  },
  {
    id: "4",
    question: "How do I manage user permissions?",
    answer:
      "User permissions can be managed in the Users section. You can assign different roles such as Admin, Manager, or Viewer to control access levels.",
    category: "Users",
    isPublished: false,
    views: 0,
  },
  {
    id: "5",
    question: "Can I export my data?",
    answer:
      "Yes, you can export data from various sections including products, orders, and user information. Look for the export button in each section.",
    category: "Data",
    isPublished: true,
    views: 98,
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [faqs, setFaqs] = useState(mockFAQs)
  const [openItems, setOpenItems] = useState<string[]>([])
  const [faqDialogOpen, setFaqDialogOpen] = useState(false)
  const [deleteFaqDialogOpen, setDeleteFaqDialogOpen] = useState(false)
  const [selectedFaq, setSelectedFaq] = useState<(typeof mockFAQs)[0] | null>(null)

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const categories = [...new Set(faqs.map((faq) => faq.category))]

  const handleAddFaq = () => {
    setSelectedFaq(null)
    setFaqDialogOpen(true)
  }

  const handleEditFaq = (faq: (typeof mockFAQs)[0]) => {
    setSelectedFaq(faq)
    setFaqDialogOpen(true)
  }

  const handleDeleteFaq = (faq: (typeof mockFAQs)[0]) => {
    setSelectedFaq(faq)
    setDeleteFaqDialogOpen(true)
  }

  const handleSaveFaq = (faqData: any) => {
    if (selectedFaq) {
      // Edit existing FAQ
      setFaqs(faqs.map((f) => (f.id === selectedFaq.id ? { ...f, ...faqData } : f)))
    } else {
      // Add new FAQ
      const newFaq = {
        id: Date.now().toString(),
        ...faqData,
        views: 0,
      }
      setFaqs([...faqs, newFaq])
    }
    setFaqDialogOpen(false)
    setSelectedFaq(null)
  }

  const handleConfirmDelete = () => {
    if (selectedFaq) {
      setFaqs(faqs.filter((f) => f.id !== selectedFaq.id))
    }
    setDeleteFaqDialogOpen(false)
    setSelectedFaq(null)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">FAQ Management</h1>
          <Button onClick={handleAddFaq}>
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{faqs.filter((f) => f.isPublished).length}</div>
                <div className="text-sm text-muted-foreground">Published FAQs</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{faqs.reduce((sum, faq) => sum + faq.views, 0)}</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Browse FAQs by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {category} ({faqs.filter((faq) => faq.category === category).length})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id}>
              <Collapsible open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {openItems.includes(faq.id) ? (
                          <ChevronDown className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <CardTitle className="text-left">{faq.question}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{faq.category}</Badge>
                            <Badge variant={faq.isPublished ? "default" : "secondary"}>
                              {faq.isPublished ? "Published" : "Draft"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{faq.views} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditFaq(faq)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteFaq(faq)
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="pl-8">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No FAQs found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <FAQDialog open={faqDialogOpen} onOpenChange={setFaqDialogOpen} faq={selectedFaq} onSave={handleSaveFaq} />

      <DeleteFAQDialog
        open={deleteFaqDialogOpen}
        onOpenChange={setDeleteFaqDialogOpen}
        faq={selectedFaq}
        onConfirm={handleConfirmDelete}
      />
    </DashboardLayout>
  )
}
