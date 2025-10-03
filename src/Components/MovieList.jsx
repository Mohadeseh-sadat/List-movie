import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import MovieGenres from "./MovieGenres";

function SkeletonCard() {
  return (
    <div className="bg-[#121829] animate-pulse rounded-xl p-2 h-[480px] w-[282px]">
      <div className="bg-gray-700 h-[400px] w-full rounded-xl mb-4"></div>
      <div className="bg-gray-600 h-6 w-3/4 rounded mb-2"></div>
    </div>
  );
}

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();
  const { query } = useParams();

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [query, selectedGenre]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (page > 25) return;
      setIsFetching(true);
      try {
        const base = "https://moviesapi.codingfront.dev/api/v1";
        const url = selectedGenre
          ? `${base}/genres/${selectedGenre}/movies?page=${page}`
          : location.pathname.startsWith("/search")
          ? `${base}/movies?q=${query}&page=${page}`
          : `${base}/movies?page=${page}`;
        const { data } = await axios.get(url);
        setMovies(prev => (page === 1 ? data.data : [...prev, ...data.data]));
      } catch (err) {
        console.error("خطا در دریافت داده‌ها:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMovie();
  }, [page, query, selectedGenre]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isFetching &&
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        setPage(prev => (prev < 25 ? prev + 1 : prev));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  return (
    <div className="min-h-screen bg-[#00000033]">
      <div className="flex flex-col gap-4 mb-8 container mx-auto px-6 ml-[120px] w-[588px] h-[144px] ">
        <h1 className="text-6xl font-Poppins font-semibold text-gray-50 mt-16">
          MaileHereko
        </h1>
        <p className="font-Poppins text-gray-300 text-base ">
          List of movies and TV Shows, I, Pramod Poudel have watched till date. Explore what I have watched and also feel free to make a suggestion. 😉
        </p>
      </div>

      <SearchBar />
      <MovieGenres selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-[10px] m-8 ml-[130px] mt-24 justify-items-center px-4 ">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="bg-[#323B54] rounded-xl p-2">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-[300px] h-[480px] object-cover rounded-xl"
              />
              <p className="text-[#FFAD49]">{movie.imdb_rating}</p>
              <h2 className="text-[#EBEEF5] text-sm font-Poppins font-bold mt-4 mb-4 h-[48px] overflow-hidden">
                {movie.title}
              </h2>
            </div>
          </Link>
        ))}
        {isFetching && [...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}