'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { bricolage_grotesque } from '@/utils/fonts'
import { Link } from '@radix-ui/themes'
import BlogEditor from '../../add/components/BlogEditor'
import { Blog } from '@/types/project'

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const blogSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    file: z
        .custom<File>((file) => !file || file instanceof File)
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
            message: 'File must be less than 5MB',
        })
        .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), {
            message: 'Only JPEG, PNG, and GIF files are allowed',
        })
        .optional(),
});

const EditBlogPage = () => {
    const [blog, setBlog] = useState<Blog | null>(null)
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const router = useRouter()
    const params = useParams()
    const { status } = useSession()
    const blogid = params.blogid as string

    useEffect(() => {
        if (blogid) {
            fetchBlog()
        }
    }, [blogid])

    const fetchBlog = async () => {
        try {
            const response = await fetch(`/api/blogs/${blogid}`)
            const data = await response.json()
            
            if (data.success && data.message) {
                setBlog(data.message)
                setTitle(data.message.title)
                setContent(data.message.content)
            } else {
                toast.error('Blog not found')
                router.push('/admin')
            }
        } catch (error) {
            toast.error('Failed to fetch blog')
            router.push('/admin')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = blogSchema.safeParse({ title, content, file })

        if (!result.success) {
            return result.error.errors.forEach((err) => toast.error(err.message))
        }

        setIsUpdating(true)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        if (file) {
            formData.append('file', file)
        }

        try {
            const response = await axios.put(`/api/blogs/${blogid}/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.data.success) {
                toast.success('Blog updated successfully!')
                router.push('/admin')
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Error while updating blog'
            toast.error(errorMessage)
        } finally {
            setIsUpdating(false)
        }
    }

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }

    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className='text-lg font-bold'>You are Unauthorized, Please&nbsp;
                        <Link href="/login" className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Blog not found</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black py-8 mt-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className={`text-3xl font-bold text-gray-900 dark:text-white ${bricolage_grotesque}`}>
                        Edit Blog
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Update your blog post
                    </p>
                </div>

                <div className="overflow-hidden h-fit relative">
                    <div className="flex justify-between items-center mb-6">
                        <Link href="/admin">
                            <Button variant="outline">← Back to Admin</Button>
                        </Link>
                        <Button onClick={handleSubmit} disabled={isUpdating}>
                            {isUpdating ? 'Updating...' : 'Update Blog'}
                        </Button>
                    </div>

                    <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className={`py-5 pr-3 border-none outline-none dark:bg-black text-4xl max-sm:text-xl font-semibold ${bricolage_grotesque}`}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Update Featured Image (optional)
                            </label>
                            <Input
                                type="file"
                                placeholder="image"
                                className="w-full shadow-sm dark:bg-black py-2"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                accept="image/*"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Leave empty to keep current image
                            </p>
                        </div>
                    </form>

                    <div className="mt-8">
                        <BlogEditor setContent={setContent} initialContent={content} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBlogPage
