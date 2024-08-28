import { AppDispatch } from '../store';
import { updateOrderBook } from '../store/orderBookSlice';
import { DepthUpdate } from '../types';

const WEBSOCKET_URL = 'wss://stream.binance.com:9443/ws/btcusdt@depth';

let ws: WebSocket | null = null; 
let isConnected = false; 
let reconnectInterval: NodeJS.Timeout | null = null;

export const connectWebSocket = (dispatch: AppDispatch): WebSocket => {

  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    console.log('WebSocket already connected or connecting:', ws.readyState);
    return ws;
  }

  const createWebSocket = () => {
    ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
      isConnected = true;
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      const data: DepthUpdate = JSON.parse(event.data);
      dispatch(
        updateOrderBook({
          asks: data.a.map((ask) => ({ price: ask[0], quantity: ask[1] })),
          bids: data.b.map((bid) => ({ price: bid[0], quantity: bid[1] })),
        })
      );
    };

    ws.onclose = () => {
      isConnected = false;
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
      isConnected = false;
      if (ws) {
        ws.close();
        reconnect();
      }
    };
  };

  const reconnect = () => {
    if (reconnectInterval || isConnected || (ws && ws.readyState === WebSocket.CONNECTING)) {
      console.log('Reconnection already in progress or WebSocket is still connecting');
      return;
    }
    reconnectInterval = setInterval(() => {
      createWebSocket();
    }, 3000);
  };

  createWebSocket();
  if (!ws) {
    throw new Error('WebSocket connection failed');
  }
  return ws;
};

export const disconnectWebSocket = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
  if (reconnectInterval) {
    clearInterval(reconnectInterval);
    reconnectInterval = null;
  }
  isConnected = false;
};
