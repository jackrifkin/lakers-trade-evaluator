import type { Trade } from "./types";

const TRADE1: Trade = {
  id: "1",
  name: "Lakers future picks",
  teams: ["Lakers", "Pelicans"],
  elements: [
    {
      provider: "Lakers",
      recipient: "Pelicans",
      draftYear: 2026,
      round: 1,
      protected: true,
      topProtected: 5,
      altPick: {
        draftYear: 2027,
        round: 1,
        protected: false,
      },
    },
    {
      provider: "Lakers",
      recipient: "Pelicans",
      draftYear: 2027,
      round: 2,
      protected: false,
    },
    {
      provider: "Pelicans",
      recipient: "Lakers",
      draftYear: 2025,
      round: 1,
      protected: false,
    },
  ],
};

const TRADE2: Trade = {
  id: "2",
  name: "Thunder 3-team trade",
  teams: ["Thunder", "Clippers", "Rockets"],
  elements: [
    {
      provider: "Clippers",
      recipient: "Thunder",
      draftYear: 2025,
      round: 1,
      protected: true,
      topProtected: 10,
      altPick: {
        draftYear: 2026,
        round: 1,
        protected: false,
      },
    },
    {
      provider: "Thunder",
      recipient: "Rockets",
      draftYear: 2027,
      round: 2,
      protected: false,
    },
    {
      provider: "Rockets",
      recipient: "Clippers",
      draftYear: 2026,
      round: 2,
      protected: true,
      topProtected: 40,
      altPick: {
        draftYear: 2027,
        round: 2,
        protected: false,
      },
    },
  ],
};

const TRADE3: Trade = {
  id: "3",
  name: "Magic future trades w/ alts",
  teams: ["Magic", "Knicks"],
  elements: [
    {
      provider: "Magic",
      recipient: "Knicks",
      draftYear: 2026,
      round: 1,
      protected: true,
      topProtected: 3,
      altPick: {
        draftYear: 2027,
        round: 1,
        protected: true,
        topProtected: 1,
        altPick: {
          draftYear: 2028,
          round: 1,
          protected: false,
        },
      },
    },
    {
      provider: "Knicks",
      recipient: "Magic",
      draftYear: 2025,
      round: 2,
      protected: false,
    },
  ],
};

const TRADE4: Trade = {
  id: "4",
  name: "Pistons Spurs",
  teams: ["Pistons", "Spurs"],
  elements: [
    {
      provider: "Pistons",
      recipient: "Spurs",
      draftYear: 2025,
      round: 1,
      protected: true,
      topProtected: 8,
      altPick: {
        draftYear: 2026,
        round: 1,
        protected: true,
        topProtected: 3,
        altPick: {
          draftYear: 2027,
          round: 1,
          protected: false,
        },
      },
    },
    {
      provider: "Spurs",
      recipient: "Pistons",
      draftYear: 2025,
      round: 2,
      protected: false,
    },
  ],
};

export const MOCK_SAVED_TRADE_DATA: Trade[] = [TRADE1, TRADE2, TRADE3, TRADE4];
