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

interface ListProps {
  coin: Coin;
}

export function List({ coin }: ListProps) {
  const navigate = useNavigate();
  const priceChangeIsPositive = coin.price_change_percentage_24h > 0;
  const formattedPriceChange = Math.abs(coin.price_change_percentage_24h).toFixed(2);

  return (
    <tr 
      role="button"
      onClick={() => navigate(`/crypto/${coin.id}`)}
      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/crypto/${coin.id}`);
        }
      }}
    >
      <td className="py-4 pl-6 text-sm text-muted-foreground">
        {coin.market_cap_rank}
      </td>
      <td className="py-4 pl-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 flex-shrink-0">
            <img 
              className="h-8 w-8 rounded-full" 
              src={coin.image} 
              alt={`${coin.name} logo`}
            />
          </div>
          <div>
            <p className="font-medium text-sm">{coin.name}</p>
            <p className="text-xs text-muted-foreground uppercase">{coin.symbol}</p>
          </div>
        </div>
      </td>
      <td className="py-4">
        <div className="flex justify-center">
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              priceChangeIsPositive
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {priceChangeIsPositive ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7-7-7"
                />
              </svg>
            )}
            {formattedPriceChange}%
          </div>
        </div>
      </td>
      <td className="py-4 text-right pr-4">
        <p className="font-medium">
          ${coin.current_price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </td>
      <td className="py-4 text-right pr-4">
        <p className="text-sm text-muted-foreground">
          $<span className="md:hidden">{convertNumber(coin.total_volume)}</span>
          <span className="hidden md:inline">{coin.total_volume.toLocaleString()}</span>
        </p>
      </td>
      <td className="py-4 text-right pr-6">
        <p className="text-sm text-muted-foreground">
          $<span className="md:hidden">{convertNumber(coin.market_cap)}</span>
          <span className="hidden md:inline">{coin.market_cap.toLocaleString()}</span>
        </p>
      </td>
    </tr>
  );
}