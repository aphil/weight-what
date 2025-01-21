"use client"

import React, { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const PLATE_WEIGHTS = [45, 35, 25, 10, 5, 2.5]

const WeightPlateCalculator = () => {
  const [targetWeight, setTargetWeight] = useState<number>(0)
  const [barWeight, setBarWeight] = useState<number>(45)

  const calculatePlates = (targetWeight: number, barWeight: number): number[] => {
    let remainingWeight = targetWeight - barWeight
    const plates: number[] = []

    PLATE_WEIGHTS.forEach((plateWeight) => {
      while (remainingWeight >= plateWeight * 2) {
        plates.push(plateWeight)
        remainingWeight -= plateWeight * 2
      }
    })

    return plates
  }

  const plates = useMemo(() => calculatePlates(targetWeight, barWeight), [targetWeight, barWeight])

  const renderPlates = (plates: number[]) => (
    <>
      {plates.map((weight, index) => (
        <div
          key={index}
          className={`w-${getPlateWidth(weight)} h-${getPlateHeight(weight)} ${getPlateColor(weight)} rounded-sm mx-0.5 flex items-center justify-center`}
        >
          <span className={`text-xs font-bold ${weight === 10 ? "text-gray-800" : "text-white"}`}>{weight}</span>
        </div>
      ))}
    </>
  )

  const platesNeeded = useMemo(() => {
    const plateCount = plates.reduce(
      (acc, weight) => {
        acc[weight] = (acc[weight] || 0) + 1
        return acc
      },
      {} as Record<number, number>,
    )

    return Object.entries(plateCount)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([weight, count]) => ({ weight: Number(weight), count }))
  }, [plates])

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Weight Plate Calculator</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="targetWeight">Target Weight (lbs)</Label>
          <Input
            id="targetWeight"
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(Number(e.target.value))}
            min="0"
            step="5"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="barWeight">Bar Weight: {barWeight} lbs</Label>
          <Switch
            id="barWeight"
            checked={barWeight === 45}
            onCheckedChange={(checked) => setBarWeight(checked ? 45 : 35)}
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Barbell Visualization</h2>
        <div className="flex items-center justify-center" aria-hidden="true">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <div className="flex items-center">{renderPlates([...plates].reverse())}</div>
          <div className="w-48 h-2 bg-gray-400"></div>
          <div className="flex items-center">{renderPlates(plates)}</div>
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Plates Needed (per side)</h2>
        <ul className="list-disc list-inside">
          {platesNeeded.map(({ weight, count }) => (
            <li key={weight}>
              {count}x {weight} lb plate{count > 1 ? "s" : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const getPlateWidth = (weight: number): string => {
  switch (weight) {
    case 45:
      return "8"
    case 35:
      return "7"
    case 25:
      return "6"
    case 10:
      return "5"
    case 5:
      return "4"
    default:
      return "3"
  }
}

const getPlateHeight = (weight: number): string => {
  switch (weight) {
    case 45:
    case 35:
      return "24"
    case 25:
    case 10:
      return "20"
    default:
      return "16"
  }
}

const getPlateColor = (weight: number): string => {
  switch (weight) {
    case 45:
      return "bg-blue-500"
    case 35:
      return "bg-yellow-500"
    case 25:
      return "bg-green-500"
    case 10:
      return "bg-white border border-gray-300"
    case 5:
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export default WeightPlateCalculator

