"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const SubscriptionSuccessClient = ({
  verifiedSession,
}: {
  verifiedSession: boolean;
}) => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (!verifiedSession) return;

    const interval = setInterval(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`);
      const data = await res.json();

      if (data.verifiedBadge) {
        setIsPremium(true);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [verifiedSession]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-6">
      <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-10 max-w-md w-full text-center border border-white/50 animate-fadeIn">
        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-100 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Your subscription is now active. Enjoy premium features instantly!
        </p>
        <Link href={"/"}>
          <Button>Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionSuccessClient;
