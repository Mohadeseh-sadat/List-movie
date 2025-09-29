import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Error from "../assets/Error.svg"
import Star from "../assets/star.svg"

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
    
  <div className="relative"> 
      {movie.images?.[0] && (
        <div
          className="w-[1200px] h-[480px] m-auto bg-cover bg-center rounded-3xl shadow-lg"
          style={{ backgroundImage: `url(${movie.images[0]})` }}
        ></div>
      )}
    <div className=" absolute top-[405px] left-[200px] p-[40px] w-[560px] h-[144px] rounded-3xl bg-[#20283ECC]/80 backdrop-blur-[24px] ">
      <h1 className="text-[32px] text-[#EBEEF5] font-semibold text-center mb-10">{movie.title}</h1>
    </div>

      <div className=" flex flex-col lg:flex-row gap-10 mt-40 justify-center items-start space-x-10">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-[480px] h-[720px] rounded-2xl shadow-lg"
        />
        
        <div className="max-w-xl space-y-8 text-lg font-poppins">
          <p className="text-2xl font-bold text-[#EBEEF5]">Part of the journey is the end.</p>
          <p className="font-normal text-xl font-poppins text-[#8E95A9] w-[480px] mt-12">{movie.plot}</p>
          <div className=" flex item-center justify-center space-x-1 w-[59px] h-[32px] bg-[#000000A6] rounded-lg mt-10">
          <img className="w-[16px] h-[16px] text-[#FFAD49] mt-2" src={Star} alt="" />
          <p className="text-[#FFAD49] text-base font-poppins font-normal mt-1">{movie.imdb_rating}</p>
        </div>
        <div className="mt-12">
          <p className="font-poppins text-base text-[#767E94]">Type</p>
          <p className="font-poppins text-xl text-[#C3C8D4]">{movie.type}</p>
        </div>
        <div className="mt-12">
          <p className="font-poppins text-base text-[#767E94]">Release Date:</p> 
          <p className="font-poppins text-xl text-[#C3C8D4]">{movie.released}</p>
        </div>
        <div className="mt-12">
          <p className="font-poppins text-base text-[#767E94]">Run time</p>
          <p className="font-poppins text-xl text-[#C3C8D4]">{movie.runtime}</p>
        </div>
        <div className="mt-12">
          <p className="font-poppins text-base text-[#767E94]">Genres:</p>
          <p className="font-poppins text-xl text-[#C3C8D4]">{movie.genres?.join(" / ")}</p>
        </div>
        </div>
      </div>
  </div>
  );
}