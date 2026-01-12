/**
 * Home page entry point
 * Pattern: static-webapp-scaffold - Next.js App Router page
 */

import { CounterPage } from "@/components/counter/CounterPage";

export default function Home(): React.ReactElement {
  return <CounterPage />;
}
