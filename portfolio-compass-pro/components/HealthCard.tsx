'use client'
import { Holding } from './PortfolioBuilder'

function getScore(holdings: Holding[]) {
  if (holdings.length === 0) return null
  const total = holdings.reduce((s, h) => s + h.weight, 0)
  const largest = Math.max(...holdings.map((h) => h.weight))
  const concentration = largest / total
  const diversification = Math.min(holdings.length / 10, 1)
  const score = Math.round((1 - concentration * 0.7 + diversification * 0.3) * 100)
  return Math.min(Math.max(score, 0), 100)
}

function getLabel(score: number) {
  if (score >= 80) return { label: 'Healthy', color: 'text-emerald-400' }
  if (score >= 60) return { label: 'Moderate Risk', color: 'text-yellow-400' }
  return { label: 'High Risk', color: 'text-red-400' }
}

export default function HealthCard({ holdings }: { holdings: Holding[] }) {
  const score = getScore(holdings)

  if (score === null) {
    return (
      <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-center h-40">
        <p className="text-gray-500 text-sm">Add holdings to see your portfolio health</p>
      </div>
    )
  }

  const { label, color } = getLabel(score)
  const largest = holdings.reduce((a, b) => (a.weight > b.weight ? a : b))

  return (
    <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Portfolio Health</h2>

      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f2937" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15.9" fill="none"
              stroke={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'}
              strokeWidth="3"
              strokeDasharray={`${score} 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{score}</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className={`text-lg font-semibold ${color}`}>{label}</p>
          <p className="text-gray-400 text-sm">{holdings.length} positions</p>
          <p className="text-gray-400 text-sm">
            Largest: <span className="text-white">{largest.ticker} ({largest.weight}%)</span>
          </p>
        </div>
      </div>

      {largest.weight > 30 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-3 text-yellow-400 text-sm">
          ⚠️ {largest.ticker} makes up {largest.weight}% of your portfolio — consider reducing concentration risk.
        </div>
      )}
    </div>
  )
}