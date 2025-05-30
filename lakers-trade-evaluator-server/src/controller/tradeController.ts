import express, { Request, Response } from "express";
import { Trade } from "../types";
import TradeModel from "../model/trade";

interface TradeRequest extends Request {
  params: {
    tid: string;
  };
}

const tradeController = () => {
  const router = express.Router();

  const getTradeById = async (
    req: TradeRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { tid } = req.params;
      const trade = await TradeModel.findById(tid);

      if (!trade) {
        res.status(404).send("Could not find trade with the given id");
      }

      res.status(200).json(trade);
    } catch (error) {
      res.status(500).send("Error while fetching trade by id");
    }
  };

  const getTrades = async (req: Request, res: Response): Promise<void> => {
    try {
      const trades = await TradeModel.find();

      if (trades.length === 0) {
        res.status(404).send("No trades found");
      }

      res.status(200).json(trades);
    } catch (error) {
      res.status(500).send("Error while fetching all trades");
    }
  };

  const transformDraftPick = (pick: any): any => {
    if (!pick) return undefined;

    const {
      draftYear,
      round,
      protected: isProtected,
      topProtected,
      altPick,
    } = pick;

    return {
      draftYear,
      round,
      protected: isProtected,
      topProtected,
      altPick: altPick ? transformDraftPick(altPick) : undefined,
    };
  };

  const saveTrade = async (req: Request, res: Response): Promise<void> => {
    try {
      const tradeData = req.body as Trade;

      const transformedTradeElements = tradeData.elements.map((element) => ({
        provider: element.provider,
        recipient: element.recipient,
        draftPick: transformDraftPick({
          draftYear: element.draftYear,
          round: element.round,
          protected: element.protected,
          topProtected: element.topProtected,
          altPick: element.altPick,
        }),
      }));

      const trade = new TradeModel({
        name: tradeData.name,
        teams: tradeData.teams,
        elements: transformedTradeElements,
      });

      const savedTrade = await trade.save();
      res.status(201).json(savedTrade);
    } catch (error) {
      res.status(500).json({ message: "Error while saving trade" });
    }
  };

  const deleteTradeById = async (
    req: TradeRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { tid } = req.params;
      await TradeModel.findByIdAndDelete(tid);

      res.status(200).send("Successfully deleted trade");
    } catch (error) {
      res.status(500).send("Error while deleting trade");
    }
  };

  router.get("/getTradeById/:tid", getTradeById);
  router.get("/getTrades", getTrades);
  router.post("/saveTrade", saveTrade);
  router.delete("/deleteTradeById/:tid", deleteTradeById);

  return router;
};

export default tradeController;
