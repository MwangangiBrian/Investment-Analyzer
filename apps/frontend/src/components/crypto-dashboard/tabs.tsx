import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Grid } from './grid';
import { List } from './list';

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

interface TabsComponentProps {
  coins: Coin[];
}

function TabsComponent({ coins }: TabsComponentProps) {
  return (
    <div className="w-full min-h-screen bg-background px-4 py-8">
      <Tabs defaultValue="grid" className="w-full">
        <div className="mb-8">
          <TabsList className="flex gap-8 justify-center bg-muted/50 p-1 rounded-lg mx-auto w-fit">
            <TabsTrigger value="grid" className="px-6 rounded-md data-[state=active]:bg-background">
              Grid View
            </TabsTrigger>
            <TabsTrigger value="list" className="px-6 rounded-md data-[state=active]:bg-background">
              List View
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid">
          <div className="flex justify-center align-middle gap-6 flex-wrap my-8 mx-auto max-w-7xl">
            {coins.map((coin) => (
              <Grid coin={coin} key={coin.id}/>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="max-w-7xl mx-auto bg-background rounded-lg border border-border">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pl-6 py-4 text-sm font-medium text-muted-foreground w-16">#</th>
                  <th className="text-left pl-4 py-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-center py-4 text-sm font-medium text-muted-foreground">24h Change</th>
                  <th className="text-right py-4 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-right py-4 text-sm font-medium text-muted-foreground">Volume (24h)</th>
                  <th className="text-right pr-6 py-4 text-sm font-medium text-muted-foreground">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin) => (
                  <List coin={coin} key={coin.id}/>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TabsComponent;
