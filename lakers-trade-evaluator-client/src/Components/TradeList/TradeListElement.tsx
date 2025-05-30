import { useState } from "react";
import type { DraftPick, Trade, TradeElement } from "../../types";
import "./TradeList.css";
import { FaRegTrashAlt, FaExchangeAlt, FaPencilAlt } from "react-icons/fa";
import Dialogue from "../Layout/Dialogue";
import { evaluateTrade, getTradeValueColor } from "../../Util/TradeEvalUtil";

const ROUND_SUFFIXES = ["st", "nd", "rd"];

const DraftPickText = ({ pick }: { pick: DraftPick }) => {
  const roundSuffix = pick.round > 3 ? "th" : ROUND_SUFFIXES[pick.round - 1];
  return (
    <>
      <h5>
        {pick.draftYear} {pick.round}
        {roundSuffix}-Round Pick
        {pick.protected && (
          <span style={{ fontSize: "0.75rem" }}>
            {" "}
            (Top-{pick.topProtected} Protected)
          </span>
        )}
      </h5>
      {pick.altPick && (
        <div className="alt-pick lato">
          <p>alt:</p> <DraftPickText pick={pick.altPick} />
        </div>
      )}
    </>
  );
};

const ExchangedTradeElements = ({
  direction,
  elements,
}: {
  direction: "In" | "Out";
  elements: TradeElement[];
}) => {
  return (
    <div
      style={{ backgroundColor: direction === "In" ? "#B1FFA9" : "#FFBABA" }}
    >
      <h4>{direction === "In" ? "Receive" : "Give"}:</h4>
      {elements.map((t, index) => (
        <DraftPickText pick={t} key={index} />
      ))}
    </div>
  );
};

const TradeListElement = ({
  trade,
  editTrade,
}: {
  trade: Trade;
  editTrade: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogueActivated, setDialogueActivated] = useState<boolean>(false);
  const tradeEvalutations = evaluateTrade(trade);

  const handleDeleteTrade = (confirmedDelete: boolean) => {
    try {
      if (confirmedDelete) {
        // TODO: delete trade from db
        console.log("deleting trade" + trade.id);
      }

      setDialogueActivated(false);
    } catch (error) {
      console.error(`Error while deleting trade: ${error}`);
    }
  };

  return (
    <div className="trade-list-element-container lato">
      <div className="trade-title-container">
        <h2 className="trade-title">{trade.name}</h2>
        <div className="element-buttons-container">
          <FaPencilAlt className="edit-icon" onClick={editTrade} />
          <FaRegTrashAlt
            className="delete-icon"
            onClick={() => setDialogueActivated(true)}
          />
          <img
            style={
              isOpen
                ? { transform: "rotateZ(180deg)" }
                : { transform: "rotateZ(0deg)" }
            }
            className="expand-button"
            height={16}
            src="arrow.svg"
            onClick={() => setIsOpen((o) => !o)}
          />
        </div>
      </div>

      {isOpen && (
        <div className="trade-details-container">
          {trade.teams.map((team, index) => {
            const outTrade = trade.elements.filter((e) => e.provider === team);
            const inTrade = trade.elements.filter((e) => e.recipient === team);

            return (
              <div key={index} className="trade-team-details-container">
                <h3>{team}</h3>
                <div className="team-trade-details">
                  <ExchangedTradeElements direction="Out" elements={outTrade} />
                  <FaExchangeAlt style={{ alignSelf: "center" }} />
                  <ExchangedTradeElements direction="In" elements={inTrade} />
                </div>
                <div
                  className="evaluation-container"
                  style={{
                    backgroundColor: getTradeValueColor(
                      tradeEvalutations[team].value
                    ),
                  }}
                >
                  {tradeEvalutations[team].analysis}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {dialogueActivated && (
        <Dialogue
          text="Are you sure you want to delete this trade?"
          callback={handleDeleteTrade}
        />
      )}
    </div>
  );
};

export default TradeListElement;
