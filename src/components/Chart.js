import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const COLORS = { Positive: '#A7F3D0', Neutral: '#FCD34D', Negative: '#FCA5A5' }; // Pastel greens, yellows, reds

export default function Chart({ type, data }) {
  if (!data?.comments || data.comments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-pink-50 rounded-lg text-gray-500">
        No comments available for chart
      </div>
    );
  }

  const counts = data.comments.reduce((acc, c) => {
    acc[c.sentiment] = (acc[c.sentiment] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(counts).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        {type === 'pie' ? (
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
            >
              {chartData.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <ReTooltip
              wrapperStyle={{ backgroundColor: '#FDF2F8', borderRadius: 8, color: '#333' }}
              contentStyle={{ border: 'none', boxShadow: 'none' }}
            />
          </PieChart>
        ) : (
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ReTooltip
              wrapperStyle={{ backgroundColor: '#FDF2F8', borderRadius: 8, color: '#333' }}
              contentStyle={{ border: 'none', boxShadow: 'none' }}
            />
            <Bar dataKey="value">
              {chartData.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
