'use client'
import { useState } from 'react'

export type Holding = {
  ticker: string
  weight: number
  sector?: string
}

export default function PortfolioBuilder({
  onUpdate,
}: {
  onUpdate: (holdings: Holding[]) => void
}) {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [ticker, setTicker] = useState('')
  const [weight, setWeight] = useState('')

  const totalWeight = holdings.reduce((sum, h) => sum + h.weight, 0)

  const addHolding = () => {
    if (!ticker || !weight) return
    const newHoldings = [
      ...holdings,
      { ticker: ticker.toUpperCase(), weight: parseFloat(weight) },
    ]
    setHoldings(newHoldings)
    onUpdate(newHoldings)
    setTicker('')
    setWeight('')
  }

  const removeHolding = (index: number) => {
    const newHoldings = holdings.filter((_, i) => i !== index)
    setHoldings(newHoldings)
    onUpdate(newHoldings)
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Your Portfolio</h2>

      <div className="flex gap-3">
        <input
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Ticker (e.g. AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addHolding()}
        />
        <input
          className="w-24 bg-gray-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="% weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addHolding()}
        />
        <button
          onClick={addHolding}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Add
        </button>
      </div>

      {holdings.length > 0 && (
        <div className="space-y-2">
          {holdings.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2"
            >
              <span className="text-emerald-400 font-mono font-bold">{h.ticker}</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${Math.min(h.weight, 100)}%` }}
                  />
                </div>
              </div>
              <span className="text-white text-sm w-12 text-right">{h.weight}%</span>
              <button
                onClick={() => removeHolding(i)}
                className="ml-3 text-gray-500 hover:text-red-400 text-lg leading-none"
              >
                ×
              </button>
            </div>
          ))}
          <div
            className={`text-sm text-right font-medium ${
              totalWeight === 100 ? 'text-emerald-400' : 'text-yellow-400'
            }`}
          >
            Total: {totalWeight}% {totalWeight !== 100 && '(should equal 100%)'}
          </div>
        </div>
      )}
    </div>
  )
}