import CoinContext from "@/context/CoinContext"
import { useContext, useEffect, useState } from "react"
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage () {

    const {allCoin, currency} = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState<any[]>([]);
    const [input, setInput] = useState('');

    const inputHandler = (event: any) => {
        setInput(event.target.value);
        if(event.target.value === ""){
            setDisplayCoin(allCoin);
        }
    }

    const searchHandler = async (event: any) => {
        event.preventDefault();
        const coins = await allCoin.filter((item: any)=>{
            return item.name.toLowerCase().includes(input.toLocaleLowerCase())
        })
        setDisplayCoin(coins)
    }

    useEffect(()=>{
        setDisplayCoin(allCoin);
    }, [allCoin])

    return (
        <div className={`
            flex flex-col  gap-5 pt-9
        `}>
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-6xl font-bold text-center text-gray-100">Brasil+<br/>Display Crypto</h1>
                <p className="flex text-center w-3/5 text-gray-100">Bem vindo ai mundo crypto. Faça o login e explore tudo sobre Cryptomoedas.
                    Descubra o poder de valorização das AltCoins e entre nesse barco para obter grandes lucros.
                </p>
                <form onSubmit={searchHandler} className="flex justify-between items-center w-2/5 p-2 rounded text-xl bg-white">
                    <input onChange={inputHandler} list='coinlist' value={input} className="w-full border-none outline-none" type="text" placeholder="Search Crypto..." required/>

                    <datalist id='coinlist'>
                        {allCoin.map((item: any, index: any)=>(<option key={index} value={item.name}/>))}
                    </datalist>

                    <button className="bg-orange-600 text-white p-1 text-xs w-24 rounded-md" type="submit">Search</button>
                </form>                
            </div>
            <div className="crypto-table m-auto bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 rounded-md mb-5 mt-8">
                <div className="grid grid-cols-[70px_1fr_1fr_1fr_1fr] text-center p-2 border-b border-gray-400">
                    <div className="flex items-center justify-start  font-bold pl-2">#</div>
                    <div className="flex items-center justify-center font-bold ">Coins</div>
                    <div className="flex items-center justify-center font-bold ">Preço</div>
                    <div className="flex items-center justify-center font-bold ">Variação 24H</div>
                    <div className="flex items-center justify-center font-bold ">Cap. Mercado</div>
                </div>
                {displayCoin.slice(0, 10).map((item, index) => (
                    <Link href={`/coin/${item.id}`} className="grid grid-cols-[70px_1fr_1fr_1fr_1fr] text-center p-2 border-b border-gray-400" key={index}>
                        <div className="flex items-center justify-start pl-2">{item.market_cap_rank}</div>
                        <div className="flex items-center gap-3">
                            <Image src={item.image} alt={"crypto_img"} width={25} height={25} />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <div className="flex items-center justify-center">{currency.symbol} {item.current_price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className={`flex items-center justify-center ${item.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.floor(item.price_change_percentage_24h * 100) / 100}%
                        </div>
                        <div className="flex items-center justify-center">{currency.symbol} {item.market_cap.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}