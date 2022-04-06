import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/:coinId`} element={<Coin />}>
          <Route path={`${process.env.PUBLIC_URL}/price`} element={<Price />} />
          <Route path={`${process.env.PUBLIC_URL}/chart`} element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
