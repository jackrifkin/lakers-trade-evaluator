import { createContext } from "react";
import type { Trade } from "../types";

export const TradeContext = createContext<Trade | undefined>(undefined);
