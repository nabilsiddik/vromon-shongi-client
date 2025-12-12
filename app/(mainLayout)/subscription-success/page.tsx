import { Suspense } from "react";
import SubscriptionSuccessClient from "./SubscriptionSuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SubscriptionSuccessClient />
    </Suspense>
  );
}
