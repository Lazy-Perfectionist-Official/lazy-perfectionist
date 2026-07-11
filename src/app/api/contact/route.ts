import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// POST submit contact message
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    const message = await prisma.contactMessage.create({
      data: validatedData
    })

    return NextResponse.json({
      success: true,
      data: {
        id: message.id,
        name: message.name,
        email: message.email
      },
      message: 'Thank you for your message! We will get back to you soon.'
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error submitting contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact message' },
      { status: 500 }
    )
  }
}

// GET contact messages (admin only - should be protected with auth)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const responded = searchParams.get('responded')

    const where: any = {}

    if (responded === 'true') {
      where.responded = true
    } else if (responded === 'false') {
      where.responded = false
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    return NextResponse.json({
      success: true,
      data: messages,
      total: messages.length
    })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact messages' },
      { status: 500 }
    )
  }
}