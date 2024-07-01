export interface Order {
    price: string;
    quantity: string;
  }
  
  export interface DepthUpdate {
    e: string; // Event type
    E: number; // Event time
    s: string; // Symbol
    U: number; // First update ID in event
    u: number; // Final update ID in event
    b: [string, string][]; // Bids
    a: [string, string][]; // Asks
  }
  