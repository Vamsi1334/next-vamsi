import { Metadata } from "next";
import Blog from "../pages/Blog";
import { getAllPosts, getFeaturedPosts } from "../data/blogContent";

export const metadata: Metadata = {
  title: "FakerBox Blog - Test Data Management & Development Insights",
  description:
    "Expert insights on test data management, database seeding, and development best practices. Learn how to improve your development workflow with effective data strategies.",
  keywords:
    "test data management, database seeding, fake data generation, development best practices, API testing",
  alternates: {
    canonical: "https://fakerbox.com/blog",
  },
  openGraph: {
    title: "FakerBox Blog - Test Data Management & Development Insights",
    description:
      "Expert insights on test data management, database seeding, and development best practices.",
    type: "website",
    url: "https://fakerbox.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "FakerBox Blog - Test Data Management & Development Insights",
    description:
      "Expert insights on test data management, database seeding, and development best practices.",
  },
  other: {
    // Google structured data (JSON-LD)
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "FakerBox Blog",
      "description":
        "Expert insights on test data management, database seeding, and development best practices",
      "url": "https://fakerbox.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "FakerBox",
        "url": "https://fakerbox.com",
      },
    }),
  },
};

// ✅ Page Component (SSR automatically)
export default function Page() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

  return (
    <Blog allPosts={allPosts} featuredPosts={featuredPosts} />
  );
}
