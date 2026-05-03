export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  isPopular?: boolean
  stripePriceId?: string
}

export interface UserSubscription {
  id: string
  planId: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}
