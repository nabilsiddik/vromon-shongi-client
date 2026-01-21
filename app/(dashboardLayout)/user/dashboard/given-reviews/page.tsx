import { getMyProfile } from "@/services/user/userManagement";
import GivenReviewsClient from "./GivenReviewsClient";

export default async function ReceivedReviews() {
  const data = await getMyProfile();
  const givenReviews = data?.data?.givenReviews || [];

  return <GivenReviewsClient givenReviews={givenReviews} />;
}
