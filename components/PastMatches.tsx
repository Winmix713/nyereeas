'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, Search, Trash, Edit, Download } from 'lucide-react'
import { TEAMS } from '@/lib/constants'

interface Match {
  id: string
  date: string
  homeTeam: string
  awayTeam: string
  score: string
  prediction: string
  accuracy: number
}

export default function PastMatches() {
  const [selectedMatches, setSelectedMatches] = useState<string[]>([])
  const [sortField, setSortField] = useState<keyof Match>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch matches
    const fetchMatches = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockMatches: Match[] = Array.from({ length: 10 }, (_, i) => {
        const homeTeam = TEAMS[Math.floor(Math.random() * TEAMS.length)]
        const awayTeam = TEAMS[Math.floor(Math.random() * TEAMS.length)]
        return {
          id: `match-${i + 1}`,
          date: new Date(2024, 0, i + 1).toLocaleDateString('hu-HU'),
          homeTeam: homeTeam.name,
          awayTeam: awayTeam.name,
          score: `${Math.floor(Math.random() * 5)}-${Math.floor(Math.random() * 5)}`,
          prediction: `${Math.floor(Math.random() * 5)}-${Math.floor(Math.random() * 5)}`,
          accuracy: Math.round(Math.random() * 100)
        }
      })
      setMatches(mockMatches)
      setLoading(false)
    }
    fetchMatches()
  }, [])

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedMatches(matches.map(match => match.id))
    } else {
      setSelectedMatches([])
    }
  }

  const handleSelectMatch = (matchId: string) => {
    setSelectedMatches(prev => 
      prev.includes(matchId)
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    )
  }

  const handleSort = (field: keyof Match) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedMatches = matches
    .filter(match => 
      match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      const modifier = sortDirection === 'asc' ? 1 : -1
      return aValue < bValue ? -1 * modifier : aValue > bValue ? 1 * modifier : 0
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#CCFF00]">Múltbeli Mérkőzések</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Keresés..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-[#CCFF00] focus:outline-none"
            />
          </div>
          {selectedMatches.length > 0 && (
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-[#CCFF00] transition-colors">
                <Edit className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Trash className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-[#CCFF00] transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="glass-effect rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedMatches.length === matches.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-600 text-[#CCFF00] focus:ring-[#CCFF00]"
                  />
                </th>
                {['Dátum', 'Hazai', 'Vendég', 'Eredmény', 'Predikció', 'Pontosság'].map((header, index) => (
                  <th
                    key={header}
                    className="p-4 text-left font-medium text-gray-300 cursor-pointer hover:text-[#CCFF00]"
                    onClick={() => handleSort(Object.keys(matches[0])[index + 1] as keyof Match)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{header}</span>
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 ${
                          sortField === Object.keys(matches[0])[index + 1] && sortDirection === 'asc'
                            ? 'text-[#CCFF00]'
                            : 'text-gray-600'
                        }`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${
                          sortField === Object.keys(matches[0])[index + 1] && sortDirection === 'desc'
                            ? 'text-[#CCFF00]'
                            : 'text-gray-600'
                        }`} />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#CCFF00] border-t-transparent" />
                      <span>Betöltés...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredAndSortedMatches.map(match => (
                <motion.tr
                  key={match.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-700 hover:bg-gray-800/50"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedMatches.includes(match.id)}
                      onChange={() => handleSelectMatch(match.id)}
                      className="rounded border-gray-600 text-[#CCFF00] focus:ring-[#CCFF00]"
                    />
                  </td>
                  <td className="p-4">{match.date}</td>
                  <td className="p-4">{match.homeTeam}</td>
                  <td className="p-4">{match.awayTeam}</td>
                  <td className="p-4">{match.score}</td>
                  <td className="p-4">{match.prediction}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div
                          className="bg-[#CCFF00] h-2 rounded-full"
                          style={{ width: `${match.accuracy}%` }}
                        />
                      </div>
                      <span>{match.accuracy}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

