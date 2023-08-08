import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function LineChartComponent({ data }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Get unique category keys from all months' data
  const categoryKeys = Array.from(
    new Set(data.flatMap((item) => Object.keys(item.categories)))
  );

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Monthly Category-wise Spendings</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {categoryKeys.map((category, index) => (
            <Line
              key={category}
              type="monotone"
              dataKey={`categories.${category}`}
              name={category}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;
