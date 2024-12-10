import { useNavigate } from 'react-router-dom';
import { convertNumber } from '../../functions/convertNumbers';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  ath: number;
  ath_change_percentage: number;
}

interface GridProps {
  coin: Coin;
}

export function Grid({ coin }: GridProps) {
  const navigate = useNavigate();
  const priceChangeIsPositive = coin.price_change_percentage_24h > 0;

  return (
    <div
      role="button"
      onClick={() => navigate(`/crypto/${coin.id}`)}
      className="bg-background p-6 rounded-lg border border-border hover:border-blue-500 transition-colors cursor-pointer w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)]"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/crypto/${coin.id}`);
        }
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={coin.image} 
            alt={coin.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="font-medium">{coin.name}</h3>
            <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">#{coin.market_cap_rank}</div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-2xl font-bold">
            ${coin.current_price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <div
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              priceChangeIsPositive
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {priceChangeIsPositive ? "+" : ""}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Market Cap</span>
            <span className="text-sm font-medium">
              ${convertNumber(coin.market_cap)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Volume (24h)</span>
            <span className="text-sm font-medium">
              ${convertNumber(coin.total_volume)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
