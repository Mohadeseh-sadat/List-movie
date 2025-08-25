import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar"
export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoding] = useState(false);
    const[hasMore] = useState(true);
    const MAX_PAGES = 25
   
        const fetchMovie = async (pageNumber) => {
            if (loading) return;
            setLoding(true);
            try {
                const response = await axios.get("https://moviesapi.codingfront.dev/api/v1/movies?page={pageNumber}");
                 setMovies((prev) => [...prev, ...response.data.data]);
                if (pageNumber >= MAX_PAGES) {
                setPage(1);
                } else {
                 setPage(pageNumber + 1)
                }               
            }
            catch (error) {
                console.error("خطا در دریافت داده ها:", error);}
            finally {
                setLoding(false);}
        };
         useEffect(() => {
        fetchMovie();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
           if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMore && !loading) {
                fetchMovie(page);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div>
        <div className="flex flex-col gap-4 mb-8 container mx-auto px-6 ml-[120px] w-[588px] h-[144px] ">
            <h1 className="text-6xl font-Poppins font-semibold text-gray-50 mt-16">MaileHereko</h1>
            <p className="font-Poppins text-gray-300 text-base ">List of movies and TV Shows, I, Pramod Poudel have watched till date. Explore what I have watched and also feel free to make a suggestion.😉
            </p>
        </div>
        <SearchBar onResults={setMovies} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-[100px] m-[120px] justify-items-center px-6">
            {movies.map((movie) => {
                return (
                    <div key={`${movie.id}-${movie.title}`} className="bg-[#323B54] rounded-xl p-2">
                        <img src={movie.poster} alt={movie.title} className=" w-[282px] h-[480px] rounded-xl" />
                        <h2 className="text-[#EBEEF5] text-sm font-Poppins font-bold mt-4 mb-4">{movie.title}</h2>
                        <p>{movies.genres?.join(" / ")}</p>
                    </div>
                
            )})}
        </div>
                {loading && (
            <p className="text-center text-white mt-6 animate-pulse"> در حال بارگذاری فیلم های بیشتر...</p>
        )}
        {hasMore && ( 
            <p className="text-center text-gray-400 mt-6"> همه فیلم ها بارگذاری شدند </p>
        )}
        </div>
    );
};

