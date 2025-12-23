"use client";

import Image from "next/image";

export default function ReceivedReviewsClient({
  receivedReviews,
}: {
  receivedReviews: any[];
}) {
  if (!receivedReviews.length) {
    return <p className="text-gray-500">No reviews received yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {receivedReviews.length &&
        receivedReviews.map((review: any) => (
          <div
            key={review.id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image
                src={review.reviewer.profileImage}
                alt={review.reviewer.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{review.reviewer.name}</p>
                <p className="text-sm text-gray-500">
                  {review.plan.destination}
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm">{review.comment}</p>

            <p className="mt-2 text-sm font-medium">⭐ {review.rating} / 5</p>
          </div>
        ))}
    </div>
  );
}
