"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { db } from "@/utils/firebase";
import Input from "./Input";
import Button from "./Button";

const Feed = ({ authUser }) => {
  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const limit = 20;
  const totalPages = 10;

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const userFavoriteGif = await getDoc(doc(db, "users", authUser?.uid));
        setFavorites(userFavoriteGif.data()?.favoriteGif);
      } catch (error) {
        toast.error("Something went wrong!", { id: "error" });
      }
    };
    fetchUserFavorites();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setPrevSearch(() => search);

        let url = `https://api.giphy.com/v1/gifs/trending?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=${limit}&offset=${offset}`;

        if (search) {
          url = `https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${search}&limit=${limit}&offset=${offset}`;
        }
        search !== prevSearch && handlePageChange(1);

        const response = await axios.get(url);
        setGifs(
          Array.from(new Set(response.data.data.map((obj) => obj.id))).map(
            (id) => {
              return response.data.data.find((obj) => obj.id === id);
            }
          )
        );
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    const source = axios.CancelToken.source();
    // fetchData();
    const timeout = setTimeout(fetchData, 500)

    return () => {
      source.cancel("Operation canceled by cleanup");
      clearTimeout(timeout)
    };
  }, [search, offset]);

  const handleFavoriteChange = async (gifId) => {
    try {
      toast.success("Favorite list updated.");
      const res = await fetch(`/api/user/${authUser.uid}?gifId=${gifId}`);
      if (res.ok) setFavorites(await res.json());
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    setOffset(() => (page - 1) * limit);
    setCurrentPage(page);
  };

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
      <div className="flex mb-6 relative">
        <Input
          action={handleSearchChange}
          placeholder={"Article name of keywords"}
          type={"text"}
          value={search}
        />
        <Button text={"Search"}/>
      </div>
      {loading ? (
        <Loader />
      ) : !gifs.length == 0 ? (
        <div>
          <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1">
            {gifs.map((gif) => {
              return (
                <div key={gif.id} className="relative overflow-hidden">
                  <img
                    className="rounded-md mb-1 w-full"
                    src={gif.images.fixed_height.url}
                    alt={gif.title}
                  />
                  <div className="mb-3">
                    <div className=" flex justify-between">
                      <div className="">
                        <p className="text-sm text-black font-bold">
                          {gif.title.split("GIF")[0].trim()}
                        </p>
                        {gif.username && (
                          <p className="text-sm text-gray-400 md:text-md font-light">
                            @{gif.username}
                          </p>
                        )}
                      </div>
                      <button
                        className=""
                        onClick={() => handleFavoriteChange(gif.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={favorites?.includes(gif.id) ? "red" : "white"}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke={favorites?.includes(gif.id) ? "red" : "black"}
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
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
        <div className="p-5 bg-slate-200 m-auto absolute_center rounded-xl w-max">
          No any GIF found 🫡
        </div>
      )}
    </main>
  );
};

export default Feed;
