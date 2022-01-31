import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './Description.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Description() {
  const [data, setData] = useState([]);
  const [coin, setCoin] = useState([]);
  const [flag, setflag] = useState(false);
  const [days, setDays] = useState(1);
  var {id} = useParams();
  
  // console.log(data);
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`)
      .then((res) => {
        console.log(res.data.prices);
        setData(res.data.prices);
        setflag(true);
      })
      .catch((e) => console.log(e));
  }, [days,id]);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => {
        console.log(res.data);
        setCoin(res.data);

      })
      .catch((e) => console.log(e));
  }, [id]);

  function dayChanger(e) {
    console.log(e.target.value)
    if (e.target.value === "1")
      setDays(1);
    else if (e.target.value === "7")
      setDays(7);
    else if (e.target.value === "30")
      setDays(30);

  }

  return <div id="description">
    {(coin.length !== 0) && <div id="details">
      <img src={coin.image.large} alt="" />
      <h2>Coin Name</h2>
      <p>{coin.name}</p>
      <br />
      <h2>Description</h2>
      <p dangerouslySetInnerHTML={{ __html: coin.description.en }} />
      <br />
      <h2>MarketCap Rank</h2>
      <p>{coin.market_cap_rank}</p>
      <select id="days" name="days" onChange={(e) => { dayChanger(e) }}>
        <option value="1">1 Day</option>
        <option value="7">7 Days</option>
        <option value="30">30 Days</option>
      </select>
    </div>}
    {(data.length !== 0 && flag === true) &&
      <Line data={{
        labels: data.map((prices) => {
          var time = new Date(prices[0]);
          return days === 1 ? `${time.toLocaleTimeString()}` : `${time.toLocaleString()}`;
        }),
        datasets: [
          {
            label: 'Price',
            data: data.map((prices) => prices[1]),
            borderColor: 'rgb(255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
            color: '#ffffff',
          }
        ],
      }}

        options={{
          responsive: true,
          // maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, ticks) {
                  return '$' + value;
                },
                color: "#ffffff",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.3)",
              }
            },
            x: {
              ticks: {
                color: "#ffffff",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.3)",
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: "#ffffff",
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                  }
                  return label;
                }
              }
            },
            title: {
              display: true,
              text: `${days===1?"Price Chart (24 hours)":`Price Chart (${days} days)`}`,
              color: "#ffffff"
            },
          },
        }}
      />
    }
  </div>;
}
