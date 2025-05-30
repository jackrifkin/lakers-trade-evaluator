import mongoose, { Schema, Model } from "mongoose";
import { TradeElement } from "../types";

const tradeElementSchema: Schema = new Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    draftPick: {
      type: Schema.Types.ObjectId,
      ref: "DraftPick",
    },
  },
  { collection: "TradeElement" }
);

const TradeElementModel: Model<TradeElement> = mongoose.model<TradeElement>(
  "TradeElement",
  tradeElementSchema
);

export default TradeElementModel;
