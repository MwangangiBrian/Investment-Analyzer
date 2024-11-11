import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

function TabsComponent({ coins}) {
  return (
    <>
      <Tabs defaultValue="grid" className=" w-screen h-screen ">
        <TabsList className="flex gap-32 w-screen justify-center ">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <div>
            {coins.map((item, i: number) => {
              return (
                <p key={i}>
                  {i + 1}.{item.name}
                </p>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="list">
          <div>
            {coins.map((item, i: number) => {
              return (
                <p key={i}>
                  <img src="{item.image}" />
                  {i + 1}.{item.name}
                </p>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default TabsComponent;
