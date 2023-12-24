import React from "react";

const GifCard = ({ gif, handleFavoriteChange }) => {
  return (
    <>
      <div key={gif.id} className="overflow-hidden">
        <img
          className="rounded-md mb-1 w-full"
          src={gif.images.fixed_height.url}
          alt={gif.title}
        />
        <div className="mb-3">
          <div className=" flex justify-between ">
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
            <button className="" onClick={() => handleFavoriteChange(gif.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="red"
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
    </>
  );
};

export default GifCard;
