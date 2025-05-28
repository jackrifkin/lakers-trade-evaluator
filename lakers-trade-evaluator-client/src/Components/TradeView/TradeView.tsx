import { useEffect, useState } from "react";
import TradeEditor from "./TradeEditor";
import TradeDetails from "./TradeDetails";
import type { Trade } from "../../types";
import { useParams } from "react-router-dom";
import { MOCK_SAVED_TRADE_DATA } from "../../mock_data";

const TradeView = () => {
  const [isEditing, setIsEditing] = useState<boolean>(true);
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

  return isEditing ? (
    <TradeEditor trade={currentTrade} />
  ) : (
    <TradeDetails trade={currentTrade} />
  );
};

export default TradeView;
