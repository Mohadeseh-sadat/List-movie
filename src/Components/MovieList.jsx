import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import MovieGenres from "./MovieGenres";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();
  const { query } = useParams();

  const fetchMovie = async () => {
    if (page > 25) return;
    setIsFetching(true);
    try {
      const base = "https://moviesapi.codingfront.dev/api/v1/movies";
      const url = location.pathname.startsWith("/search")
        ? `${base}?q=${query}&page=${page}`
        : `${base}?page=${page}`;
      const { data } = await axios.get(url);
      setMovies(prev => (page === 1 ? data.data : [...prev, ...data.data]));
    } catch (err) {
      console.error("خطا در دریافت داده‌ها:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    fetchMovie();
  }, [page, query]);

  const handleScroll = () => {
    if (
      !isFetching &&
      window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
    ) {
      setPage(prev => (prev < 25 ? prev + 1 : prev));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div>
      <div className="flex flex-col gap-4 mb-8 container mx-auto px-6 ml-[120px] w-[588px] h-[144px] ">
        <h1 className="text-6xl font-Poppins font-semibold text-gray-50 mt-16">
          MaileHereko
        </h1>
        <p className="font-Poppins text-gray-300 text-base ">
            List of movies and TV Shows, I, Pramod Poudel have watched till date. Explore what I have watched and also feel free to make a suggestion. 😉        </p>
      </div>
      <SearchBar onResults={setMovies} />
      <MovieGenres/>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-[10px] m-8 ml-[110px] justify-items-center px-4">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id || movie.id}>
            <div className="bg-[#323B54] rounded-xl p-2">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-[282px] h-[480px] object-cover rounded-xl"
              />
              <h2 className="text-[#EBEEF5] text-sm font-Poppins font-bold mt-4 mb-4">
                {movie.title}
              </h2>
              <p>{movie.genres?.join(" / ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}