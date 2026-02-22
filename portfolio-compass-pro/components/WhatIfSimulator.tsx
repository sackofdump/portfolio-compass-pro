'use client'
import { useState } from 'react'
import { Holding } from './PortfolioBuilder'

export default function WhatIfSimulator({ holdings }: { holdings: Holding[] }) {
  const [drop, setDrop] = useState(20)

  if (holdings.length === 0) return null

  const total = holdings.reduce((s, h) => s + h.weight, 0)
  const impact = (drop / 100) * (total / 100)

  return (
    <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">What-If Simulator</h2>
      <p className="text-gray-400 text-sm">If the market drops by:</p>

      <div className="space-y-2">
        <input
          type="range" min={5} max={50} step={5}
          value={drop}
          onChange={(e) => setDrop(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>5%</span><span>50%</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 space-y-3">
        <p className="text-4xl font-bold text-red-400">−{drop}%</p>
        <p className="text-gray-400 text-sm">
          Your portfolio loses approximately{' '}
          <span className="text-white font-semibold">{(impact * 100).toFixed(1)}%</span>{' '}
          of its value based on current weights.
        </p>
        {drop >= 30 && (
          <p className="text-yellow-400 text-sm">
            💡 A more diversified portfolio typically loses less in major downturns.
          </p>
        )}
      </div>
    </div>
  )
}