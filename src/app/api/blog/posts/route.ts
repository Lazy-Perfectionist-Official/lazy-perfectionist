import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema
const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional(),
  categoryId: z.string().optional(),
  authorId: z.string(),
})

// GET all blog posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const categoryId = searchParams.get('categoryId')

    const where: any = {}

    if (status) {
      where.status = status
    } else {
      where.status = 'PUBLISHED' // Only show published posts by default
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        category: true,
        tags: {
          include: {
            tag: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: posts,
      total: posts.length
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST create new blog post
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = blogPostSchema.parse(body)

    const post = await prisma.blogPost.create({
      data: {
        ...validatedData,
        publishedAt: validatedData.status === 'PUBLISHED' ? new Date() : null,
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true
          }
        },
        author: true
      }
    })

    return NextResponse.json({
      success: true,
      data: post,
      message: 'Blog post created successfully'
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}