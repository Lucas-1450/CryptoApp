import CoinContext from '@/context/CoinContext';
import Image from 'next/image'
import { useContext } from 'react'
import { MdArrowOutward } from "react-icons/md"
import Link from 'next/link'

export default function Navbar () {

    const {setCurrency} = useContext(CoinContext);

    const currencyHandler = (event: any) => {
        switch (event.target.value){
            case "usd": {
                setCurrency({name: "usd", symbol: "$"})
                break;
            }
            case "eur": {
                setCurrency({name: "eur", symbol: "€"})
                break;
            }
            case "brl": {
                setCurrency({name: "brl", symbol: "R$"})
                break;
            }
            default: {
                setCurrency({name: "usd", symbol: "$"})
                break;
            }
        }
    }

    return (
        <div className={`
            flex justify-between items-center gap-10
            border-b w-full
        `}> 
            <Link href={'/'}>
                <div className="flex justify-center items-center px-28 h-12">
                    <Image 
                    src="/logo_display.png"
                    alt="logo"
                    width={30}
                    height={30}
                    />
                    <Image
                    src="/display_crypto.png"
                    alt="logo1"
                    width={130}
                    height={30}
                    />
                </div>
            </Link>
            
            <ul className={`
                    flex justify-center items-center gap-10
                `}>
                <Link href={'/'}><li>Home</li></Link>
                <Link href={'/ws-binance/live'}><li>Favoritas(Live)</li></Link>
                <Link href={'https://www.binance.com/en'} target="_blank"><li>Binance</li></Link>
                <Link href={' https://docs.coingecko.com/reference/introduction'} target="_blank"><li>CoinGecko API</li></Link>
            </ul>
            <div className="nav-right flex justify-center items-center gap-2 px-28">
                <select onChange={currencyHandler} className="px-1 py-0 border-2 border-white rounded-md bg-transparent text-black">
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="brl">BRL</option>
                </select>
                <div className={`
                        flex justify-center items-center w-[105px] gap-2
                        bg-blue-500 hover:bg-blue-700 text-white py-0 px-0 rounded-2xl
                    `}>
                    <button>Sign up</button>
                    <MdArrowOutward/>
                </div>
            </div>
        </div>
    )

}