import type { Metadata } from "next";
import Airline from "../../tools/Airline";

// ✅ SEO Metadata (Next.js way)
export const metadata: Metadata = {
  title: "Fake Flight Data Generator for Travel Apps & Sites",
  description:
    "Fake Flight Data Generator helps you quickly create flight data, mock airline info, and sample aviation data for travel app testing, demos, or development. Generate now.",
};

export default function Page() {
  return <Airline />;
}
