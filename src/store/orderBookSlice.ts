import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Order } from '../types';

interface OrderBookState {
  asks: Order[];
  bids: Order[];
  precision: number;
}

const initialState: OrderBookState = {
  asks: [],
  bids: [],
  precision: 0,
};

const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: {
    updateOrderBook(state, action: PayloadAction<{ asks: Order[]; bids: Order[] }>) {
      state.asks = action.payload.asks;
      state.bids = action.payload.bids;
    },
    changePrecision(state, action: PayloadAction<number>) {
      state.precision = action.payload;
    },
  },
});

export const { updateOrderBook, changePrecision } = orderBookSlice.actions;

export default orderBookSlice.reducer;

// Selectors
export const selectOrderBook = (state: RootState) => state.orderBook;
