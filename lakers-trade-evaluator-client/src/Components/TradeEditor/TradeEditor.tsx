import { useParams } from "react-router-dom";
import "./TradeEditor.css";
import { IoClose } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import Dialogue from "../Layout/Dialogue";
import useTradeEditor from "../../Hooks/useTradeEditor";

/**
 * Component for the trade creation/editing form
 */
const TradeEditor = () => {
  const { tradeId } = useParams();
  const {
    trade,
    setTrade,
    isAddingTeam,
    setIsAddingTeam,
    dialogueActivated,
    setDialogueActivated,
    newTeamName,
    setNewTeamName,
    handleAddTeam,
    handleRemoveTeam,
    handleAddElement,
    handleRemoveElement,
    handleRemoveNewTeamInput,
    handleCancelEdit,
    handleChangeElement,
    handleSaveTrade,
    renderDraftPickEditor,
  } = useTradeEditor(tradeId);

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
