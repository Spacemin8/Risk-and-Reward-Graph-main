"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculatePayoff, getBreakEvenPoints, getMaxLoss, getMaxProfit } from "../helpers";

const RiskRewardGraph2 = ({ contracts }: { contracts: contractType2[] }) => {
  const data = [];
  const maxPrice = Math.max(...contracts.map(contract => contract.strike)) * 1.5;
  const minPrice = Math.min(...contracts.map(contract => contract.strike)) * 0.5;

  for (let price = minPrice; price <= maxPrice; price += (maxPrice - minPrice) / 100) {
    data.push({
      price,
      payoff: calculatePayoff(contracts, price)
    });
  }

  const breakEvenPoints = getBreakEvenPoints(contracts);
  const maxProfit = getMaxProfit(contracts);
  const maxLoss = getMaxLoss(contracts);

  return (
    <div>
      <h2>Risk & Reward Graph</h2>
      <LineChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="price" type="number" domain={[minPrice, maxPrice]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="payoff" stroke="#8884d8" />
      </LineChart>
      <div>
        <p><strong>Max Profit:</strong> {maxProfit}</p>
        <p><strong>Max Loss:</strong> {maxLoss}</p>
        <p><strong>Break Even Points:</strong> {breakEvenPoints.join(', ')}</p>
      </div>
    </div>
  );
};

export default RiskRewardGraph2