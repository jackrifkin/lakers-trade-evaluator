import useTradeList from "../../Hooks/useTradeList";
import TradeListElement from "./TradeListElement";
import "./TradeList.css";

const TradeList = () => {
  const { savedTrades } = useTradeList();

  return (
    <div className="fullscreen-centered">
      <div className="trade-list-container">
        <div className="toolbar">
          <input
            type="text"
            className="search"
            placeholder="Search trades..."
          />
          <button className="new-trade-button lato">New Trade</button>
        </div>
        <ul className="trade-list">
          {savedTrades.map((trade, index) => (
            <li key={index}>
              <TradeListElement trade={trade} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TradeList;
