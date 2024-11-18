import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/header";
import { convertNumber } from "../functions/convertNumbers";
import { BackToTop } from "../components/back-to-top";
import { CryptoChart } from "@/components/crypto-dashboard/crytpo.chart";

interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    subreddit_url: string;
    repos_url: {
      github: string[];
    };
  };
}

export function CryptoCoin() {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );
        setCoin(response.data);
      } catch (err) {
        setError("Failed to fetch coin data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  if (error || !coin) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500">{error || "Failed to load coin data"}</p>
        </div>
      </>
    );
  }

  const priceChangeIsPositive =
    coin.market_data.price_change_percentage_24h > 0;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Basic Info */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="w-16 h-16"
          />
          <div>
            <h1 className="text-2xl font-bold">{coin.name}</h1>
            <p className="text-muted-foreground uppercase">{coin.symbol}</p>
          </div>
          <div className="ml-auto">
            <h2 className="text-3xl font-bold text-right">
              ${coin.market_data.current_price.usd.toLocaleString()}
            </h2>
            <div
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium ${
                priceChangeIsPositive
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {priceChangeIsPositive ? "+" : ""}
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <CryptoChart />
        </div>

        {/* Market Data and Price Changes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Market Data */}
          <div>
            <div className="p-4 rounded-lg border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Market Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Market Cap
                  </span>
                  <span className="font-medium">
                    ${convertNumber(coin.market_data.market_cap.usd)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Volume (24h)
                  </span>
                  <span className="font-medium">
                    ${convertNumber(coin.market_data.total_volume.usd)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Circulating Supply
                  </span>
                  <span className="font-medium">
                    {convertNumber(coin.market_data.circulating_supply)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Supply
                  </span>
                  <span className="font-medium">
                    {convertNumber(coin.market_data.total_supply)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Changes */}
          <div>
            <div className="p-4 rounded-lg border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Price Change
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">24h</span>
                  <span
                    className={`font-medium ${
                      coin.market_data.price_change_percentage_24h > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">7d</span>
                  <span
                    className={`font-medium ${
                      coin.market_data.price_change_percentage_7d > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.market_data.price_change_percentage_7d.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">30d</span>
                  <span
                    className={`font-medium ${
                      coin.market_data.price_change_percentage_30d > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <button
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            className="flex items-center gap-2 w-full"
          >
            <h2 className="text-xl font-bold">About {coin.name}</h2>
            <svg
              className={`w-5 h-5 transition-transform ${
                isDescriptionOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
              isDescriptionOpen
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p
              className="text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
            />
          </div>
        </div>

        {/* Links */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Links</h2>
          <div className="flex flex-wrap gap-4">
            {coin.links.homepage[0] && (
              <a
                href={coin.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Website
              </a>
            )}
            {coin.links.blockchain_site[0] && (
              <a
                href={coin.links.blockchain_site[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Explorer
              </a>
            )}
            {coin.links.subreddit_url && (
              <a
                href={coin.links.subreddit_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Reddit
              </a>
            )}
          </div>
        </div>
      </main>
      <BackToTop />
    </>
  );
}
