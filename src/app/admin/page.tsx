'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit, Plus, Eye } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Blog } from '@/types/project'
import { bricolage_grotesque } from '@/utils/fonts'
import SecurityInfo from '@/components/SecurityInfo'

const AdminDashboard = () => {
    const { data: session, status } = useSession()
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState<string | null>(null)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogs')
            const data = await response.json()
            if (data.success) {
                setBlogs(data.message)
            }
        } catch {
            toast.error('Failed to fetch blogs')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (blogId: string) => {
        if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
            return
        }

        setDeleting(blogId)
        try {
            const response = await fetch(`/api/blogs/${blogId}/delete`, {
                method: 'DELETE',
            })
            const data = await response.json()

            if (data.success) {
                toast.success('Blog deleted successfully')
                setBlogs(blogs.filter(blog => blog.id !== blogId))
            } else {
                toast.error(data.message || 'Failed to delete blog')
            }
        } catch (error) {
            toast.error('Failed to delete blog')
        } finally {
            setDeleting(null)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const truncateContent = (content: string, maxLength: number = 100) => {
        const textContent = content.replace(/<[^>]*>/g, '') // Remove HTML tags
        return textContent.length > maxLength
            ? textContent.substring(0, maxLength) + '...'
            : textContent
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }

    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="w-96">
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">You need to be logged in to access the admin dashboard.</p>
                        <Link href="/login">
                            <Button className="w-full">Login</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className={`text-3xl font-bold text-gray-900 dark:text-white ${bricolage_grotesque}`}>
                        Admin Dashboard
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Welcome back, {session?.user?.name}! Manage your blog posts here.
                    </p>
                </div>

                <SecurityInfo />

                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="text-sm">
                            Total Blogs: {blogs.length}
                        </Badge>
                    </div>
                    <Link href="/blogs/add">
                        <Button className="flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Create New Blog</span>
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="text-lg">Loading blogs...</div>
                    </div>
                ) : blogs.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400 mb-4">No blogs found.</p>
                            <Link href="/blogs/add">
                                <Button>Create Your First Blog</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {blogs.map((blog) => (
                            <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                {truncateContent(blog.content)}
                                            </p>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span>Created: {formatDate(blog.createdAt)}</span>
                                                <Badge variant="outline">Published</Badge>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 ml-4">
                                            <Link href={`/blogs/${blog.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/blogs/edit/${blog.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(blog.id)}
                                                disabled={deleting === blog.id}
                                            >
                                                {deleting === blog.id ? (
                                                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard
