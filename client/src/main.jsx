import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Config from "./pages/Config";
import Stats from "./pages/Stats";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/config" element={<Config />} />
          <Route path="/stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

root.render(<App />);
export default App;
