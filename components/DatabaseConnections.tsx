'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Database, Server, User, Key, FileText, Hash, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { testConnection } from '@/lib/db'

interface DatabaseSetting {
  label: string
  value: string
  icon: React.ElementType
  isPassword?: boolean
  isSecret?: boolean
}

export default function DatabaseConnections() {
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null)
  const [showSecrets, setShowSecrets] = useState(false)

  const databaseSettings: DatabaseSetting[] = [
    {
      label: 'Adatbázis neve',
      value: 'c694347cdsoxru',
      icon: Database
    },
    {
      label: 'Felhasználónév',
      value: 'c694347cdsoxru',
      icon: User
    },
    {
      label: 'Jelszó',
      value: 'VvJLxHhKG7Fk',
      icon: Key,
      isPassword: true,
      isSecret: true
    },
    {
      label: 'Kiszolgáló neve',
      value: 'mysql.rackhost.hu',
      icon: Server
    },
    {
      label: 'Karakter kódolás',
      value: 'utf8',
      icon: FileText
    },
    {
      label: 'Egybevetés',
      value: '',
      icon: Hash
    }
  ]

  useEffect(() => {
    async function checkConnection() {
      const status = await testConnection()
      setConnectionStatus(status)
    }
    checkConnection()
  }, [])

  const SettingItem = ({ setting }: { setting: DatabaseSetting }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <motion.div 
        className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="bg-[#CCFF00] rounded-full p-2">
          <setting.icon className="w-6 h-6 text-black" />
        </div>
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-gray-300">{setting.label}</h3>
          <p className="text-lg font-semibold text-white">
            {setting.isSecret && !showSecrets ? '••••••••' : 
             setting.isPassword && !showPassword ? '••••••••' : 
             setting.value || 'Nincs beállítva'}
          </p>
        </div>
        {setting.isPassword && (
          <button 
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-[#CCFF00] transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </motion.div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#CCFF00]">Adatbázis Kapcsolatok</h1>
        <button
          onClick={() => setShowSecrets(!showSecrets)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 flex items-center space-x-2"
        >
          {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showSecrets ? 'Értékek elrejtése' : 'Értékek mutatása'}</span>
        </button>
      </div>

      {!showSecrets && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <p className="text-sm text-yellow-500">
            Az érzékeny adatok el vannak rejtve. Használja a "Értékek mutatása" gombot a megtekintésükhöz.
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {databaseSettings.map((setting, index) => (
          <SettingItem key={index} setting={setting} />
        ))}
      </div>

      <div className="mt-8 flex items-center space-x-2">
        <span className="text-lg font-semibold">Kapcsolat állapota:</span>
        {connectionStatus === null ? (
          <span className="text-yellow-500">Ellenőrzés...</span>
        ) : connectionStatus ? (
          <div className="flex items-center text-green-500">
            <CheckCircle className="w-5 h-5 mr-1" />
            <span>Kapcsolódva</span>
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <XCircle className="w-5 h-5 mr-1" />
            <span>Kapcsolódási hiba</span>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Biztonsági figyelmeztetések</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Ne ossza meg az adatbázis hozzáférési adatait senkivel</li>
          <li>Rendszeresen változtassa meg a jelszavakat</li>
          <li>Használjon erős jelszavakat és egyedi felhasználóneveket</li>
          <li>Rendszeresen készítsen biztonsági mentést az adatbázisról</li>
        </ul>
      </div>
    </div>
  )
}

