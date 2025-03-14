"use client";
import { MachineLikeStatus } from "@/lib/types";
import React from "react";

const MachineLike = ({ likeStatus }: { likeStatus: MachineLikeStatus }) => {
  return (
    <div className="ring-1 flex justify-around h-8">
      <div className="h-full flex items-center justify-center px-2 select-none">
        <span>{likeStatus.count}</span>
      </div>
      <button
        className={`block bg-slate-300 h-full p-1 px-2 ${
          likeStatus.userAlreadyLiked ? "text-sky-500" : "text-gray-500"
        }`}
      >
        LIKE
      </button>
    </div>
  );
};

export default MachineLike;
