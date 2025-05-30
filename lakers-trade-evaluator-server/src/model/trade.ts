import mongoose, { Schema, Model } from "mongoose";
import { TradeDocument } from "../types";

/**
 * Schema for a draft pick
 */
const draftPickSchema: Schema = new Schema(
  {
    draftYear: { type: Number, required: true },
    round: { type: Number, enum: [1, 2], required: true },
    protected: { type: Boolean, required: true },
    topProtected: { type: Number },
    altPick: {
      type: Schema.Types.Mixed,
    },
  },
  { _id: false }
);

/**
 * Schema for a trade element
 */
const tradeElementSchema: Schema = new Schema(
  {
    provider: { type: String, required: true },
    recipient: { type: String, required: true },
    draftPick: {
      type: draftPickSchema,
      required: true,
    },
  },
  { _id: false }
);

/**
 * schema for a trade
 */
const tradeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    teams: [{ type: String, required: true }],
    elements: [tradeElementSchema],
  },
  {
    collection: "Trade",
  }
);

const TradeModel: Model<TradeDocument> = mongoose.model<TradeDocument>(
  "Trade",
  tradeSchema
);

export default TradeModel;
