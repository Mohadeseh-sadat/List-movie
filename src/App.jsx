import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from "./Components/MovieList";
import Image from "./assets/Background.png";
import Navbar from "./Components/Navbar";
import DetailsPage from "./Components/DetailsPage";
import SearchBar from "./Components/SearchBar";

function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen bg-[#20283E] bg-cover bg-center"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route path="/search/:query" element={<SearchBar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
