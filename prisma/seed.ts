import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('change-me-immediately', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lazyperfectionist.com' },
    update: {},
    create: {
      email: 'admin@lazyperfectionist.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log('✓ Admin user created')

  // Create blog categories
  const musicCategory = await prisma.category.upsert({
    where: { slug: 'music-production' },
    update: {},
    create: {
      name: 'Music Production',
      slug: 'music-production',
    },
  })

  const studioCategory = await prisma.category.upsert({
    where: { slug: 'studio-updates' },
    update: {},
    create: {
      name: 'Studio Updates',
      slug: 'studio-updates',
    },
  })

  const gearCategory = await prisma.category.upsert({
    where: { slug: 'gear-reviews' },
    update: {},
    create: {
      name: 'Gear Reviews',
      slug: 'gear-reviews',
    },
  })
  console.log('✓ Blog categories created')

  // Create blog tags
  await prisma.tag.upsert({
    where: { slug: 'guitar' },
    update: {},
    create: {
      name: 'Guitar',
      slug: 'guitar',
    },
  })

  await prisma.tag.upsert({
    where: { slug: 'production' },
    update: {},
    create: {
      name: 'Production',
      slug: 'production',
    },
  })

  await prisma.tag.upsert({
    where: { slug: 'recording' },
    update: {},
    create: {
      name: 'Recording',
      slug: 'recording',
    },
  })

  await prisma.tag.upsert({
    where: { slug: 'mixing' },
    update: {},
    create: {
      name: 'Mixing',
      slug: 'mixing',
    },
  })
  console.log('✓ Blog tags created')

  // Create product categories
  const digitalCategory = await prisma.productCategory.upsert({
    where: { name: 'Digital Music' },
    update: {},
    create: {
      name: 'Digital Music',
      description: 'Digital downloads and audio files',
    },
  })

  const merchCategory = await prisma.productCategory.upsert({
    where: { name: 'Merchandise' },
    update: {},
    create: {
      name: 'Merchandise',
      description: 'Physical merchandise and apparel',
    },
  })
  console.log('✓ Product categories created')

  // Create sample products
  const orbitDownload = await prisma.product.findFirst({
    where: { name: 'Orbit - Digital Download' }
  })

  if (!orbitDownload) {
    await prisma.product.create({
      data: {
        name: 'Orbit - Digital Download',
        description: 'High-quality digital download of the debut single "Orbit" including WAV, FLAC, and MP3 formats.',
        price: 1.99,
        type: 'DIGITAL',
        stock: 999,
        categoryId: digitalCategory.id,
      },
    })
  }

  const tshirt = await prisma.product.findFirst({
    where: { name: 'Lazy Perfectionist T-Shirt' }
  })

  if (!tshirt) {
    await prisma.product.create({
      data: {
        name: 'Lazy Perfectionist T-Shirt',
        description: 'Premium cotton t-shirt with the Lazy Perfectionist logo. Available in black and white.',
        price: 24.99,
        type: 'PHYSICAL',
        stock: 50,
        categoryId: merchCategory.id,
      },
    })
  }

  const bundle = await prisma.product.findFirst({
    where: { name: 'Orbit Instrumental Bundle' }
  })

  if (!bundle) {
    await prisma.product.create({
      data: {
        name: 'Orbit Instrumental Bundle',
        description: 'Complete package of instrumental tracks from Orbit, including stems and isolated instruments.',
        price: 9.99,
        type: 'DIGITAL',
        stock: 999,
        categoryId: digitalCategory.id,
      },
    })
  }
  console.log('✓ Sample products created')

  // Create sample blog post
  const guitarTag = await prisma.tag.findUnique({ where: { slug: 'guitar' } })
  const productionTag = await prisma.tag.findUnique({ where: { slug: 'production' } })

  if (guitarTag && productionTag) {
    const blogPost = await prisma.blogPost.upsert({
      where: { slug: 'creating-orbit-journey-bedroom-producer' },
      update: {},
      create: {
        title: 'Creating "Orbit": The Journey of a Bedroom Producer',
        slug: 'creating-orbit-journey-bedroom-producer',
        content: 'Orbit represents my first complete instrumental composition...',
        excerpt: 'Discover how I created my debut single "Orbit" entirely in my bedroom studio, from initial melody to final master.',
        publishedAt: new Date('2024-01-15'),
        status: 'PUBLISHED',
        featured: true,
        categoryId: musicCategory.id,
        authorId: admin.id,
      },
    })
    console.log('✓ Sample blog post created')
  }

  // Create music genres
  await prisma.genre.upsert({
    where: { name: 'Progressive Rock' },
    update: {},
    create: {
      name: 'Progressive Rock',
      description: 'Complex and dynamic rock music with experimental elements',
    },
  })

  await prisma.genre.upsert({
    where: { name: 'Progressive Metal' },
    update: {},
    create: {
      name: 'Progressive Metal',
      description: 'Heavy and technical metal with progressive song structures',
    },
  })

  await prisma.genre.upsert({
    where: { name: 'Instrumental Rock' },
    update: {},
    create: {
      name: 'Instrumental Rock',
      description: 'Rock music without vocals, focusing on instrumental composition',
    },
  })
  console.log('✓ Music genres created')

  console.log('Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })