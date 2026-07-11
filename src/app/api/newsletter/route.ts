import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// POST subscribe to newsletter
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = newsletterSchema.parse(body)

    // Check if email already exists
    const existing = await prisma.subscriber.findUnique({
      where: { email: validatedData.email }
    })

    if (existing) {
      if (existing.status === 'UNSUBSCRIBED') {
        // Re-subscribe
        await prisma.subscriber.update({
          where: { email: validatedData.email },
          data: {
            status: 'ACTIVE',
            subscribedAt: new Date(),
            unsubscribedAt: null
          }
        })

        return NextResponse.json({
          success: true,
          message: 'Welcome back! You have been re-subscribed to the newsletter.'
        })
      }

      if (existing.status === 'ACTIVE') {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to the newsletter.'
        })
      }

      if (existing.status === 'BOUNCED') {
        return NextResponse.json({
          success: false,
          error: 'This email has previously bounced. Please use a different email address.'
        }, { status: 400 })
      }
    }

    // Create new subscriber
    const subscriber = await prisma.subscriber.create({
      data: {
        email: validatedData.email,
        status: 'ACTIVE',
        subscribedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        id: subscriber.id,
        email: subscriber.email
      },
      message: 'Successfully subscribed to the newsletter!'
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

// GET subscriber count (public endpoint for transparency)
export async function GET() {
  try {
    const activeCount = await prisma.subscriber.count({
      where: { status: 'ACTIVE' }
    })

    return NextResponse.json({
      success: true,
      data: {
        activeSubscribers: activeCount
      }
    })
  } catch (error) {
    console.error('Error fetching subscriber count:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscriber count' },
      { status: 500 }
    )
  }
}