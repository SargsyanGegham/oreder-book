import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
`;

export const ControlPanel = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Select = styled.select`
  padding: 5px 10px;
  margin-left: 10px;
`;

export const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const OrderBookContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const OrderList = styled.div`
  width: 45%;
`;

export const OrderListTitle = styled.h2`
  text-align: center;
  color: #666;
`;

export const OrderItem = styled.div<{ type: 'ask' | 'bid' }>`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: ${(props) => (props.type === 'ask' ? '#ffe6e6' : '#e6ffe6')};

  &:nth-child(even) {
    background-color: #fff;
  }
`;

export const DepthBar = styled.div<{ type: 'ask' | 'bid'; width: number }>`
  position: relative;
  background-color: ${(props) => (props.type === 'ask' ? '#ffcccc' : '#ccffcc')};
  width: ${(props) => props.width}%;
  height: 100%;
  z-index: -1;
`;

export const OrderPrice = styled.span`
  width: 100px;
  text-align: right;
`;

export const OrderQuantity = styled.span`
  width: 100px;
  text-align: right;
`;