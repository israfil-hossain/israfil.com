import { Metadata } from "next";
import SubscriptionManager from "@/components/subscription/SubscriptionManager";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Subscription | Israfil",
  description: "Manage your subscription and billing",
};

export default async function SubscriptionPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-100">
            Subscription <span className="text-blue-400">Plans</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Choose the plan that works best for you.
          </p>
        </div>

        <SubscriptionManager user={user} />
      </div>
    </div>
  );
}
