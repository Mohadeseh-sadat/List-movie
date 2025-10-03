import axios from "axios";
import { useEffect, useState } from "react";

export default function MovieGenres({ selectedGenre, onSelectGenre }) {
  const [genresList, setGenresList] = useState([]);

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

  return (
    <div className="container mx-auto px-1  ml-[140px] mt-15 bg-[#00000033] rounded-[8px] max-w-7xl h-[56px] ">
      <div className=" max-w-5xl flex flex-wrap justify-center gap-2 p-2">
        {genresList.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelectGenre(genre)}
            className={`px-6 py-2 mx-auto rounded-[8px] text-base font-semibold
              ${selectedGenre === genre
                ? "bg-purple-600 text-white text-2xl shadow-md"
                : "text-gray-300 hover:bg-[#7B6EF6]"}`}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="text-gray-400 text-3xl mt-8 font-poppins font-bold ">
        <span className="font-poppins">{selectedGenre}</span>
      </div>
    </div>
  );
}