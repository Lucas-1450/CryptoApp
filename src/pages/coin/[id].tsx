import CoinContext from "@/context/CoinContext";
import { useRouter } from "next/router"
import { useContext, useEffect, useState, useCallback } from "react";

import Image from 'next/image'
import LineChart from "@/components/LineChart/LineChart";

interface CoinData {
    name: string;
    image: {
        large: string;
      };
    symbol: string;
    market_cap_rank: string;
    market_data: {
        current_price: any;
        market_cap: any;
        high_24h: any;
        low_24h: any;
    };

  }

interface HistoricalData {
    prices: [];
    market_caps: [];
    total_volumes: [];
}

export default function CoinPage () {
    const router = useRouter();
    const { id } = router.query;
    const [coinData, setCoinData] = useState<CoinData | null>(null);
    const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
    const [selectedDays, setSelectedDays] = useState<number>(10);
    const { currency } = useContext(CoinContext);

    const fetchCoinData = useCallback(async ()=> {
        const options = {
            method : 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-mmA2WyPSedB6d9Yq4U3Jef2x'}
        };
    
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
        .then(response => response.json())
        .then(response => setCoinData(response))
        .catch(err => console.log(err))
    
    }, [id]);

    const fetchHistorialData = useCallback(async ()=> {
        const options = {
            method : 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-mmA2WyPSedB6d9Yq4U3Jef2x'}
        };
    
        fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=${selectedDays}&interval=daily`, options)
        .then(response => response.json())
        .then(response => setHistoricalData(response))
        .catch(err => console.log(err))
    
    }, [id, currency, selectedDays]);

    useEffect(()=> {
        if (id) {
            fetchCoinData();
            fetchHistorialData();
        }
    }, [currency, fetchCoinData, fetchHistorialData, id, selectedDays]);

    const handleCheckboxClick = (days: number) => {
        setSelectedDays(days); // Atualiza o número de dias selecionado
      };



    return (
        <div className="">
            <div className="  m-6">
                {coinData && historicalData ? (
                <div className="flex flex-col w-[100%]">
                    <div className="flex flex-col justify-center items-center gap-5 m-6 font-black text-white">    
                        <>
                            {coinData.image && (
                            <Image
                                src={coinData.image.large}
                                alt={`${coinData.name} image`}
                                width={110}
                                height={110}
                            />
                            )}
                            <h1 className="text-4xl">{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
                        </>
                    </div>
                    <div className="w-full flex justify-center text-white text-xs mb-2">
                        <div className="flex justify-between w-[56%] max-w-[610px] gap-24">
                            <div
                            className={`flex items-center border bg-gray-400 rounded cursor-pointer ${
                                selectedDays === 5 ? 'bg-gray-900' : 'hover:bg-gray-600'
                            }`}
                            onClick={() => handleCheckboxClick(5)}
                            >
                            <input type="checkbox" id="option1" className="hidden" readOnly />
                            <label className="w-full cursor-pointer p-1">5D</label>
                            </div>

                            <div
                            className={`flex items-center border bg-gray-400 rounded cursor-pointer ${
                                selectedDays === 10 ? 'bg-gray-900' : 'hover:bg-gray-600'
                            }`}
                            onClick={() => handleCheckboxClick(10)}
                            >
                            <input type="checkbox" id="option2" className="hidden" readOnly />
                            <label className="w-full cursor-pointer p-1">10D</label>
                            </div>

                            <div
                            className={`flex items-center border bg-gray-400 rounded cursor-pointer ${
                                selectedDays === 15 ? 'bg-gray-900' : 'hover:bg-gray-600'
                            }`}
                            onClick={() => handleCheckboxClick(15)}
                            >
                            <input type="checkbox" id="option3" className="hidden" readOnly />
                            <label className="w-full cursor-pointer p-1">15D</label>
                            </div>

                            <div
                            className={`flex items-center border bg-gray-400 rounded cursor-pointer ${
                                selectedDays === 30 ? 'bg-gray-900' : 'hover:bg-gray-600'
                            }`}
                            onClick={() => handleCheckboxClick(30)}
                            >
                            <input type="checkbox" id="option4" className="hidden" readOnly />
                            <label className="w-full cursor-pointer p-1">1M</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="w-[56%] max-w-[610px]">
                            <LineChart historicalData={historicalData}/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-2">
                        <p className="text-white text-xs">({selectedDays !== 30 ? `Últimos ${selectedDays} dias` : 'Último mês'})</p>
                    </div>
                    <div className="w-5/12 mx-auto mt-1 flex flex-col text-white">
                        <ul className="flex justify-between py-2 border-b border-gray-200 list-none">
                            <li className="font-bold">Posição (Rank)</li>
                            <li className="font-light">{coinData.market_cap_rank}</li>
                        </ul>
                        <ul className="flex justify-between py-2 border-b border-gray-200 list-none">
                            <li className="font-bold">Preço</li>
                            <li className="font-light">{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
                        </ul>
                        <ul className="flex justify-between py-2 border-b border-gray-200 list-none">
                            <li className="font-bold">Cap. Mercado</li>
                            <li className="font-light">{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
                        </ul>
                        <ul className="flex justify-between py-2 border-b border-gray-200 list-none">
                            <li className="font-bold">Máx. 24 Horas</li>
                            <li className="font-light">{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
                        </ul>
                        <ul className="flex justify-between py-2 border-b border-gray-200 list-none">
                            <li className="font-bold">Min. 24 Horas</li>
                            <li className="font-light">{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
                        </ul>
                    </div>

                </div>
                ) : (
                <div className="grid place-self-center min-h-[80vh]">
                    <div className={`
                        w-[65px] h-[65px] place-self-center
                        absolute inset-0 rounded-full bg-gradient-to-tr fromgray-200 to-[#f5d048] 
                        animate-rotate`}></div>
                </div>
                )}
            </div>
        </div>
    )
}