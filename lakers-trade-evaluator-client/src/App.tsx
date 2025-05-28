import { useState } from "react";
import "./App.css";
import type { Trade } from "./types";
import { TradeContext } from "./Contexts/TradeContext";
import { Route, Routes } from "react-router-dom";
import TradeDetails from "./Components/TradeDetails/TradeDetails";
import TradeList from "./Components/TradeList/TradeList";
import TradeEditor from "./Components/TradeDetails/TradeEditor";

function App() {
  const [currentTrade] = useState<Trade | undefined>(undefined);

  return (
    <TradeContext value={currentTrade}>
      <Routes>
        <Route path="/" element={<TradeList />} />
        <Route path="/trade" element={<TradeDetails />} />
        <Route path="/trade/edit" element={<TradeEditor />} />
      </Routes>
    </TradeContext>
  );
}

/**
 * TODO:
 *
 * Components:
 * - saved trades page
 *    - list of saved trades
 * - single trade page:
 *    - edit/new trade page
 *       - displays trade details in form mode
 *    - saved trade page
 *       - displays trade in view mode
 *       - button to edit trade
 *
 * API endpoints:
 * - POST /trade
 *    - creates new trade scenario
 * - PUT /trade
 *    - updates existing trade scenario
 * - DELETE /trade
 *    - deletes trade scenario
 * - GET /trade
 *    - gets all saved trade scenarios
 */

export default App;
