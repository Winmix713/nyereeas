'use client'

interface WeeklyChartProps {
  data: number[]
  labels: string[]
}

export function WeeklyChart({ data, labels }: WeeklyChartProps) {
  const maxValue = Math.max(...data)

  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="text-lg font-medium mb-6">Heti predikciós pontosság</h3>
      <div className="flex items-end h-48 gap-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-[#CCFF00] rounded-t-sm transition-all duration-500 ease-out"
              style={{ 
                height: `${(value / maxValue) * 100}%`,
                transitionDelay: `${index * 100}ms`
              }}
            />
            <span className="text-xs text-gray-400">{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

