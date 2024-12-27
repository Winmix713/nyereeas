'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Book, FileText, HelpCircle, MessageCircle, ExternalLink } from 'lucide-react'

interface DocSection {
  id: string
  title: string
  description: string
  icon: React.ElementType
}

export default function HelpDocs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sections] = useState<DocSection[]>([
    {
      id: '1',
      title: 'Kezdeti lépések',
      description: 'Ismerkedés a rendszerrel és alapvető funkciók',
      icon: Book
    },
    {
      id: '2',
      title: 'Felhasználói kézikönyv',
      description: 'Részletes útmutató a rendszer használatához',
      icon: FileText
    },
    {
      id: '3',
      title: 'GYIK',
      description: 'Gyakran ismételt kérdések és válaszok',
      icon: HelpCircle
    },
    {
      id: '4',
      title: 'Támogatás',
      description: 'Kapcsolatfelvétel és segítségkérés',
      icon: MessageCircle
    }
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#CCFF00]">Súgó és Dokumentáció</h1>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Keresés a dokumentációban..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-[#CCFF00] focus:outline-none"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map(section => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl hover:border-[#CCFF00]/30 transition-colors cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-gray-800 p-3 rounded-lg group-hover:bg-[#CCFF00]/10">
                <section.icon className="w-6 h-6 text-[#CCFF00]" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-lg flex items-center">
                  {section.title}
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-400 text-sm">{section.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

