import XmlBeautifier from "../../pages/XmlBeautifier";

export const metadata = {
  title: "XML Beautifier - Format and Validate XML Online | FakerBox",
  description:
    "Free online XML beautifier and formatter. Format, validate, and prettify your XML data instantly. Perfect tool for developers to clean and organize XML code.",
  keywords:
    "XML beautifier, XML formatter, XML validator, XML prettify, format XML, validate XML, XML parser, online XML tool",
  robots: "index, follow",

  alternates: {
    canonical: "https://fakerbox.com/tools/xml-beautifier",
  },

  openGraph: {
    type: "website",
    url: "https://fakerbox.com/tools/xml-beautifier",
    title: "XML Beautifier - Format and Validate XML Online | FakerBox",
    description:
      "Free online XML beautifier and formatter. Format, validate, and prettify your XML data instantly. Perfect tool for developers to clean and organize XML code.",
    siteName: "FakerBox",
  },

  twitter: {
    card: "summary_large_image",
    url: "https://fakerbox.com/tools/xml-beautifier",
    title: "XML Beautifier - Format and Validate XML Online | FakerBox",
    description:
      "Free online XML beautifier and formatter. Format, validate, and prettify your XML data instantly.",
  },

  // JSON-LD Structured Data
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "XML Beautifier",
      description: "Free online XML beautifier and formatter tool",
      url: "https://fakerbox.com/tools/xml-beautifier",
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
        "Format XML data",
        "Validate XML syntax",
        "Copy to clipboard",
        "Download formatted XML",
        "Real-time error detection",
      ],
    }),
  },
};

export default function Page() {
  return <XmlBeautifier />;
}
