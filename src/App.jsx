import MovieList from "./Components/MovieList"
import Image from "./assets/Background.png"
import Navbar from "./Components/Navbar";
function App() {
  return (
    <div className="min-h-screen bg-[#20283E] bg-cover bg-center " style={{ backgroundImage: `url(${Image})` }}>
    <Navbar/>
    <MovieList/>
  </div>
  );
}

export default App;
