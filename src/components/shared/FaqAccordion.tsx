import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
  className?: string
}

export function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="border border-border rounded-sm overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-background-muted transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-sm">{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-sm text-text-muted leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
