"use client";
import ContractsInput from "@/source/components/ContractsInput";
import RiskRewardGraph from "@/source/components/RiskRewardGraph";
import { useState } from "react";
import { v4 } from "uuid";

export default function Home() {
  const contractsState = useState<contractType[]>([
    { id: v4(), type: 'call', strike: 1, position: 'buy', premium: 1 }
  ]);

  return (
    <main className="flex-1 flex flex-col items-center gap-2 px-5 py-10 text-sm sm:text-base text-center">
      <h1 id="top" className="text-2xl sm:text-3xl font-bold">Risk and Reward Graph</h1>
      <p className="text-center">4 Options Strategy Risk & Reward Graph</p>
      <RiskRewardGraph contracts={contractsState[0]} />
      <ContractsInput contractState={contractsState} />
    </main>
  )
}