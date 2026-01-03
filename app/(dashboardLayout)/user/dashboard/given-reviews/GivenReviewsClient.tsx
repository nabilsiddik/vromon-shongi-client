"use client";

import { Button } from "@/components/ui/button";
import {
  deleteReview,
  updateReview,
} from "@/services/reviews/reviewManagement";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
// import { updateReview } from "@/services/review/updateReview";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

type Review = {
  id: string;
  comment: string;
  rating: number;
};

export default function GivenReviewsClient({
  givenReviews,
}: {
  givenReviews: any[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setComment(review.comment || "");
    setRating(review.rating);
  };

  // Open review Delete modal
  const openReviewDeleteModal = (review: Review) => {
    setSelectedReview(review);
    setOpenModal(true);
  };

  // Update review
  const handleUpdate = async () => {
    try {
      const res = await updateReview(editingId!, { comment, rating });
      if (res.success) {
        toast.success("Review updated");
        setEditingId(null);
        startTransition(async () => {
          router.refresh();
        });
      } else {
        toast.error("Failed to update review");
      }
    } catch (err) {
      console.log("Something went wrong while updating review", err);
      toast.error("Something went wrong.");
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId: string) => {
    try {
      const res = await deleteReview(reviewId);
      if (res?.success) {
        toast.success("Review Deleted");
        startTransition(async () => {
          router.refresh();
        });
      } else {
        toast.error("Failed to delete review");
      }
    } catch (err) {
      console.log("Something went wrong while deleting review", err);
      toast.error("Something went wrong.");
    }
  };

  if (!givenReviews.length) {
    return (
      <div className="flex items-center justify-center mt-30">
        <p className="text-gray-500">No reviews given yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {givenReviews?.length &&
        givenReviews.map((review) => (
          <div
            key={review?.id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image
                src={review?.targetUser?.profileImage}
                alt={review?.targetUser?.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <Link href={`/traveler-profile/${review?.targetUser?.id}`}>
                  <p className="font-semibold">{review?.targetUser?.name}</p>
                </Link>
                <p className="text-sm text-gray-500">
                  {review?.plan?.destination}
                </p>
              </div>
            </div>

            {editingId === review?.id ? (
              <>
                <textarea
                  className="w-full border rounded-md mt-3 p-2"
                  value={comment}
                  onChange={(e) => setComment(e.target?.value)}
                />
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(+e.target?.value)}
                  className="mt-2 w-full border rounded-md p-1"
                />

                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleUpdate}
                    disabled={pending}
                    className="mt-3 cursor-pointer"
                  >
                    {pending ? "Updating..." : "Update"}
                  </Button>

                  <Button
                    onClick={() => setEditingId(null)}
                    className="mt-3 cursor-pointer"
                  >
                    Cancle
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="mt-3 text-sm">{review?.comment}</p>
                <p className="mt-2 text-sm font-medium">
                  ⭐ {review?.rating} / 5
                </p>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => handleEdit(review)}
                    className="mt-3 cursor-pointer"
                  >
                    Edit review
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => openReviewDeleteModal(review)}
                    className="mt-3 cursor-pointer"
                  >
                    Delete review
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}

      {/* my plan deleting alert dialog  */}
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              Review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {selectedReview && (
              <AlertDialogAction
                disabled={!selectedReview}
                onClick={() => handleDeleteReview(selectedReview?.id as string)}
              >
                Delete
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
