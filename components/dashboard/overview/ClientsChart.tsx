"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function ClientsChart({ clients }: { clients: any }) {
  return (
    <ResponsiveContainer width="35%" height={350}>
      <BarChart data={clients}>
        <XAxis
          dataKey="name"
          stroke="#8c9fb9"
          fontSize={14}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#8c9fb9"
          fontSize={14}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="age"
          fill="currentColor"
          radius={[50, 50, 0, 0]}
          className="fill-blue"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
