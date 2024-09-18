import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import CoinContext from './CoinContext';

function Provider( { children } ) {

    const[allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async ()=> {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-mmA2WyPSedB6d9Yq4U3Jef2x'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchAllCoin();
    },[currency])

    const value = {
        allCoin,
        currency,
        setCurrency
    }

  return (
    <CoinContext.Provider value={ value }>
        {children}
    </CoinContext.Provider>        
  );
}

export default Provider

Provider.propTypes = {
    children: propTypes.any,
};