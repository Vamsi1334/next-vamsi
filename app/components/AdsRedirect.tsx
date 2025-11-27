"use client";

import { useEffect } from "react";

const AdsRedirect = () => {
  useEffect(() => {
    // Redirect to the actual ads.txt file in the public directory
    window.location.replace("/ads.txt");
  }, []);

  return null;
};

export default AdsRedirect;
