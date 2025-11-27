import JsonBeautifier from "../../pages/JsonBeautifier";

export const metadata = {
  title: "JSON Beautifier - Format and Validate JSON Online | FakerBox",
  description:
    "Free online JSON beautifier and formatter. Format, validate, and prettify your JSON data instantly. Perfect tool for developers to clean and organize JSON code.",
  keywords:
    "JSON beautifier, JSON formatter, JSON validator, JSON prettify, format JSON, validate JSON, JSON parser, online JSON tool",
  robots: "index, follow",

  alternates: {
    canonical: "https://fakerbox.com/tools/json-beautifier",
  },

  openGraph: {
    type: "website",
    url: "https://fakerbox.com/tools/json-beautifier",
    title: "JSON Beautifier - Format and Validate JSON Online | FakerBox",
    description:
      "Free online JSON beautifier and formatter. Format, validate, and prettify your JSON data instantly. Perfect tool for developers to clean and organize JSON code.",
    siteName: "FakerBox",
  },

  twitter: {
    card: "summary_large_image",
    url: "https://fakerbox.com/tools/json-beautifier",
    title: "JSON Beautifier - Format and Validate JSON Online | FakerBox",
    description:
      "Free online JSON beautifier and formatter. Format, validate, and prettify your JSON data instantly.",
  },

  // ✅ Inject JSON-LD here safely
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "JSON Beautifier",
      description: "Free online JSON beautifier and formatter tool",
      url: "https://fakerbox.com/tools/json-beautifier",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      provider: {
        "@type": "Organization",
        name: "FakerBox",
        url: "https://fakerbox.com",
      },
      featureList: [
        "Format JSON data",
        "Validate JSON syntax",
        "Copy to clipboard",
        "Download formatted JSON",
        "Real-time error detection",
      ],
    }),
  },
};

export default function Page() {
  return <JsonBeautifier />;
}
