"use client";

import React, { useState } from "react";
import { VoteAction } from "./lib/action/VoteAction.action";
import { Bounce, toast } from "react-toastify";

function VoteButton({
  type,
  typeId,
  initialLike,
  initialDislike,
}: {
  type: "comment" | "message";
  typeId: string;
  initialLike: number;
  initialDislike: number;
}) {
  const [likes, setLikes] = useState(initialLike);
  const [dislikes, setDislikes] = useState(initialDislike);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);

  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (voteType: "like" | "dislike") => {
    try {
      setIsVoting(true);

      const { success, data, message } = await VoteAction({
        type,
        typeId,
        voteType,
      });

      if (!success) {
        toast.error(message || "Failed to vote", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });

        return;
      }

      if (data) {
        setLikes(data.likeVote);
        setDislikes(data.dislikeVote);
        setUserVote(data.userVote);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 text-xs">
      <button
        className="rounded-lg border-white p-2 space-x-2"
        type="button"
        onClick={() => handleVote("like")}
        disabled={isVoting}
      >
        <span>{likes}</span>
        <span>Likes</span>
      </button>

      <button
        className="rounded-lg border-white p-2 space-x-2"
        type="button"
        onClick={() => handleVote("dislike")}
        disabled={isVoting}
      >
        <span>{dislikes}</span>
        <span>Dislikes</span>
      </button>
    </div>
  );
}

export default VoteButton;