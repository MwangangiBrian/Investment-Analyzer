import { useEffect, useState } from 'react';
import axios from 'axios';
import { twelveData } from '@/functions/twelveData';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  percent_change: number;
}

export function StocksOverview() {
  const [topGainers, setTopGainers] = useState<StockData[]>([]);
  const [topLosers, setTopLosers] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `https://api.twelvedata.com/market_movers/stocks?apikey=${twelveData}`
        );
        
        if (response.data.status === 'ok') {
          // Assuming the API returns data in a specific format
          const stocks = response.data.values || [];
          
          // Sort stocks by percent change to get gainers and losers
          const sortedStocks = [...stocks].sort((a, b) => b.percent_change - a.percent_change);
          setTopGainers(sortedStocks.slice(0, 5));
          setTopLosers(sortedStocks.slice(-5).reverse());
        } else {
          setError('Failed to fetch stock data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const StockList = ({ stocks, type }: { stocks: StockData[]; type: 'gainer' | 'loser' }) => (
    <div className="space-y-2">
      {stocks.map((stock) => (
        <div key={stock.symbol} className="p-3 rounded-lg bg-card">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{stock.symbol}</h3>
              <p className="text-sm text-muted-foreground">{stock.name}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${stock.price}</p>
              <p className={`text-sm ${type === 'gainer' ? 'text-green-500' : 'text-red-500'}`}>
                {stock.percent_change > 0 ? '+' : ''}{stock.percent_change.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div>
        <h2 className="text-xl font-semibold mb-4">Top Gainers</h2>
        <StockList stocks={topGainers} type="gainer" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Top Losers</h2>
        <StockList stocks={topLosers} type="loser" />
      </div>
    </div>
  );
}
