import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

interface HistoricalData {
    prices: [number, number][]; // Array de pares [timestamp, price]
  }
  
  interface LineChartProps {
    historicalData: HistoricalData;
  }

const Chart: any = dynamic(() => import('react-google-charts'), { ssr: false });

export default function LineChart ({ historicalData }: LineChartProps)  {

    const [data, setData] = useState([["Date", "Prices"]]);
    
    useEffect(() => {
        let dataCopy = [["Date", "Prices"]];
        if(historicalData.prices){
            historicalData.prices.forEach((item: any) => {
                const date = new Date(item[0]);
                const formattedDate = isNaN(date.getTime()) ? '' : date.toLocaleDateString('pt-BR', {
                  day: '2-digit', 
                  month: '2-digit'
                });
                dataCopy.push([formattedDate, item[1]]);
              });
              setData(dataCopy);
        }
    }, [historicalData])

    return(
        <Chart 
            chartType="LineChart"
            data={data}
            height="100%"
            legendToggle
        />
    )
}