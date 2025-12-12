"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type Plan = {
  name: string;
  price: string;
  features: string[];
  type: "monthly" | "yearly";
};

const plans: Plan[] = [
  {
    name: "Monthly Plan",
    price: "$10 / month",
    type: "monthly",
    features: [
      "Access to premium traveler profiles",
      "Verified badge",
      "Unlimited travel matches",
      "Priority support",
    ],
  },
  {
    name: "Yearly Plan",
    price: "$100 / year",
    type: "yearly",
    features: [
      "Access to premium traveler profiles",
      "Verified badge",
      "Unlimited travel matches",
      "Priority support",
      "Save 20% vs monthly",
    ],
  },
];

const SubscriptionButton = ({
  action,
}: {
  action: (plan: "monthly" | "yearly") => Promise<any>;
}) => {
  const [loadingPlan, setLoadingPlan] = useState<null | "monthly" | "yearly">(null);

  const handleClick = async (planType: "monthly" | "yearly") => {
    try {
      setLoadingPlan(planType);
      const result = await action(planType);

      if (result?.success) {
        window.location.href = result.data.url;
      }
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Choose Your Subscription Plan
      </h1>

      <p className="text-lg text-gray-600 mb-12 text-center max-w-xl">
        Unlock premium features and get the most out of Travel Buddy & Meetup!
      </p>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 w-full max-w-6xl">
        {plans.map((plan) => (
          <Card
            key={plan.type}
            className="hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {plan.name}
              </CardTitle>
              <CardDescription className="text-gray-700 mt-2">
                {plan.price}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-700"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="mt-4 w-full"
                disabled={loadingPlan === plan.type}
                onClick={() => handleClick(plan.type)}
              >
                {loadingPlan === plan.type
                  ? "Processing..."
                  : `Subscribe to ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-12 text-center max-w-md">
        Payments are secure and handled by Stripe. You can cancel anytime.
      </p>
    </div>
  );
};

export default SubscriptionButton;
