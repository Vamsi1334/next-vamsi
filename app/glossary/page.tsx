// app/pages/blog/page.tsx OR correct location
import GlossaryByFakerbox from "../mockdata/GlossaryByFakerbox";

export const metadata = {
  title: "Data Generation Glossary By Fakerbox",
  description:
    "Complete glossary of data generation, testing, and development terms. Learn about mock data, synthetic data, API testing, and more.",
};

export default function BlogPage() {
  return <GlossaryByFakerbox />;
}
