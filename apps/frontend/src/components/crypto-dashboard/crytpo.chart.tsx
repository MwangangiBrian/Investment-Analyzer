import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface PriceData {
  prices: [number, number][];
}

interface OHLCData {
  market_caps: [number, number][];
  prices: [number, number][];
  total_volumes: [number, number][];
}

type TimeFrame = '24h' | '7d' | '30d' | '1y';
type ChartType = 'line' | 'candlestick';

export function CryptoChart() {
  const { id } = useParams<{ id: string }>();
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [ohlcData, setOhlcData] = useState<any[] | null>(null);
  const [timeframe, setTimeframe] = useState<TimeFrame>('7d');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        setLoading(true);
        const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 365;
        const interval = timeframe === '24h' ? 'hourly' : 'daily';
        
        // Fetch OHLC data for candlestick chart
        const ohlcResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${days}`
        );
        
        // Fetch regular price data for line chart
        const priceResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`
        );

        setOhlcData(ohlcResponse.data);
        setPriceData(priceResponse.data);
      } catch (error) {
        console.error('Failed to fetch price data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
  }, [id, timeframe]);

  if (loading || !priceData || !ohlcData) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Calculate if price is increasing or decreasing
  const prices = priceData.prices;
  const startPrice = prices[0][1];
  const endPrice = prices[prices.length - 1][1];
  const isPriceUp = endPrice > startPrice;

  const chartColor = isPriceUp ? '#22c55e' : '#ef4444'; // green-500 : red-500

  const lineChartSeries = [{
    name: 'Price',
    data: priceData.prices.map(([timestamp, price]) => ({
      x: new Date(timestamp).getTime(),
      y: price,
    })),
  }];

  const candlestickSeries = [{
    name: 'Price',
    data: ohlcData.map(([timestamp, open, high, low, close]) => ({
      x: new Date(timestamp).getTime(),
      y: [open, high, low, close]
    }))
  }];

  const baseOptions: ApexOptions = {
    chart: {
      height: 400,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#6b7280',
        },
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          return formatPrice(value);
        },
        style: {
          colors: '#6b7280',
        },
      },
      opposite: true,
    },
    grid: {
      borderColor: 'rgba(107, 114, 128, 0.1)',
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: timeframe === '24h' ? 'HH:mm' : 'dd MMM',
      },
      y: {
        formatter: function(value) {
          return formatPrice(value);
        },
      },
    },
  };

  const lineChartOptions: ApexOptions = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: 'area',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      background: 'transparent',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: [chartColor],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: chartColor,
            opacity: 0.4
          },
          {
            offset: 100,
            color: chartColor,
            opacity: 0.1
          }
        ]
      },
    },
    colors: [chartColor],
    markers: {
      size: 0,
      hover: {
        size: 4,
      },
    },
  };

  const candlestickOptions: ApexOptions = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: 'candlestick',
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#22c55e',
          downward: '#ef4444'
        }
      }
    },
    tooltip: {
      ...baseOptions.tooltip,
      custom: function({ seriesIndex, dataPointIndex, w }) {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return (
          '<div class="p-2">' +
          '<div>Open: ' + formatPrice(o) + '</div>' +
          '<div>High: ' + formatPrice(h) + '</div>' +
          '<div>Low: ' + formatPrice(l) + '</div>' +
          '<div>Close: ' + formatPrice(c) + '</div>' +
          '</div>'
        );
      }
    }
  };

  const timeframeButtons: TimeFrame[] = ['24h', '7d', '30d', '1y'];

  return (
    <div className="w-full bg-background p-6 rounded-lg border border-border">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Price Chart</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartType === 'line'
                  ? 'bg-blue-500 text-white'
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/></svg>
            </button>
            <button
              onClick={() => setChartType('candlestick')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartType === 'candlestick'
                  ? 'bg-blue-500 text-white'
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  .st0.fill:#000000;  </style> <g> <polygon className="st0" points="195.047,75.844 178.797,75.844 178.797,109.047 138.156,109.047 138.156,320.344 178.797,320.344 178.797,360.297 195.047,360.297 195.047,320.344 235.688,320.344 235.688,109.047 195.047,109.047 "></polygon> <polygon className="st0" points="512,49.438 471.375,49.438 471.375,16.25 455.109,16.25 455.109,49.438 414.469,49.438 414.469,293.25 455.109,293.25 455.109,333.203 471.375,333.203 471.375,293.25 512,293.25 "></polygon> <path className="st0" d="M56.875,203.172h-16.25v36.578H0v219.422h40.625v36.578h16.25v-36.578h40.656V239.75H56.875V203.172z M81.281,256v186.922H16.25V256H81.281z"></path> <path className="st0" d="M333.203,151.703h-16.25v33.188h-40.641v227.563h40.641v39.953h16.25v-39.953h40.641V184.891h-40.641V151.703z M357.594,201.156v195.047h-65.031V201.156H357.594z"></path> </g> </g></svg>
              
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          {timeframeButtons.map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeframe === period
                  ? 'bg-blue-500 text-white'
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[400px]">
        <ReactApexChart
          options={chartType === 'line' ? lineChartOptions : candlestickOptions}
          series={chartType === 'line' ? lineChartSeries : candlestickSeries}
          type={chartType === 'line' ? 'area' : 'candlestick'}
          height={400}
        />
      </div>
    </div>
  );
}
