"use client";
import { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2"
import { options } from "../helpers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RiskRewardGraph = ({ contracts }: RiskRewardGraphPropType) => {
  const [chartData, setChartData] = useState<myChartDataType>({
    labels: [],
    datasets: []
  });
  const [maxProfit, setMaxProfit] = useState(0);
  const [maxLoss, setMaxLoss] = useState(0);
  const [breakEvenPoints, setBreakEvenPoints] = useState<number[]>([]);

  const calculateGraphData = useCallback((contracts: contractType[]) => {
    const { data, maxProfit, maxLoss, breakEvenPoints } = calculateRiskReward(contracts);
    setChartData(data);
    setMaxProfit(maxProfit);
    setMaxLoss(maxLoss);
    setBreakEvenPoints(breakEvenPoints);
  }, [])

  useEffect(() => {
    calculateGraphData(contracts);
  }, [contracts, calculateGraphData]);

  const calculateRiskReward = (contracts: contractType[]) => {
    let maxProfit = 0;
    let maxLoss = 0;
    let breakEvenPoints = [];
    let labels = [];
    let data = [];

    for (let price = 0; price <= 200; price += 5) {
      let profitLoss = 0;
      contracts.forEach(contract => {
        const { type, strike, premium, position } = contract;
        if (type === 'call') {
          if (position === 'buy') {
            profitLoss += Math.max(0, price - strike) - premium;
          } else {
            profitLoss += premium - Math.max(0, price - strike);
          }
        } else if (type === 'put') {
          if (position === 'buy') {
            profitLoss += Math.max(0, strike - price) - premium;
          } else {
            profitLoss += premium - Math.max(0, strike - price);
          }
        }
      });
      labels.push(price);
      data.push(profitLoss);
      maxProfit = Math.max(maxProfit, profitLoss);
      maxLoss = Math.min(maxLoss, profitLoss);
      if (profitLoss === 0) {
        breakEvenPoints.push(price);
      }
    }

    return {
      data: {
        labels,
        datasets: [
          {
            label: 'Risk & Reward',
            data,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }
        ]
      },
      maxProfit,
      maxLoss,
      breakEvenPoints
    };
  };

  return (
    <div className="w-[90%] max-w-[800px] mx-auto">
      <div className="w-full">
        <div className="pt-[50%] w-full"></div>
        <div className="absolute inset-0 z-20">
          <Line data={chartData} options={options} />
        </div>
      </div>
      <div className="w-full text-center">
        <p className="font-medium">Max Profit</p>
        <p className="">${maxProfit}</p>
        <p className="font-medium pt-2">Max Loss</p>
        <p className="">${maxLoss}</p>
        <p className="font-medium pt-2">Break Even Points</p>
        <p className="">{breakEvenPoints.join(', ').trim().length > 0 ? breakEvenPoints.join(', ') : 'None'}</p>
      </div>
    </div>
  )
}
export default RiskRewardGraph