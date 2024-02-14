"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function VisitsChart({ visits }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={visits}>
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
          dataKey="total"
          fill="currentColor"
          radius={[50, 50, 0, 0]}
          className="fill-blue"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
