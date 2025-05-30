import { useEffect, useState } from "react";
import type { Trade } from "../types";
import { getSavedTrades } from "../Services/tradeService";

const useTradeList = () => {
  const [savedTrades, setSavedTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchAllSavedTrades = async () => {
      try {
        const response = await getSavedTrades();
        setSavedTrades(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllSavedTrades();
  }, []);

  return { savedTrades, setSavedTrades };
};

export default useTradeList;
