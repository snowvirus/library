"use client";
import ReduxProvider from "./ReduxProvider";
import { NotificationProvider } from "./NotificationContext";



// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PROMISE_KEY??"" );

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (

          <NotificationProvider>
              <ReduxProvider>
                      {children}
              </ReduxProvider>
          </NotificationProvider>
  );
}
