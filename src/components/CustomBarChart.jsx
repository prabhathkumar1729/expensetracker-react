import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function CustomBarChart({ data }) {
  console.log(data);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleBarClick = (data) => {
    setSelectedMonth((prevMonth) => (prevMonth === data.activeLabel ? null : data.activeLabel));
  };

  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff9f40',
    '#d0ed57',
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff9f40',
  ];

  const preparePieChartData = () => {
    const selectedMonthData = data.find((item) => item.month === selectedMonth);
    console.log(selectedMonthData);
    if (selectedMonthData.totalSpent !== 0) {
      const pieChartData = Object.entries(selectedMonthData.categories).map(
        ([name, value], index) => ({
          name,
          value,
          color: colors[index % colors.length],
        }),
      );
      // console.log(pieChartData);
      return pieChartData;
    }
    return [{ name: 'No Data', value: 0, color: '#8884d8' }];
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <h2 style={{ textAlign: 'center' }}>Total Spent Transactions Per Month</h2>
        <BarChart height={400} width={400} data={data} onClick={handleBarClick}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="totalSpent" fill="#ff7f0e" />
        </BarChart>
      </div>

      {selectedMonth && (
        <div style={{ width: '50%' }}>
          <h2 style={{ textAlign: 'center' }}>
            Category-wise Spendings for
            {selectedMonth}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart width="100%" height={300}>
              <Pie
                data={preparePieChartData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {preparePieChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default CustomBarChart;
