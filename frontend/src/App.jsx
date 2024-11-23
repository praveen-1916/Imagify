import "./App.css";
import ImageGenerationState from "./context/ImageGenerationState";
import ImageGeneration from "./pages/ImageGeneration";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <ImageGenerationState>
          <div className="bg-gradient-to-b from-[#F2FFF9] to-[#FFF6F1]">
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route
                exact
                path="/imageGeneration"
                element={<ImageGeneration />}
              />
            </Routes>
          </div>
        </ImageGenerationState>
      </Router>
    </>
  );
}

export default App;
