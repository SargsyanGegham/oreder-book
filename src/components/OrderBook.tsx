import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePrecision } from '../store/orderBookSlice';
import { RootState } from '../store';
import { connectWebSocket, disconnectWebSocket } from '../services/websocket';
import { Button, Container, ControlPanel, DepthBar, OrderBookContainer, OrderItem, OrderList, OrderListTitle, OrderPrice, OrderQuantity, Select, Title } from './styles';

const OrderBook: React.FC = () => {
    const dispatch = useDispatch();
    const { asks, bids, precision } = useSelector((state: RootState) => state.orderBook);
    const [connected, setConnected] = useState(false);
  
    const handlePrecisionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(changePrecision(Number(event.target.value)));
    };
  
    useLayoutEffect(() => {
        if (!connected) {
            connectWebSocket(dispatch);
            setConnected(true);
        }
        
        return () => {
            disconnectWebSocket();
        }
    // disabled cuz it should work once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleToggleConnection = () => {
      if (connected) {
        disconnectWebSocket();
      } else {
        connectWebSocket(dispatch);
      }
      setConnected(!connected);
    };
  
    const formatPrice = (price: string) => Number(price).toFixed(precision);
  
    const maxAskQuantity = Math.max(...asks.map((ask) => Number(ask.quantity)));
    const maxBidQuantity = Math.max(...bids.map((bid) => Number(bid.quantity)));
  
    return (
      <Container>
        <Title>Order Book</Title>
        <ControlPanel>
          <label>
            Precision:
            <Select disabled={!connected} value={precision} onChange={handlePrecisionChange}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Select>
          </label>
          <Button onClick={handleToggleConnection}>
            {connected ? 'Disconnect' : 'Connect'}
          </Button>
        </ControlPanel>
        <OrderBookContainer>
          <OrderList>
            <OrderListTitle>Asks</OrderListTitle>
            {asks.map((ask, index) => (
              <OrderItem key={index} type="ask">
                <OrderPrice>{formatPrice(ask.price)}</OrderPrice>
                <OrderQuantity>{ask.quantity}</OrderQuantity>
                <DepthBar type="ask" width={(Number(ask.quantity) / maxAskQuantity) * 100} />
              </OrderItem>
            ))}
          </OrderList>
          <OrderList>
            <OrderListTitle>Bids</OrderListTitle>
            {bids.map((bid, index) => (
              <OrderItem key={index} type="bid">
                <OrderPrice>{formatPrice(bid.price)}</OrderPrice>
                <OrderQuantity>{bid.quantity}</OrderQuantity>
                <DepthBar type="bid" width={(Number(bid.quantity) / maxBidQuantity) * 100} />
              </OrderItem>
            ))}
          </OrderList>
        </OrderBookContainer>
      </Container>
    );
  };
  
  export default OrderBook;