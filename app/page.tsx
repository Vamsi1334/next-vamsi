import Index from "../app/pages/Index";

export const metadata = {
  title: "Free Fake Data Generator | FakerBox",
  description:
    "Generate realistic fake data for testing, development, and mock APIs. Create users, addresses, products instantly. Free developer tools for database seeding and prototyping.",
  alternates: {
    canonical: "https://fakerbox.com/",
  },
};

export default function Page() {
  return <Index />;
}
