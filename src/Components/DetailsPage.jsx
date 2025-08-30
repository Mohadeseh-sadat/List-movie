import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="flex flex-col gap-6 p-6">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-[1200px] h-[480px] mt-8 m-auto rounded-lg shadow-lg"
      />
      <h1 className=" text-gray-300 text-3xl font-bold mt-6">{movie.title}</h1>
      <p className="mt-2 text-gray-300">{movie.description}</p>
      <p className="mt-2">سال ساخت: {movie.year}</p>
      <p>امتیاز: {movie.rating}</p>
      <p>ژانرها: {movie.genres?.join(" / ")}</p>
    </div>
  );
}