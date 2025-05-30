/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { DraftPick, Trade } from "../types";

const API_URL = `${import.meta.env.VITE_SERVER_URL}/trade`;

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

const getTradeById = async (tid: string): Promise<Trade> => {
  const res = await axios.get(`${API_URL}/getTradeById/${tid}`);

  if (res.status !== 200) {
    console.error(`Error while fetching trade by ID.`);
  }

  return transformTradeJSON(res.data);
};

const getSavedTrades = async (): Promise<Trade[]> => {
  const res = await axios.get(`${API_URL}/getTrades`);

  if (res.status !== 200) {
    console.error(`Error while fetching trade by ID`);
  }

  return res.data.map(transformTradeJSON);
};

const saveTrade = async (trade: Trade): Promise<Trade> => {
  const res = await axios.post(`${API_URL}/saveTrade`, trade);

  if (res.status !== 201) {
    throw new Error(res.data);
  }

  return transformTradeJSON(res.data);
};

const deleteTradeById = async (tradeId: string): Promise<void> => {
  const res = await axios.delete(`${API_URL}/deleteTradeById/${tradeId}`);

  if (res.status !== 200) {
    throw new Error(res.data);
  }
};

export { getTradeById, getSavedTrades, saveTrade, deleteTradeById };
