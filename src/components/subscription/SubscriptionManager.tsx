"use client";

import { useState } from "react";
import { SubscriptionPlan, UserSubscription } from "@/types/subscription";
import { getCurrentUser } from "@/lib/auth";

const plans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Basic access to portfolio content",
    price: 0,
    currency: "USD",
    interval: "month",
    features: [
      "View public projects",
      "Read blog articles",
      "Access to free templates",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Full access to all courses and premium content",
    price: 9.99,
    currency: "USD",
    interval: "month",
    isPopular: true,
    features: [
      "All Free features",
      "Access to all interview courses",
      "Download premium templates",
      "Priority support",
      "Ad-free experience",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams and organizations",
    price: 29.99,
    currency: "USD",
    interval: "month",
    features: [
      "All Pro features",
      "Team collaboration",
      "Custom course creation",
      "API access",
      "Dedicated support",
    ],
  },
];

interface SubscriptionManagerProps {
  user: any;
}

export default function SubscriptionManager({ user }: SubscriptionManagerProps) {
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    setLoading(planId);
    // TODO: Integrate with Stripe/other payment provider
    console.log("Upgrading to plan:", planId);
    
    // Mock upgrade for now
    setTimeout(() => {
      setCurrentSubscription({
        id: "sub_123",
        planId,
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
      });
      setLoading(null);
    }, 1000);
  };

  const handleCancel = async () => {
    setLoading("cancel");
    // TODO: Integrate with Stripe cancel subscription
    console.log("Canceling subscription");
    
    setTimeout(() => {
      if (currentSubscription) {
        setCurrentSubscription({
          ...currentSubscription,
          cancelAtPeriodEnd: true,
        });
      }
      setLoading(null);
    }, 1000);
  };

  const handleReactivate = async () => {
    setLoading("reactivate");
    // TODO: Integrate with Stripe reactivate subscription
    console.log("Reactivating subscription");
    
    setTimeout(() => {
      if (currentSubscription) {
        setCurrentSubscription({
          ...currentSubscription,
          cancelAtPeriodEnd: false,
        });
      }
      setLoading(null);
    }, 1000);
  };

  const currentPlan = plans.find(p => p.id === currentSubscription?.planId) || plans[0];

  return (
    <div className="space-y-12">
      {/* Current Subscription Status */}
      {currentSubscription && (
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-100">Current Subscription</h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-medium text-slate-200">{currentPlan.name} Plan</p>
              <p className="text-sm text-slate-400">
                Status: <span className="text-green-400">{currentSubscription.status}</span>
              </p>
              {currentSubscription.cancelAtPeriodEnd && (
                <p className="mt-1 text-sm text-yellow-400">
                  Canceling at period end: {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {currentSubscription.cancelAtPeriodEnd ? (
                <button
                  onClick={handleReactivate}
                  disabled={loading === "reactivate"}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                >
                  {loading === "reactivate" ? "Processing..." : "Reactivate"}
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  disabled={loading === "cancel"}
                  className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 disabled:opacity-50"
                >
                  {loading === "cancel" ? "Processing..." : "Cancel Subscription"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Available Plans */}
      <div>
        <h2 className="mb-6 text-xl font-semibold text-slate-100">Available Plans</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border p-6 ${
                plan.isPopular
                  ? "border-blue-500 bg-slate-800/80"
                  : "border-slate-700 bg-slate-800/50"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                  Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-100">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-slate-100">
                  {plan.price === 0 ? "Free" : `$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-slate-400">/{plan.interval}</span>
                )}
              </div>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading === plan.id || currentSubscription?.planId === plan.id}
                className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  currentSubscription?.planId === plan.id
                    ? "bg-slate-700 text-slate-400 cursor-default"
                    : plan.isPopular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-slate-600 text-slate-300 hover:bg-slate-700"
                } disabled:opacity-50`}
              >
                {loading === plan.id
                  ? "Processing..."
                  : currentSubscription?.planId === plan.id
                  ? "Current Plan"
                  : plan.price === 0
                  ? "Downgrade"
                  : "Upgrade"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
