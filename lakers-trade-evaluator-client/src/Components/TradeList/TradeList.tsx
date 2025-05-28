import useTradeList from "../../Hooks/useTradeList";
import TradeListElement from "./TradeListElement";
import "./TradeList.css";

const TradeList = () => {
  const { savedTrades } = useTradeList();

  return (
    <div className="trade-list-container">
      <ul>
        {savedTrades.map((trade, index) => (
          <li key={index}>
            <TradeListElement trade={trade} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeList;
