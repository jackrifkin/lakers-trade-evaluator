import "./App.css";
import { Route, Routes } from "react-router-dom";
import TradeList from "./Components/TradeList/TradeList";
import TradeView from "./Components/TradeView/TradeView";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<TradeList />} />
        <Route path="/trade/:tid" element={<TradeView />} />
      </Route>
    </Routes>
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
