import "./App.css";
import { Route, Routes } from "react-router-dom";
import TradeList from "./Components/TradeList/TradeList";
import Layout from "./Components/Layout/Layout";
import TradeEditor from "./Components/TradeEditor/TradeEditor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<TradeList />} />
        <Route path="/trade/:tradeId/edit" element={<TradeEditor />} />
        <Route path="/trade/create" element={<TradeEditor />} />
      </Route>
    </Routes>
  );
}
export default App;
