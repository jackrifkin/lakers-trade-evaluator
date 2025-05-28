/**
 * Represents a draft pick involved in a trade.
 *
 * @param recipient - The name of the team receiving the draft pick.
 * @param draftYear - The draft year this pick is from.
 * @param round - The round of the draft this pick is.
 * @param protected - Whether or not the pick is protected.
 * @param topProtected - The maximum pick number in the draft where this pick's protection is utilized (ex: 5 means this pick is protected for the top 5 picks)
 */
type DraftPick = {
  draftYear: number;
  round: 1 | 2;
  protected: boolean;
  topProtected?: number;
  altPick?: DraftPick;
};

type BaseTradeElement = {
  provider: string;
  recipient: string;
};

/**
 * Represents an element of a trade
 */
export type TradeElement = BaseTradeElement & DraftPick;
// TODO: implement trades including players and/or cash:
// export type TradeElement =
//   | (BaseTradeElement & DraftPick)
//   | (BaseTradeElement & Player)
//   | (BaseTradeElement & Cash);

export type Trade = { name: string; elements: TradeElement[] };
