import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CurrentTime from './CurrentTime';
import Stopwatch from './Stopwatch';
import Timer from './Timer';
import WorldClock from './WorldClock';

const Clock: React.FC = () => {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Clock Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current-time" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="current-time">Current Time</TabsTrigger>
              <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
              <TabsTrigger value="timer">Timer</TabsTrigger>
              <TabsTrigger value="world-clock">World Clock</TabsTrigger>
            </TabsList>
            <TabsContent value="current-time">
              <CurrentTime />
            </TabsContent>
            <TabsContent value="stopwatch">
              <Stopwatch />
            </TabsContent>
            <TabsContent value="timer">
              <Timer />
            </TabsContent>
            <TabsContent value="world-clock">
              <WorldClock />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clock;