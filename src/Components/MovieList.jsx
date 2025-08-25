import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar"
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
        <div>
        <div className="flex flex-col gap-4 mb-8 container mx-auto px-6 ml-[120px] w-[588px] h-[144px] ">
            <h1 className="text-6xl font-Poppins font-semibold text-gray-50 mt-16">MaileHereko</h1>
            <p className="font-Poppins text-gray-300 text-base ">List of movies and TV Shows, I, Pramod Poudel have watched till date. Explore what I have watched and also feel free to make a suggestion.😉
            </p>
        </div>
        <SearchBar/>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-[100px] m-[120px] justify-items-center px-6">
            {movies.map(movie => (
                <div key={movie.id} className="bg-[#323B54] rounded-xl p-2">
                <img src={movie.poster} alt={movie.title} className=" w-[282px] h-[480px] rounded-xl"/>
                <h2 className="text-[#EBEEF5] text-sm font-Poppins font-bold mt-4 mb-4">{movie.title}</h2>
                <p>{movies.genres?.join(", ")}</p>
            </div>))}
        </div>
        </div>
        
    );
};

