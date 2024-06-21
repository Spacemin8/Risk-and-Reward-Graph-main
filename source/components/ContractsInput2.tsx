"use client";
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { scrollHandler } from "../helpers";

const ContractsInput2 = ({ contractState }: ContractsInput2PropType) => {
  const [contracts, setContracts] = contractState;
  const [tempContracts, setTempContracts] = useState<contractType2[]>(JSON.parse(JSON.stringify(contracts)));

  const validateContracts = (contracts: contractType2[]) => {
    if (!contracts) return 'Please add at least one contract';
    if (contracts.length === 0) return 'Please add at least one contract';

    for (let i = 0; i < contracts.length; i++) {
      const contract = contracts[i];
      const { type, strike, price, quantity } = contract;

      if (type !== 'call' && type !== 'put') return `Invalid contract type at contract #${i + 1}`;
      if (isNaN(strike)) return `Invalid strike price at contract #${i + 1}`;
      if (isNaN(price)) return `Invalid premium at contract #${i + 1}`;
      if (isNaN(quantity)) return `Invalid premium at contract #${i + 1}`;
      if (strike <= 0) return `Invalid strike price at contract #${i + 1}`;
      if (price <= 0) return `Invalid price at contract #${i + 1}`;
      if (quantity <= 0) return `Invalid quantity at contract #${i + 1}`;
    }

    return '';
  }

  const addAContractHandler = () => {
    if (tempContracts.length >= 4) return toast.error('Maximum of 4 contracts allowed');

    setTempContracts(prev => [...prev, { id: v4(), type: 'call', strike: 0, price: 0, quantity: 1 }]);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorMessage = validateContracts(tempContracts);
    if (errorMessage) return toast.error(errorMessage);

    setContracts(JSON.parse(JSON.stringify(tempContracts)));
    toast.success('Done');
    scrollHandler('/#top')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center text-center">
      <div className="flex flex-col gap-4 pt-4">
        {tempContracts.map((contract, index) => (
          <div key={contract.id} className="flex flex-col">
            <h4 className="font-semibold pb-1.5">Contract #{index + 1}</h4>
            <div className="flex gap-2 flex-wrap justify-center w-full text-left font-normal text-xs">
              <div className="">
                <p className="pl-2">Type</p>
                <select
                  value={contract.type}
                  className="w-24 border-2 border-gray-300 rounded-md px-2 py-1"
                  onChange={e => {
                    setTempContracts(prev => {
                      const newContracts = [...prev];
                      newContracts[index].type = e.target.value as 'call' | 'put';
                      return newContracts;
                    });
                  }}
                >
                  <option value="call">Call</option>
                  <option value="put">Put</option>
                </select>
              </div>
              <div className="">
                <p className="pl-2">Strike Price</p>
                <input
                  type="number"
                  value={contract.strike}
                  className="w-24 border-2 border-gray-300 rounded-md px-2 py-1"
                  onChange={e => {
                    setTempContracts(prev => {
                      const newContracts = [...prev];
                      newContracts[index].strike = Number(e.target.value);
                      return newContracts;
                    });
                  }}
                  placeholder="Strike Price"
                />
              </div>
              <div className="">
                <p className="pl-2">Price</p>
                <input
                  type="number"
                  value={contract.price}
                  className="w-24 border-2 border-gray-300 rounded-md px-2 py-1"
                  onChange={e => {
                    setTempContracts(prev => {
                      const newContracts = [...prev];
                      newContracts[index].price = Number(e.target.value);
                      return newContracts;
                    });
                  }}
                  placeholder="Price"
                />
              </div>
              <div className="">
                <p className="pl-2">Quantity</p>
                <input
                  type="number"
                  value={contract.quantity}
                  className="w-24 border-2 border-gray-300 rounded-md px-2 py-1"
                  onChange={e => {
                    setTempContracts(prev => {
                      const newContracts = [...prev];
                      newContracts[index].quantity = Number(e.target.value);
                      return newContracts;
                    });
                  }}
                  placeholder="Quantity"
                />
              </div>
              <button
                type="button"
                className="bg-red-500 text-white w-24 py-1.5 rounded-md self-end"
                onClick={() => {
                  if (tempContracts.length <= 1) return toast.error('At least one contract is required');

                  setTempContracts(prev => {
                    const newContracts = [...prev];
                    newContracts.splice(index, 1);
                    return newContracts;
                  });
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="bg-blue-500 text-white px-6 py-1.5 rounded-md"
          onClick={addAContractHandler}
        >
          Add Contract
        </button>
        <button
          className="bg-green-900 text-white px-6 py-1.5 rounded-md"
          type="submit"
          disabled={JSON.stringify(tempContracts) === JSON.stringify(contracts)}
        >
          Calculate
        </button>
      </div>
    </form>
  )
}
export default ContractsInput2