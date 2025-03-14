"use client";

import { MachineLikeStatus } from "@/lib/types";
import { useState, useTransition } from "react";
import { toggleLikeFlyingMachine } from "@/actions/toggle-like-flying-machine"; // Import your API function
import LoadingSpinner from "./LoadingSpinner";
import useAuthStore from "@/store/authStore";

const MachineLike = ({
  machineId,
  likeStatus,
}: {
  machineId: string;
  likeStatus: MachineLikeStatus;
}) => {
  const [likes, setLikes] = useState(likeStatus.count);
  const [userLiked, setUserLiked] = useState(likeStatus.userAlreadyLiked);
  const [isPending, startTransition] = useTransition(); // Optimized loading state

  const { isAuthenticated } = useAuthStore();
  const handleLikeToggle = () => {
    if (!isAuthenticated) {
      alert("must sign in first");
      return;
    }
    startTransition(async () => {
      try {
        const response = await toggleLikeFlyingMachine(machineId.toString()); // Replace with actual id
        setLikes((prev) => (response.liked ? prev + 1 : Math.max(0, prev - 1)));
        setUserLiked(response.liked);
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    });
  };

  return (
    <div className="ring-1 flex justify-around h-8">
      <div className="h-full flex items-center justify-center px-2 select-none">
        <span>{likes}</span>
      </div>
      <button
        onClick={handleLikeToggle}
        className={` w-16 block bg-slate-200 h-full p-1 px-2 ${
          userLiked ? "text-sky-500" : "text-gray-500"
        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isPending}
      >
        {isPending ? <LoadingSpinner className="w-6 mx-auto" /> : "LIKE"}
      </button>
    </div>
  );
};

export default MachineLike;
