"use client";
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [count, setCount] = useState(0);
  const socket = io();

  useEffect(() => {
    socket.emit('countUpdate', count);

    socket.on('countUpdate', (newCount) => {
      setCount(newCount);
    });

    return () => {
      socket.off('countUpdate');
    };
  }, [socket, count]);

  const handleIncrement = () => {
      console.log('increment')
    socket.emit('incrementCount');
  };

  const handleDecrement = () => {
        console.log('decrement')
    socket.emit('decrementCount');
  };
  return (
      <>
        <a href="/page1">
          <button>Page 1</button>
        </a>
        <button onClick={handleIncrement}>button1</button>
        <h1>
          button1 Count: <span>{count}</span>
        </h1>
        <button onClick={handleDecrement}>Close button1</button>
      </>
  )
}
