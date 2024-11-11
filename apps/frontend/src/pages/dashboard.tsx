import React, { useEffect, useState } from 'react'
import { Header } from '../components/header'
import TabsComponent from '../components/dashboard/tabs'
import axios from 'axios'


function Dashboard() {
const [coins, setCoins] = React.useState([]);

useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
        console.log(res);
        setCoins(res.data);
    })
    .catch(error => console.log(error));
}, []);



  return (
    <>
        <Header />
        <TabsComponent coins={coins}/>
    </>
  )
}

export default Dashboard