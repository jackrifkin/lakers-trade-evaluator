import mongoose, { Schema, Model } from "mongoose";
import { DraftPick } from "../types";

const draftPickSchema: Schema = new Schema(
  {
    draftYear: {
      type: Number,
      required: true,
    },
    round: { type: Number, enum: [1, 2], required: true },
    protected: { type: Boolean, required: true },
    topProtected: { type: Number },
    altPick: { type: Schema.Types.ObjectId, ref: "DraftPick" },
  },
  { collection: "DraftPick" }
);

const DraftPickModel: Model<DraftPick> = mongoose.model<DraftPick>(
  "DraftPick",
  draftPickSchema
);

export default DraftPickModel;
