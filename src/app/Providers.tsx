"use client";
import ReduxProvider from "./ReduxProvider";
import { NotificationProvider } from "./NotificationContext";
import { AuthProvider } from "@/contexts/AuthContext";



// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PROMISE_KEY??"" );

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
          <AuthProvider>
            <NotificationProvider>
                <ReduxProvider>
                        {children}
                </ReduxProvider>
            </NotificationProvider>
          </AuthProvider>
  );
}
