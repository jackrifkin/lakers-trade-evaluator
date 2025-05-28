import type { Trade, TradeElement } from "./types";

const TRADE1: TradeElement[] = [
  {
    provider: "Lakers",
    recipient: "Pelicans",
    draftYear: 2022,
    round: 1,
    protected: true,
    topProtected: 5,
    altPick: {
      draftYear: 2023,
      round: 1,
      protected: false,
    },
  },
  {
    provider: "Lakers",
    recipient: "Pelicans",
    draftYear: 2023,
    round: 2,
    protected: false,
  },
  {
    provider: "Pelicans",
    recipient: "Lakers",
    draftYear: 2021,
    round: 1,
    protected: false,
  },
];

const TRADE2: TradeElement[] = [
  {
    provider: "Lakers",
    recipient: "Clippers",
    draftYear: 2028,
    round: 1,
    protected: false,
  },
  {
    provider: "Clippers",
    recipient: "Warriors",
    draftYear: 2027,
    round: 2,
    protected: false,
  },
  {
    provider: "Warriors",
    recipient: "Lakers",
    draftYear: 2027,
    round: 1,
    protected: true,
    topProtected: 3,
  },
];

export const MOCK_SAVED_TRADE_DATA: Trade[] = [TRADE1, TRADE2];
