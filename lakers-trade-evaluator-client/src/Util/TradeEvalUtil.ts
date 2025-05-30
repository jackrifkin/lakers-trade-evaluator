import type { Trade, DraftPick } from "../types";

const pickValueMap: { [pickNumber: number]: number } = {
  1: 100.0,
  2: 77.5,
  3: 66.75,
  4: 60.25,
  5: 56.0,
  6: 52.75,
  7: 50.0,
  8: 47.75,
  9: 45.75,
  10: 43.0,
  11: 40.0,
  12: 37.5,
  13: 35.0,
  14: 33.0,
  15: 31.0,
  16: 29.5,
  17: 28.25,
  18: 27.0,
  19: 25.75,
  20: 24.5,
  21: 23.0,
  22: 21.5,
  23: 20.0,
  24: 18.75,
  25: 17.5,
  26: 16.5,
  27: 15.5,
  28: 14.25,
  29: 13.0,
  30: 11.75,
  31: 9.0,
  32: 8.75,
  33: 8.25,
  34: 8.0,
  35: 7.5,
  36: 7.25,
  37: 7.0,
  38: 6.75,
  39: 6.25,
  40: 6.0,
  41: 5.75,
  42: 5.5,
  43: 5.25,
  44: 5.0,
  45: 4.75,
  46: 4.5,
  47: 4.25,
  48: 4.0,
  49: 3.75,
  50: 3.5,
  51: 3.25,
  52: 3.0,
  53: 2.75,
  54: 2.5,
  55: 2.25,
  56: 2.25,
  57: 2.0,
  58: 1.75,
  59: 1.5,
  60: 1.25,
};

const DRAFT_YEAR_VALUE_FACTOR = 0.8;

/**
 * This function determines the value of a pick, by determining the average
 * value of all possible picks from that round.
 *
 * If the pick is protected, then the value of the alternative picks that
 * would substitute it if the protection is conveyed is added to this pick's value.
 *
 * @param pick - The pick being evaluated
 */
const getAveragePickValue = (pick: DraftPick): number => {
  let value = 0;

  if (pick.protected && pick.topProtected) {
    // sum all of the values of the picks that this pick could be
    // (all picks in this round that aren't protected)
    for (let i = pick.topProtected; i < (pick.round === 1 ? 30 : 60); i++) {
      value += pickValueMap[i + 1];
    }

    // divide by total number of picks to get average value
    const numPicks = (pick.round === 1 ? 60 : 30) - pick.topProtected;
    value = value / numPicks;

    // add the value of the alternative pick multiplied by the probability of this pick's
    // protection being conveyed
    if (pick.altPick) {
      const probConveying =
        (pick.round === 1 ? pick.topProtected : pick.topProtected - 30) / 30;
      value += getAveragePickValue(pick.altPick) * probConveying;
    }
  } else {
    // compute the average value of all picks in this pick's round
    for (let i = 0; i < 30; i++) {
      value += pickValueMap[pick.round === 1 ? i + 1 : i + 31];
    }
    value = value / 30;
  }

  // multiply this pick's value by the draft year value factor for each year in the future
  value *=
    DRAFT_YEAR_VALUE_FACTOR ^ (pick.draftYear - new Date().getFullYear());

  return Math.round(value * 100) / 100;
};

/**
 * Util function for evaluating the fairness of a trade involving draft picks
 */
export const evaluateTrade = (
  trade: Trade
): { [key: string]: { analysis: string; value: number } } => {
  const evaluationMap: {
    [key: string]: { analysis: string; value: number };
  } = {};

  // determines the value of each trade element (draft pick)
  for (const element of trade.elements) {
    const pick = element as DraftPick;
    const value = getAveragePickValue(pick);

    if (!evaluationMap[element.provider]) {
      evaluationMap[element.provider] = { analysis: "", value: 0 };
    }
    if (!evaluationMap[element.recipient]) {
      evaluationMap[element.recipient] = { analysis: "", value: 0 };
    }

    evaluationMap[element.provider].value -= value;
    evaluationMap[element.recipient].value += value;
  }

  for (const team in evaluationMap) {
    const { value } = evaluationMap[team];
    let summary = "";

    if (value > 20) {
      summary = `The ${team} are receiving more estimated value than they have given from this trade 
      with a net value of ${value}, so it is likely unbalanced.`;
    } else if (value < -20) {
      summary = `The ${team} are giving more estimated value than they have received from this trade
      with a net value of ${value}, so it is likely unbalanced.`;
    } else if (Math.abs(value) < 10) {
      summary = `The ${team} made a pretty balanced trade with a net value of ${value}.`;
    } else {
      summary = `The ${team} made a somewhat balanced trade with a net value of ${value}.`;
    }

    evaluationMap[team] = {
      analysis: summary,
      value: value,
    };
  }

  return evaluationMap;
};

export const getTradeValueColor = (value: number): string => {
  const absVal = Math.abs(value);

  if (absVal <= 20) {
    const ratio = absVal / 20;
    const r = Math.round(0 + ratio * 255);
    const g = 255;
    return `rgb(${r}, ${g}, 0)`;
  } else if (absVal <= 50) {
    const ratio = (absVal - 20) / 20;
    const r = 255;
    const g = Math.round(255 - ratio * 255);
    return `rgb(${r}, ${g}, 0)`;
  } else {
    return `rgb(255, 0, 0)`;
  }
};
