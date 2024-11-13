import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Grid } from './grid';
import { List } from './list';

function TabsComponent({ coins}) {
  return (
    <>
      <Tabs defaultValue="grid" className=" w-screen h-screen ">
        <TabsList className="flex gap-32 w-screen justify-center ">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <div className='flex justify-center align-middle gap-4 flex-wrap my-12 mx-9' >
            {coins.map((item, i: number) => {
              return (
                <Grid coin={item} />
               
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="list">
          <div>
            {coins.map((item, i: number) => {
              return (
                <List coin={item}/>
               
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default TabsComponent;
