"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
// import { updateReview } from "@/services/review/updateReview";
import { toast } from "sonner";

export default function GivenReviewsClient({
  givenReviews,
}: {
  givenReviews: any[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [pending, startTransition] = useTransition();

  const handleEdit = (review: any) => {
    setEditingId(review.id);
    setComment(review.comment || "");
    setRating(review.rating);
  };

  const handleUpdate = () => {
    // startTransition(async () => {
    //   const res = await updateReview(editingId!, { comment, rating });
    //   if (res.success) {
    //     toast.success("Review updated");
    //     setEditingId(null);
    //   } else {
    //     toast.error(res.message || "Failed to update review");
    //   }
    // });
  };

  if (!givenReviews.length) {
    return <p className="text-gray-500">No reviews given yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {givenReviews.length &&
        givenReviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image
                src={review.targetUser.profileImage}
                alt={review.targetUser.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{review.targetUser.name}</p>
                <p className="text-sm text-gray-500">
                  {review.plan.destination}
                </p>
              </div>
            </div>

            {editingId === review.id ? (
              <>
                <textarea
                  className="w-full border rounded-md mt-3 p-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(+e.target.value)}
                  className="mt-2 w-full border rounded-md p-1"
                />

                <button
                  onClick={handleUpdate}
                  disabled={pending}
                  className="mt-3 w-full bg-black text-white py-2 rounded-md"
                >
                  {pending ? "Updating..." : "Update"}
                </button>
              </>
            ) : (
              <>
                <p className="mt-3 text-sm">{review.comment}</p>
                <p className="mt-2 text-sm font-medium">
                  ⭐ {review.rating} / 5
                </p>

                <button
                  onClick={() => handleEdit(review)}
                  className="mt-3 text-sm text-blue-600"
                >
                  Edit review
                </button>
              </>
            )}
          </div>
        ))}
    </div>
  );
}
