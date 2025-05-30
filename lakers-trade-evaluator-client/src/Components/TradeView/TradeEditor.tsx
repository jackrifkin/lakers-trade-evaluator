import { useEffect, useState } from "react";
import type { DraftPick, Trade, TradeElement } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_SAVED_TRADE_DATA } from "../../mock_data";
import "./TradeView.css";
import { IoClose } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import Dialogue from "../Layout/Dialogue";

const emptyPick: DraftPick = {
  draftYear: new Date().getFullYear(),
  round: 1,
  protected: false,
};

const TradeEditor = () => {
  const { tradeId } = useParams();
  const [trade, setTrade] = useState<Trade>({
    name: "",
    teams: [],
    elements: [],
  });
  const [isAddingTeam, setIsAddingTeam] = useState<boolean>(false);
  const [newTeamName, setNewTeamName] = useState<string>("");
  const [dialogueActivated, setDialogueActivated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: fetch trade by id
    const initialTrade = tradeId ? MOCK_SAVED_TRADE_DATA[0] : undefined;

    if (initialTrade) {
      setTrade(initialTrade);
    }
  }, [tradeId]);

  const handleAddTeam = () => {
    if (newTeamName) {
      setTrade((prev) => ({ ...prev, teams: [...prev.teams, newTeamName] }));
      setNewTeamName("");
      setIsAddingTeam(false);
    }
  };

  const handleRemoveTeam = (team: string) => {
    setTrade((prev) => ({
      ...prev,
      teams: prev.teams.filter((t) => t !== team),
    }));
  };

  const handleRemoveNewTeamInput = () => {
    setIsAddingTeam(false);
    setNewTeamName("");
  };

  const handleCancelEdit = (confirmedCancel: boolean) => {
    if (confirmedCancel) {
      navigate("/");
    } else {
      setDialogueActivated(false);
    }
  };

  const handleAddElement = () => {
    if (trade.teams.length < 2) {
      alert("Add at least two teams to create a trade element.");
      return;
    }
    const newElement: TradeElement = {
      provider: trade.teams[0],
      recipient: trade.teams[1],
      ...emptyPick,
    };
    setTrade((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));
  };

  const handleChangeElement = (index: number, updated: TradeElement) => {
    const newElements = [...trade.elements];
    newElements[index] = updated;
    setTrade((prev) => ({ ...prev, elements: newElements }));
  };

  const handleRemoveElement = (i: number) => {
    setTrade((prev) => ({
      ...prev,
      elements: trade.elements.filter((_, index) => index !== i),
    }));
  };

  const handleSaveTrade = () => {
    console.log("saving trade...");
  };

  const renderDraftPickEditor = (
    pick: DraftPick,
    onChange: (updatedPick: DraftPick) => void,
    level: number
  ) => {
    const rgb = 85 - (level + 1) * 10;
    return (
      <div
        className="pick-editor"
        style={{ backgroundColor: `rgb(${rgb}, ${rgb}, ${rgb})` }}
      >
        {level > 0 && <h4 className="alt-pick-label">Alt Pick:</h4>}
        <label>
          Draft Year:
          <input
            type="number"
            value={pick.draftYear}
            min={new Date().getFullYear()}
            max={new Date().getFullYear() + 7}
            onChange={(e) =>
              onChange({ ...pick, draftYear: parseInt(e.target.value) })
            }
          />
        </label>

        <label>
          Round:
          <select
            value={pick.round}
            onChange={(e) =>
              onChange({ ...pick, round: +e.target.value as 1 | 2 })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </label>

        <label>
          Protected:
          <input
            type="checkbox"
            checked={pick.protected}
            onChange={(e) =>
              onChange({
                ...pick,
                protected: e.target.checked,
                topProtected: e.target.checked ? 5 : undefined,
              })
            }
          />
        </label>

        {pick.protected && (
          <label>
            Top Protected:
            <input
              type="number"
              value={pick.topProtected ?? ""}
              min={pick.round === 1 ? 1 : 31}
              max={pick.round === 1 ? 30 : 60}
              onChange={(e) =>
                onChange({
                  ...pick,
                  topProtected: +e.target.value,
                })
              }
            />
          </label>
        )}

        {pick.protected && (
          <div className="alt-pick-container">
            {pick.altPick ? (
              <IoClose
                className="delete-alt-pick-button"
                onClick={() => onChange({ ...pick, altPick: undefined })}
              />
            ) : (
              <button
                type="button"
                className="add-alt-pick-button"
                onClick={() =>
                  onChange({
                    ...pick,
                    altPick: emptyPick,
                  })
                }
              >
                Add Alt Pick
              </button>
            )}
            {pick.altPick &&
              renderDraftPickEditor(
                pick.altPick,
                (updatedAlt) => onChange({ ...pick, altPick: updatedAlt }),
                level + 1
              )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="edit-form-container lato">
      <FaArrowLeftLong
        className="back-arrow"
        onClick={() => setDialogueActivated(true)}
      />
      <h2>{tradeId ? "Edit" : "New"} Trade</h2>

      <input
        type="text"
        value={trade.name}
        className="trade-name-input"
        onChange={(e) => setTrade({ ...trade, name: e.target.value })}
      />

      <h3>Teams</h3>
      <ul className="team-list">
        {trade.teams.map((team) => (
          <li key={team}>
            <IoClose
              className="remove-team-button"
              onClick={() => handleRemoveTeam(team)}
            />
            <h3 style={{ display: "inline" }}>{team}</h3>
          </li>
        ))}
        {isAddingTeam && (
          <li>
            <IoClose
              className="remove-team-button"
              onClick={handleRemoveNewTeamInput}
            />
            <input
              type="text"
              value={newTeamName}
              className="new-team-input"
              onChange={(e) => setNewTeamName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTeam();
                }
              }}
            />
            <button className="confirm-team-button" onClick={handleAddTeam}>
              <FaCheck />
            </button>
          </li>
        )}
      </ul>
      <button
        className="add-team-button"
        type="button"
        onClick={() => setIsAddingTeam(true)}
      >
        <FaPlus style={{ color: "white" }} />
      </button>

      <h3>Trade Components</h3>
      {trade.elements.map((element, i) => (
        <div key={i} className="trade-component-container">
          <div>
            <label>
              Provider:
              <select
                value={element.provider}
                onChange={(e) =>
                  handleChangeElement(i, {
                    ...element,
                    provider: e.target.value,
                  })
                }
              >
                {trade.teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Recipient:
              <select
                value={element.recipient}
                onChange={(e) =>
                  handleChangeElement(i, {
                    ...element,
                    recipient: e.target.value,
                  })
                }
              >
                {trade.teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </label>

            {renderDraftPickEditor(
              element,
              (updatedPick) =>
                handleChangeElement(i, {
                  provider: element.provider,
                  recipient: element.recipient,
                  ...updatedPick,
                }),
              0
            )}
          </div>
          <IoClose
            className="delete-component-button"
            onClick={() => handleRemoveElement(i)}
          />
        </div>
      ))}

      <button
        className="add-element-button"
        type="button"
        onClick={handleAddElement}
      >
        <FaPlus />
      </button>

      <div className="submit-button-container">
        <button
          className="discard-button"
          onClick={() => setDialogueActivated(true)}
        >
          Discard Changes
        </button>
        <button className="save-button" onClick={handleSaveTrade}>
          Save Changes
        </button>
      </div>

      {dialogueActivated && (
        <Dialogue
          text="Are you sure you want to discard your current changes?"
          callback={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default TradeEditor;
