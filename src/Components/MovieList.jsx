import axios from "axios";
import { useState, useEffect } from "react";
export default function MovieList() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get("https://moviesapi.codingfront.dev/api/v1/movies?page=1");
                const movieData = response.data.data;
                setMovies(movieData);
            }
            catch (error) {
                console.error("خطا در دریافت داده ها:", error);
            }
            finally {
                console.log("درخواست تمام شد");
            }
        };
        fetchMovie();
    }, []);
    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-[616px] m-[120px] justify-items-center px-6">
            {movies.map(movie => (
                <div key={movie.id} className="bg-[#20283ECC] rounded-xl p-2">
                <img src={movie.poster} alt={movie.title} className=" w-[282px] h-[480px] rounded-xl"/>
                <h2 className="text-[#EBEEF5] text-sm font-HORIZONTAL font-bold mt-4 mb-4">{movie.title}</h2>
                <p>{movies.genres?.join(", ")}</p>
            </div>))}
        </div>
    );
};

