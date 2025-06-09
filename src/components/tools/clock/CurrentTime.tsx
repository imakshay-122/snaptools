'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CurrentTime: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [timezone, setTimezone] = useState('');
  const [gmtOffset, setGmtOffset] = useState('');
  const [alarmTime, setAlarmTime] = useState({ hours: '', minutes: '', seconds: '' });
  const [alarmSet, setAlarmSet] = useState(false);
  const [targetDateTime, setTargetDateTime] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [audio] = useState(
    new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
  );

  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);

    if (userTimezone === 'Asia/Calcutta' || userTimezone === 'Asia/Kolkata') {
      setGmtOffset('GMT+05:30');
    } else {
      const offset = new Date().getTimezoneOffset();
      const hours = Math.abs(Math.floor(offset / 60));
      const minutes = Math.abs(offset % 60);
      const sign = offset > 0 ? '-' : '+';
      setGmtOffset(`GMT${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    }

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (alarmSet && targetDateTime) {
      const intervalId = setInterval(() => {
        const now = new Date();
        const diff = targetDateTime.getTime() - now.getTime();

        if (diff <= 0) {
          playAlarmSound();
          setAlarmSet(false);
          setRemainingTime('00:00:00');
          clearInterval(intervalId);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setRemainingTime(
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          );
        }
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setRemainingTime('');
    }
  }, [alarmSet, targetDateTime]);

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);

  const handleSetAlarm = () => {
    const { hours, minutes, seconds } = alarmTime;
    if (!hours || !minutes || !seconds) return;

    const now = new Date();
    const durationMs =
      parseInt(hours) * 3600 * 1000 +
      parseInt(minutes) * 60 * 1000 +
      parseInt(seconds) * 1000;

    const target = new Date(now.getTime() + durationMs);
    setTargetDateTime(target);
    setAlarmSet(true);
  };

  const handleQuickAlarm = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);

    setAlarmTime({ hours: '0', minutes: '5', seconds: '0' });
    setTargetDateTime(now);
    setAlarmSet(true);
  };

  const handleStopAlarm = () => {
    setAlarmSet(false);
    setTargetDateTime(null);
    setRemainingTime('');
    stopAlarmSound();
  };

  const playAlarmSound = () => {
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
      stopAlarmSound();
    }, 7000); // Play sound for 7 seconds
  };

  const stopAlarmSound = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-6xl font-bold">{formatTime(time)}</div>

          {alarmSet && remainingTime && (
            <div className="text-2xl font-mono text-primary">Countdown: {remainingTime}</div>
          )}

          <div className="text-xl text-muted-foreground">{formatDate(time)}</div>

          <div className="text-sm text-muted-foreground">
            {timezone} ({gmtOffset})
          </div>

          <div className="flex flex-col space-y-4 w-full max-w-xs">
            <div className="grid grid-cols-3 gap-2">
              {['hours', 'minutes', 'seconds'].map((unit) => (
                <div key={unit}>
                  <Label htmlFor={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</Label>
                  <Input
                    id={unit}
                    type="number"
                    min="0"
                    max={unit === 'hours' ? '23' : '59'}
                    value={(alarmTime as any)[unit]}
                    onChange={(e) =>
                      setAlarmTime({ ...alarmTime, [unit]: e.target.value })
                    }
                    disabled={alarmSet}
                  />
                </div>
              ))}
            </div>

            <div className="flex space-x-2 justify-center">
              <Button
                onClick={handleSetAlarm}
                disabled={alarmSet || !alarmTime.hours || !alarmTime.minutes || !alarmTime.seconds}
              >
                {alarmSet ? 'Alarm Set' : 'Set Alarm'}
              </Button>

              {alarmSet && (
                <Button onClick={handleStopAlarm} variant="destructive">
                  Stop
                </Button>
              )}

              <Button onClick={handleQuickAlarm} disabled={alarmSet} variant="outline">
                +5 Minutes
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentTime;
