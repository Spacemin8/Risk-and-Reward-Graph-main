interface contractType {
  id: string;
  type: 'call' | 'put';
  position: 'buy' | 'sell';
  strike: number;
  premium: number;
}

interface contractType2 {
  id: string;
  type: 'call' | 'put';
  price: number;
  strike: number;
  quantity: number;
}

interface RiskRewardGraphPropType {
  contracts: contractType[];
}

interface ContractsInput2PropType {
  contractState: [contractType2[], React.Dispatch<React.SetStateAction<contractType2[]>>];
}

interface ContractsInputPropType {
  contractState: [contractType[], React.Dispatch<React.SetStateAction<contractType[]>>];
}

type myChartDataType = ChartData<"line", (number | Point | null)[], unknown>;