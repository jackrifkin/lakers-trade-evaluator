import { useEffect, useState } from "react";
import type { Trade } from "../types";
import { MOCK_SAVED_TRADE_DATA } from "../mock_data";

const useTradeList = () => {
  const [savedTrades, setSavedTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchAllSavedTrades = async () => {
      try {
        // TODO: fetch real data
        // const response = await getSavedTrades();
        setSavedTrades(MOCK_SAVED_TRADE_DATA);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllSavedTrades();
  }, []);

  return { savedTrades };
};

export default useTradeList;
