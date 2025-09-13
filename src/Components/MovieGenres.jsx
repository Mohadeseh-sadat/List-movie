import axios from "axios";
import { useEffect, useState } from "react";

export default function MovieGenres() {
    const [genresList, setGenresList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loding, setLoding] = useState(false);

    useEffect(() => {
        async function fetchGenres() {
            try {
                const { data } = await axios.get("https://moviesapi.codingfront.dev/api/v1/movies");
                const allGenres = data.data.flatMap(movie => movie.genres || []);
                const uniqueGenres = [...new Set(allGenres)];
                setGenresList(uniqueGenres);
            } catch (error) {
                console.error("خطا در گرفتن ژانرها:", error);
            }
        }
    fetchGenres();
    }, []);

    useEffect(() => {
        async function fetchByGenre() {
            if (!selectedGenre) return;
            setLoding(true);
            try {
                const { data } = await axios.get(`https://moviesapi.codingfront.dev/api/v1/genres/${selectedGenre}/movies?page=1`);
                setMovies(data.data);
            } catch (error) {
                 console.error("خطا در گرفتن ژانر:", error);
            } finally {
                setLoding(false);
            }
        }
        fetchByGenre();
    }, [selectedGenre]);


  return (
    <div className="w-auto h-auto flex flex-col gap-6 mt-8 bg-[#00000033] rounded-[8px] ">
      <div className="flex justify-center gap-2 ">
        {genresList.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 mx-auto rounded-[8px] text-base font-semibold
              ${selectedGenre === genre
                ? "bg-purple-600 text-white text-2xl shadow-md"
                : "text-gray-300 hover:bg-[#7B6EF6]"}`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="text-white text-lg ">
        <span className="font-poppins">{selectedGenre}</span>
      </div>

      {loding ? (
        <p className="text-gray-400">در حال بارگذاری فیلم‌ها...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-[#323B54] rounded-xl p-2">
              <img src={movie.poster} alt={movie.title} className="h-[480px] object-cover rounded-xl" />
              <h3 className="text-[#EBEEF5] mt-2 text-[16px] font-bold font-poppins">{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


        