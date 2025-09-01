"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Edit, Trash2, Eye, Calendar } from "lucide-react"
import { BlogDialog } from "@/components/blog-dialog"
import { DeleteBlogDialog } from "@/components/delete-blog-dialog"
import { BlogViewDialog } from "@/components/blog-view-dialog"
export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [blogs, setBlogs] = useState<any[]>([])
  const [blogDialogOpen, setBlogDialogOpen] = useState(false)
  const [deleteBlogDialogOpen, setDeleteBlogDialogOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null)
const [viewDialogOpen, setViewDialogOpen] = useState(false)
const [viewBlog, setViewBlog] = useState<any | null>(null)
  const fetchBlogs = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/BlogDashboard")
    const data = await res.json()
    console.log(data)
    setBlogs(data)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500"
      case "draft":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleAddBlog = () => {
    setSelectedBlog(null)
    setBlogDialogOpen(true)
  }

  const handleEditBlog = (blog: any) => {
    setSelectedBlog(blog)
    setBlogDialogOpen(true)
  }

  const handleDeleteBlog = (blog: any) => {
    setSelectedBlog(blog)
    setDeleteBlogDialogOpen(true)
  }

  const handleSaveBlog = async (blogData: any) => {
    if (selectedBlog) {
      // Update
      await fetch(`http://127.0.0.1:8000/api/BlogDashboard/${selectedBlog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      })
    } else {
      // Create
      await fetch("http://127.0.0.1:8000/api/BlogDashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      })
    }
    setBlogDialogOpen(false)
    fetchBlogs()
  }

  const handleConfirmDelete = async () => {
    if (selectedBlog) {
      await fetch(`http://127.0.0.1:8000/api/BlogDashboard/${selectedBlog.id}`, { method: "DELETE" })
    }
    setDeleteBlogDialogOpen(false)
    fetchBlogs()
  }

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const handleViewBlog = (blog: any) => {
  setViewBlog(blog)
  setViewDialogOpen(true)
}


  return (
    <DashboardLayout>
<div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <Button onClick={handleAddBlog}>
            <Plus className="h-4 w-4 mr-2" />
            New Blog Post
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search blogs by title or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary">{blog.category}</Badge>
                  <Badge variant="outline" className={`${getStatusColor(blog.status)} text-white border-0`}>
                    {blog.status}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={blog.authorAvatar || "/placeholder.svg"} alt={blog.author} />
                      <AvatarFallback>
                        {blog.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{blog.author}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(blog.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {blog.views} views
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent"onClick={() => handleViewBlog(blog)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleEditBlog(blog)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 bg-transparent"
                      onClick={() => handleDeleteBlog(blog)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
      <BlogViewDialog open={viewDialogOpen} onOpenChange={setViewDialogOpen} blog={viewBlog} />
      <BlogDialog open={blogDialogOpen} onOpenChange={setBlogDialogOpen} blog={selectedBlog} onSave={handleSaveBlog} />
      <DeleteBlogDialog
        open={deleteBlogDialogOpen}
        onOpenChange={setDeleteBlogDialogOpen}
        blog={selectedBlog}
        onConfirm={handleConfirmDelete}
      />
    </DashboardLayout>
  )
}
