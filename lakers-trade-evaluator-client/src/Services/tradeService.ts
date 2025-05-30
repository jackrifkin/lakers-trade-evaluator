/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { DraftPick, Trade } from "../types";

const API_URL = `${import.meta.env.VITE_SERVER_URL}/trade`;

/**
 * Function for transforming the json representation of trades as returned by the API
 * into Trade objects supported by the client
 */
const transformTradeJSON = (jsonTrade: any): Trade => {
  const transformDraftPickJSON = (jsonPick: any): DraftPick => {
    return {
      draftYear: jsonPick.draftYear,
      round: jsonPick.round,
      protected: jsonPick.protected,
      topProtected: jsonPick.topProtected,
      altPick: jsonPick.altPick
        ? transformDraftPickJSON(jsonPick.altPick)
        : undefined,
    };
  };

  return {
    id: jsonTrade._id,
    name: jsonTrade.name,
    teams: jsonTrade.teams,
    elements: jsonTrade.elements.map((el: any) => ({
      provider: el.provider,
      recipient: el.recipient,
      ...transformDraftPickJSON(el.draftPick),
    })),
  };
};

/**
 * fetches a trade from the DB by ID
 */
const getTradeById = async (tid: string): Promise<Trade> => {
  const res = await axios.get(`${API_URL}/getTradeById/${tid}`);

  if (res.status !== 200) {
    console.error(`Error while fetching trade by ID.`);
  }

  return transformTradeJSON(res.data);
};

/**
 * Fetches all saved trades from the DB
 */
const getSavedTrades = async (): Promise<Trade[]> => {
  const res = await axios.get(`${API_URL}/getTrades`);

  if (res.status !== 200) {
    console.error(`Error while fetching trade by ID`);
  }

  return res.data.map(transformTradeJSON);
};

/**
 * Saves a new trade to the db
 */
const saveTrade = async (trade: Trade): Promise<Trade> => {
  const res = await axios.post(`${API_URL}/saveTrade`, trade);

  if (res.status !== 201) {
    throw new Error(res.data);
  }

  return transformTradeJSON(res.data);
};

/**
 * Deletes the trade from the db with the given ID
 */
const deleteTradeById = async (tradeId: string): Promise<void> => {
  const res = await axios.delete(`${API_URL}/deleteTradeById/${tradeId}`);

  if (res.status !== 200) {
    throw new Error(res.data);
  }
};

/**
 * Updates an existing trade in the db by its id
 */
const updateTradeById = async (trade: Trade): Promise<Trade> => {
  if (!trade.id) {
    throw new Error("No ID provided for updating trade");
  }
  const res = await axios.put(`${API_URL}/updateTrade/${trade.id}`, trade);

  if (res.status !== 200) {
    throw new Error(res.data);
  }

  return transformTradeJSON(res.data);
};

export {
  getTradeById,
  getSavedTrades,
  saveTrade,
  deleteTradeById,
  updateTradeById,
};
