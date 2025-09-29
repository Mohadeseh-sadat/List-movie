import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Error from "../assets/Error.svg"

export default function DetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(
          `https://moviesapi.codingfront.dev/api/v1/movies/${id}`
        );
        setMovie(data);
      } catch (error) {
        console.error("خطا در دریافت فیلم:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-center text-white mt-6">در حال بارگذاری...</p>;
  if (!movie) return (
    <div className="text-center">
  <img className="mt-8 mx-auto" src={Error} alt="" />
   <h1 className="text-center text-gray-50 font-semibold mt-6 text-5xl font-poppins">Lost your way?</h1>
   <p className="text-gray-300 text-base font-poppins font-normal mt-4 ">Oops! This is awkward. You are looking for something that doesn't<br></br> actually exist.</p>
   <button className="w-[139px] h-[56px] bg-[#7B6EF6] rounded-xl mt-4 ">Go Home</button>
   </div>
  );

  return (
    <div className="relative text-white min-h-screen p-6">
  
      {movie.images?.[0] && (
        <div
          className="w-[1200px] h-[480px] m-auto bg-cover bg-center rounded-3xl shadow-lg mb-10"
          style={{ backgroundImage: `url(${movie.images[0]})` }}
        ></div>
      )}

      <h1 className="text-4xl font-bold text-center mb-10">{movie.title}</h1>

      <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-[300px] h-[480px] rounded-2xl shadow-lg"
        />
        <div className="max-w-xl space-y-8 text-lg font-poppins">
          <p className="text-2xl font-bold text-[#EBEEF5]">Part of the journey is the end.</p>
          <p className="">{movie.plot}</p>
          <p><img src="./assets/star.svg" alt="" />
            {movie.imdb_rating}</p>
          <p>Type :{movie.type}</p>
          <p>Release Date: {movie.released}</p>
          <p>Run time{movie.runtime}</p>
          <p>Genres:{movie.genres?.join(" / ")}</p>
        </div>
      </div>
    </div>
  );
}