import axios from "axios";
import type { Trade } from "../types";

const API_URL = `${process.env.SERVER_URL}/trade`;

const getTradeById = async (tid: string): Promise<Trade> => {
  const res = await axios.get(`${API_URL}/getTradeById/${tid}`);

  if (res.status !== 200) {
    console.error(`Error while fetching trade by ID.`);
  }

  return res.data;
};

const getAllSavedTrades = async (): Promise<Trade[]> => {
  const res = await axios.get(`${API_URL}/getTrades`);

  if (res.status !== 200) {
    console.error(`Error while fetching trade by ID.`);
  }

  return res.data;
};

export { getTradeById, getAllSavedTrades };
