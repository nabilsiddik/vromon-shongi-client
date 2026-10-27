"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Sparkles, ArrowRight } from "lucide-react";

interface Props {
  isPremium: boolean;
  sessionId?: string;
}

const SubscriptionSuccessClient = ({ isPremium, sessionId }: Props) => {
  const router = useRouter();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isPremium && retryCount < 4) {
      const timer = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        router.refresh();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isPremium, retryCount, router]);

  if (!isPremium && retryCount < 4) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="bg-white border rounded-3xl p-8 max-w-md w-full text-center shadow-lg space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <h2 className="text-xl font-bold text-gray-800">Finalizing Your Subscription...</h2>
          <p className="text-sm text-muted-foreground">
            We are confirming your payment with Stripe and granting your verified badge. This takes just a moment.
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.refresh()}
              className="text-xs"
            >
              Refresh Status Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/50 px-6 py-12">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 sm:p-10 max-w-lg w-full text-center border border-white/60 animate-fadeIn space-y-6">
        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Premium Member Activated
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Payment Successful 🎉
          </h1>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            Your Vromon Shongi membership is now active! You now enjoy verified traveler status, enhanced matching credibility, and unlimited trip planning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link href="/user/dashboard" className="w-full">
            <Button className="w-full bg-primary hover:bg-primary/90 font-semibold h-11 flex items-center justify-center gap-2">
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/trips" className="w-full">
            <Button variant="outline" className="w-full font-semibold h-11">
              Explore Trips
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessClient;
