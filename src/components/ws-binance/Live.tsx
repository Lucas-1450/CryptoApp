import CoinContext from "@/context/CoinContext"
import { useContext, useEffect, useState } from "react";

const coins = ['BTC', 'ETH', 'BNB', 'NEAR', 'SOL', 'ADA', 'XRP', 'DOT', 'USDC', 'DOGE']

export default function Teste() {

    const [prices, setPrices] = useState<Record<string, string>>({})

    const {currency} = useContext(CoinContext);

    useEffect(() => {
        const wsConnections: WebSocket[] = []

        coins.forEach((coin) => {            
            const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin.toLowerCase()}usdt@trade`);
            wsConnections.push(ws)

            ws.onmessage = (event) => {
                const messageObject = JSON.parse(event.data)
                
                setPrices((prevPrices) => ({
                    ...prevPrices,
                    [coin]: parseFloat(messageObject.p).toFixed(4),
                }))
            }

            ws.onclose = () => console.log(`Conexão perdida para ${coin}`)
            ws.onerror = (error) => console.error(`Erro no WebSocket para ${coin}`, error)
        })

        return () => {
            wsConnections.forEach((ws) => ws.close())
        }
    }, [])

    return (
        <div className="flex flex-col gap-2 w-3/5">
            <h1 className="text-6xl font-bold text-center text-gray-100">Favoritas - Tempo Real</h1>
            <h4 className="font-bold text-center text-gray-100">(Dólar)</h4>
            <table className="m-auto bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 rounded-md mb-5 mt-8 w-full">
                <thead>
                    <tr className="text-center grid grid-cols-[70px_1fr_1fr] p-2 border-b border-gray-400">
                        <th>#</th>
                        <th>Crypto</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin, index) => (
                        <tr key={coin} className="text-center grid grid-cols-[70px_1fr_1fr] p-2 border-b border-gray-400">
                            <td>{index + 1}</td>
                            <td>{coin}</td>
                            <td>$ {prices[coin] || 'Carregando...'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}