"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getDoc, doc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { db } from "@/utils/firebase";
import GifCard from "@/components/GifCard";

const Favorite = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const limit = 20;
  const [userId, setUserId] = useState();

  const searchParams = useSearchParams();

  useEffect(() => {
    setUserId(searchParams.get("uid"));
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = searchParams.get("uid");
        if (userId) {
          const userFavoriteGif = await getDoc(doc(db, "users", userId));
          setFavorites(userFavoriteGif.data().favoriteGif);
        }
      } catch (error) {
        console.error("Error fetching user favorite GIF:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);

    const fetchGIFs = async () => {
      const apiKey = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
      const fetchedGIFs = [];

      await Promise.all(
        favorites.map(async (item) => {
          const url = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${item}`;
          const response = await axios.get(url);
          fetchedGIFs.push(...response.data.data);
        })
      );

      setGifs(fetchedGIFs);
      setLoading(false);
    };

    fetchGIFs();
  }, [favorites]);

  const handleFavoriteChange = async (gifId) => {
    const res = await fetch(`/api/user/${userId}?gifId=${gifId}`);
    const data = await res.json();
    setFavorites(data);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.floor(favorites.length / limit + 1);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = Math.min(totalPages, 3);
    let startPage = 1;
    if (currentPage > 2 && totalPages > 3) {
      startPage = Math.min(currentPage - 1, totalPages - 2);
    }
    for (let i = 0; i < maxPages; i++) {
      pageNumbers.push(startPage);
      startPage++;
    }
    return pageNumbers;
  };

  return (
    <main className="bg-white rounded-[20px] w-full shadow md:mt-0 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl m-auto p-6 min-h-[72vh] relative mb-10">
      {loading ? (
        <Loader />
      ) : !gifs.length == 0 ? (
        <div>
          <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1">
            {gifs.map((gif) => {
              return (
                <GifCard
                  gif={gif}
                  key={gif.id}
                  handleFavoriteChange={handleFavoriteChange}
                />
              );
            })}
          </div>
          <div className="mt-8 mb-5 flex justify-center gap-5">
            <button
              className="text-sm font-semibold"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                className={`text-sm p-2.5 px-3 ${
                  currentPage === pageNumber
                    ? "border-b-4 bg-pink-100 border-b-pink-600"
                    : ""
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className="text-sm font-semibold"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-[72vh] w-full bg-red-200 flex items-center justify-center text-2xl rounded-[12px] text-red-800">
          GIF not found!
        </div>
      )}
    </main>
  );
};

export default Favorite;
