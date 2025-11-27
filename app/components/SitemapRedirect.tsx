'use client';


import { useEffect } from 'react';

const SitemapRedirect = () => {
  useEffect(() => {
    // Redirect to the actual sitemap.xml file
    window.location.replace('/sitemap.xml');
  }, []);

  return null;
};

export default SitemapRedirect;