import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Coin from '../components/Coin';
import Header from '../components/Header';
import './Home.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function Home() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((e) => console.log(e));
    }, [page]);

    return <div id="home">
        <Header />
        <div id="coin-list">
            <div style={{ display: "flex", fontSize: "24px", marginTop: "5px" , width:"950px", height:"30px", fontFamily: 'Inter, sans-serif'}}>
                <div className='head-name'>Name</div>
                <div className='head-symbol'>Symbol</div>
                <div className='head-price'>Price</div>
                <div className='head-volume'>Volume</div>
                <div className='head-marketcap'>Marketcap</div>
                <div className='head-pricechange'>PriceChange</div>
            </div>

            {
                data.map((ele, index) => {
                    return <Coin key={ele.id} id={ele.id} name={ele.name} symbol={ele.symbol} image={ele.image} price={ele.current_price} marketcap={ele.total_volume}
                        volume={ele.market_cap} priceChange={ele.price_change_percentage_24h} page={page} index={index} />
                })
            }
        </div>
        <div id="page-navigate">
            <button id="previous" onClick={() => setPage(page - 1)} style={{ display: `${page === 1 ? "none" : "block"}` }}><AiOutlineLeft size={20} /> <span>Previous 100</span></button>
            <button id="next" onClick={() => setPage(page + 1)}><span>Next 100</span> <AiOutlineRight size={20} /></button>
        </div>

    </div>;
}
