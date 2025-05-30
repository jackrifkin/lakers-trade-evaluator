import { useEffect, useState } from "react";
import type { Trade } from "../../types";
import { useParams } from "react-router-dom";
import { MOCK_SAVED_TRADE_DATA } from "../../mock_data";

const TradeView = () => {
  const [currentTrade, setCurrentTrade] = useState<Trade | undefined>(
    undefined
  );
  const { tid } = useParams();

  useEffect(() => {
    const fetchTradeById = async () => {
      try {
        // TODO: fetch real data
        // const response = await getTradeById(tid);
        setCurrentTrade(MOCK_SAVED_TRADE_DATA[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTradeById();
  }, []);

  return <></>;
};

export default TradeView;
