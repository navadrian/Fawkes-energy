import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'

async function getPosts() {
    const query = `*[_type == "post"] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "authorName": author->name
  }`
    try {
        const posts = await client.fetch(query)
        return posts
    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
}

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>

            {posts.length === 0 ? (
                <p className="text-center text-muted-foreground">
                    No posts yet. Create your first post in the Sanity Studio at /studio!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: any) => (
                        <Link href={`/blog/${post.slug.current}`} key={post._id} className="group">
                            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card">
                                {post.mainImage && (
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={urlForImage(post.mainImage).url()}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                                        <span>{post.authorName}</span>
                                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
