import { Button } from "@/components/ui/button";
import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw, ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

export default function SubscriptionCancelledPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50/30 px-6 py-12">
      <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 max-w-md w-full text-center border space-y-6">
        <div className="w-18 h-18 mx-auto flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <XCircle className="w-10 h-10" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Subscription Cancelled
          </h1>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            Your checkout was not completed and no payment was charged. You can continue using Vromon Shongi as a free traveler anytime.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link href="/subscription" className="block">
            <Button className="w-full bg-primary hover:bg-primary/90 font-semibold h-11 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" /> Try Again
            </Button>
          </Link>
          <Link href="/trips" className="block">
            <Button variant="outline" className="w-full font-semibold h-11 flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Browse Trips For Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
