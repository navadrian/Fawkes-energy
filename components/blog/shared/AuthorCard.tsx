import React from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

interface Author {
    name: string
    image?: any
    bio?: string
}

interface AuthorCardProps {
    author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
    return (
        <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
            {author.image && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                    <Image
                        src={urlForImage(author.image).url()}
                        alt={author.name}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Written by</p>
                <h3 className="font-semibold text-lg mb-2">{author.name}</h3>
                {author.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {author.bio}
                    </p>
                )}
            </div>
        </div>
    )
}
