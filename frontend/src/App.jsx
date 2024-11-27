import "./App.css";
import ImagifyState from "./context/ImagifyState";
import ImageGeneration from "./pages/ImageGeneration";
import BuyCredits from "./pages/BuyCredits";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <ImagifyState>
          <div className="bg-gradient-to-b from-[#F2FFF9] to-[#FFF6F1]">
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route
                exact
                path="/imageGeneration"
                element={<ImageGeneration />}
              />
              <Route exact path="/buy" element={<BuyCredits />} />
            </Routes>
          </div>
        </ImagifyState>
      </Router>
    </>
  );
}

export default App;
