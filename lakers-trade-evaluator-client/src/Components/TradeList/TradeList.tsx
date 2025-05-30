import useTradeList from "../../Hooks/useTradeList";
import TradeListElement from "./TradeListElement";
import "./TradeList.css";
import { useNavigate } from "react-router-dom";

const TradeList = () => {
  const { savedTrades, setSavedTrades } = useTradeList();
  const navigate = useNavigate();

  const removeTrade = (tid: string) => {
    setSavedTrades((trades) => trades.filter((t) => t.id !== tid));
  };

  const editTrade = (tradeId: string) => {
    navigate(`/trade/${tradeId}/edit`);
  };

  return (
    <div className="fullscreen-centered">
      <div className="trade-list-container">
        <div className="toolbar">
          <input
            type="text"
            className="search"
            placeholder="Search trades..."
          />
          <button
            className="new-trade-button lato"
            onClick={() => navigate(`/trade/create`)}
          >
            New Trade
          </button>
        </div>
        <ul className="trade-list">
          {savedTrades.map((trade, index) => (
            <li key={index}>
              <TradeListElement
                removeTrade={removeTrade}
                trade={trade}
                editTrade={() => editTrade(trade.id!)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TradeList;
