import { getMyProfile } from "@/services/user/userManagement";
import ReceivedReviewsClient from "./ReceivedReviewsClient";

export default async function ReceivedReviews() {
  const data = await getMyProfile();
  const receivedReviews = data?.data?.receivedReviews || [];

  return <ReceivedReviewsClient receivedReviews={receivedReviews} />;
}
