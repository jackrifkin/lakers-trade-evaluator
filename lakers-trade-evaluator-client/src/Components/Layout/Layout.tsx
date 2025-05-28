import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <div className="header">
        <div className="header-title lato">
          <img src="lakers.png" height={50} style={{ marginRight: "16px" }} />
          <h1>Draft Pick Trade Evaluator</h1>
        </div>
        <button className="new-trade-button lato">New Trade</button>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
