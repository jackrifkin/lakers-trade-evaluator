import type { Trade } from "../../types";

const TradeListElement = ({ trade }: { trade: Trade }) => {
  return (
    <div className="lato">
      <h3>{trade.name}</h3>
      <br />
      {JSON.stringify(trade.elements)}
    </div>
  );
};

export default TradeListElement;
