// app/components/SiteVerification.tsx
import Head from 'next/head';

const SiteVerification = () => {
  return (
    <Head>
      {/* Google AdSense */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7577053830310081"
        crossOrigin="anonymous"
      ></script>

      {/* Google Search Console Verification - Replace with your actual verification code */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />

      {/* Bing Webmaster Tools Verification - Replace with your actual verification code */}
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />

      {/* Additional meta tags for SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Open Graph tags for social sharing */}
      <meta property="og:site_name" content="FakerBox" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card tags */}
      <meta name="twitter:creator" content="@fakerbox" />

      {/* Schema.org markup for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "FakerBox",
            "description": "Generate fake data for development, testing, and prototyping",
            "url": "https://fakerbox.com",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "FakerBox"
            }
          })
        }}
      />
    </Head>
  );
};

export default SiteVerification;
