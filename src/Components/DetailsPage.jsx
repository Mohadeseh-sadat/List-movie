import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "flowbite-react";


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
        setMovie(data.data || data);
      } catch (error) {
        console.error("خطا در دریافت فیلم:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-center text-white mt-6">در حال بارگذاری...</p>;
  if (!movie) return <p className="text-center text-white mt-6">فیلم پیدا نشد!</p>;

  return (
    <div className="relativ h-full gap-6 p-6">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-[1200px] h-[480px] mt-8 m-auto rounded-[40px] shadow-lg"
      />
      <div className="absolute w-[560px] h-[144px] bg-gray-800/80 backdrop-blur-sm rounded-3xl from-black/80 bottom-1/30 left-1/6 mb-[70px]">
      <h1 className="mt-[36px] ml-10 text-white font-Poppins text-[32px] text-3xl font-bold">{movie.title}</h1></div>
      
      
        <div className="flex flex-row gap-10 ">
          <img  className="w-[480px] h-[720px] ml-[200px] mt-28 rounded-3xl"src={movie.poster} alt="" /> 
         <div className="mt-28 gap-10" vertical>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Part of the journey is the end.
            </h3>
            <p className="mt-2 text-gray-300">{movie.description}</p>
            <p className="mt-2 text-white">سال ساخت: {movie.year}</p>
            <p className="text-white">امتیاز: {movie.rating}</p>
            <p className="text-white">ژانرها: {movie.genres?.join(" / ")}</p>
         </div>
        </div>
      </div>
  
  );
}