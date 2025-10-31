'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Calendar,
  Music,
  MapPin,
  Sparkles,
  Headphones,
  Guitar,
  MicVocal,
  Settings,
  PlayCircle,
  PauseCircle
} from 'lucide-react'

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  icon: React.ReactNode
  type: 'milestone' | 'release' | 'achievement'
  details?: string[]
  highlight?: boolean
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: '2024',
    title: 'The Beginning',
    description: 'Started the Lazy Perfectionist project in a Hong Kong bedroom',
    icon: <Guitar className="w-5 h-5" />,
    type: 'milestone',
    details: [
      'First experiments with progressive rock',
      'DIY recording setup with basic equipment',
      'Finding the sound between technical precision and raw emotion'
    ],
    highlight: true
  },
  {
    id: '2',
    date: 'Early 2025',
    title: 'Creative Process',
    description: 'Developed the unique "Lazy Perfectionist" philosophy',
    icon: <Settings className="w-5 h-5" />,
    type: 'milestone',
    details: [
      'Embracing flaws as the heartbeat of art',
      'Balancing bedroom authenticity with professional production',
      'Creating instrumental stories without words'
    ]
  },
  {
    id: '3',
    date: 'October 17, 2025',
    title: 'Debut Single "Orbit"',
    description: 'Released the first official single across all platforms',
    icon: <Music className="w-5 h-5" />,
    type: 'release',
    details: [
      '4:32 of instrumental progressive rock',
      'Available on Spotify, Apple Music, YouTube Music',
      'Official music video with visual storytelling'
    ],
    highlight: true
  },
  {
    id: '4',
    date: 'Late 2025',
    title: 'Growing Sound',
    description: 'Building a community around bedroom instrumental rock',
    icon: <Headphones className="w-5 h-5" />,
    type: 'achievement',
    details: [
      'Connecting with fellow independent artists',
      'Sharing production insights and techniques',
      'Planning the next chapter of musical exploration'
    ]
  }
]

interface TimelineItemProps {
  event: TimelineEvent
  index: number
  isInView: boolean
}

function TimelineItem({ event, index, isInView }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-center mb-12 ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-500/40 to-transparent -z-10" />

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
        className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-indigo-500/30 z-10 ${
          event.highlight ? 'bg-indigo-500' : 'bg-indigo-400/70'
        }`}
      />

      {/* Content card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
        className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
      >
        <motion.div
          className={`relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 border-2 border-black cursor-pointer transition-all duration-300 hover:border-indigo-500 ${
            event.highlight ? 'ring-2 ring-indigo-500/20 shadow-xl shadow-indigo-500/10' : ''
          }`}
          whileHover={{ scale: 1.02, y: -2 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Date badge */}
          <motion.div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 border-2 border-black ${
              event.highlight
                ? 'bg-indigo-500 text-white'
                : 'bg-white/90 text-black'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <Calendar className="w-3 h-3" />
            {event.date}
          </motion.div>

          {/* Title with icon */}
          <div className={`flex items-center gap-3 mb-3 ${
            index % 2 === 0 ? 'justify-end' : 'justify-start'
          }`}>
            <h3 className="text-xl font-bold text-black font-dm-serif">
              {event.title}
            </h3>
            <div className={`p-2 rounded-lg border-2 border-black ${
              event.highlight ? 'bg-indigo-500 text-white' : 'bg-white/90 text-black'
            }`}>
              {event.icon}
            </div>
          </div>

          {/* Description */}
          <p className="text-black/80 mb-4 leading-relaxed">
            {event.description}
          </p>

          {/* Expandable details */}
          {event.details && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-4 border-t border-black/20">
                {event.details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: index % 2 === 0 ? 20 : -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-black/70"
                  >
                    <div className="w-1 h-1 bg-orange-400 rounded-full" />
                    {detail}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Expand button */}
          {event.details && (
            <motion.div
              className="flex items-center gap-2 text-indigo-600 text-sm font-medium mt-4"
              whileHover={{ scale: 1.05 }}
            >
              {isExpanded ? (
                <>
                  <PauseCircle className="w-4 h-4" />
                  Show less
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4" />
                  Learn more
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function ArtistTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-6 sm:px-8 lg:px-12 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-transparent to-amber-600/5 rounded-3xl" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-indigo-500 text-white rounded-full px-4 py-2 mb-6 border-2 border-black"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white font-medium">Musical Journey</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-dm-serif">
            The Story So
            <span className="block bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Far</span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            From a Hong Kong bedroom to the world — follow the journey of Lazy Perfectionist
            as we create instrumental rock that speaks without words.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500 text-white rounded-full px-6 py-3 border-2 border-black">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-medium">
              The journey continues...
            </span>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}