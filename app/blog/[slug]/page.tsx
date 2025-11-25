import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getPost(slug: string) {
    const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    mainImage,
    body,
    publishedAt,
    "author": author->{name, image}
  }`
    return client.fetch(query, { slug })
}

export async function generateStaticParams() {
    try {
        // Fetch all posts with valid slugs
        const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
        const posts = await client.fetch(query)

        // If no posts exist, return at least one dummy path to satisfy static export
        if (!posts || posts.length === 0) {
            return [{ slug: 'coming-soon' }]
        }

        return posts.map((post: any) => ({
            slug: post.slug,
        }))
    } catch (error) {
        console.error('Error in generateStaticParams:', error)
        // Return dummy path on error to allow build to proceed
        return [{ slug: 'coming-soon' }]
    }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)

    if (!post) {
        return notFound()
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center justify-center gap-4 text-muted-foreground">
                    {post.author && (
                        <div className="flex items-center gap-2">
                            {post.author.image && (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                    <Image
                                        src={urlForImage(post.author.image).url()}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <span>{post.author.name}</span>
                        </div>
                    )}
                    <span>•</span>
                    <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
                </div>
            </div>

            {post.mainImage && (
                <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
                    <Image
                        src={urlForImage(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="prose prose-lg dark:prose-invert mx-auto">
                <PortableText value={post.body} />
            </div>
        </article>
    )
}
