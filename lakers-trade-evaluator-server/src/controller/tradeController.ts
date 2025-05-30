import express, { Request, Response } from "express";

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
    res.status(200).send("placeholder");
  };

  const getTrades = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send("got all trades");
  };

  router.get("/getTradeById/:tid", getTradeById);
  router.get("/getTrades", getTrades);

  return router;
};

export default tradeController;
