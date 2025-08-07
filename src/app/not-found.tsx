import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Button asChild>
                    <Link href="/">Go back home</Link>
                </Button>
            </div>
        </main>
    )
}