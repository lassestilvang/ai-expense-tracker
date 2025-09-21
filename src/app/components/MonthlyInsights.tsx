"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const data = [
  { name: 'Food', value: 420 },
  { name: 'Transport', value: 180 },
  { name: 'Entertainment', value: 95 },
  { name: 'Other', value: 200 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

const MonthlyInsights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Budget Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold text-green-500">12</div>
            <div className="text-xl text-gray-500">days!</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyInsights;