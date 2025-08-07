'use client'
import { Blog } from '@/types/project'
import BlogCard from './BlogCard'
import { useEffect, useState } from 'react'

export async function getBlogs() {
    try {
        const baseUrl = typeof window !== 'undefined'
            ? window.location.origin
            : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/blogs`, {
            next: { revalidate: 0 }
        });
        const data = await response.json();

        if (data.success) {
            return data.message;
        }
        return [];
    } catch (error) {
        console.error(`Error while fetching the blogs: ${error}`);
        return [];
    }
}

function BlogList() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogData = await getBlogs();
                setBlogs(blogData);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className='w-full px-64 max-[1025px]:px-0 max-[1285px]:px-0 max-sm:px-2 flex flex-col gap-6 items-center mt-4 pb-8'>
                <div className="animate-pulse space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 w-full"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='w-full px-64 max-[1025px]:px-0 max-[1285px]:px-0 max-sm:px-2 flex flex-col gap-6 items-center mt-4 pb-8 max-sm:overflow-hidden'>
            {blogs.map((blog: Blog, idx: number) => (
                <BlogCard
                    key={idx}
                    title={blog.title}
                    createdAt={blog.createdAt}
                    content={blog.content}
                    id={blog.id}
                />
            ))}
        </div>
    )
}

export default BlogList