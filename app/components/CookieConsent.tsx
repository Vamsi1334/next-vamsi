"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { X, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Checkbox } from "../components/ui/checkbox";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true
    analytics: true,
    advertising: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    } else {
      const preferences = JSON.parse(consent);
      setCookiePreferences(preferences);
    }
  }, []);

  const acceptAll = () => {
    const preferences = {
      essential: true,
      analytics: true,
      advertising: true,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setCookiePreferences(preferences);
    setShowBanner(false);

    if (preferences.analytics) initializeAnalytics();
    if (preferences.advertising) initializeAds();
  };

  const acceptSelected = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(cookiePreferences));
    setShowBanner(false);
    setShowSettings(false);

    if (cookiePreferences.analytics) initializeAnalytics();
    if (cookiePreferences.advertising) initializeAds();
  };

  const rejectAll = () => {
    const preferences = {
      essential: true,
      analytics: false,
      advertising: false,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setCookiePreferences(preferences);
    setShowBanner(false);
  };

  const initializeAnalytics = () => {
    console.log("Analytics initialized");
  };

  const initializeAds = () => {
    console.log("Ads initialized");
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We use cookies
              </h3>
              <p className="text-gray-600 text-sm">
                We use cookies to enhance your experience, analyze site traffic,
                and serve personalized ads.{" "}
                <a
                  href="/privacy-policy"
                  className="text-blue-600 hover:underline"
                >
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-4 h-4 mr-1" />
                Customize
              </Button>

              <Button variant="outline" size="sm" onClick={rejectAll}>
                Reject All
              </Button>

              <Button
                size="sm"
                onClick={acceptAll}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Choose which cookies you want to accept. You can change these
              anytime.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Essential */}
            <div className="flex items-start space-x-3">
              <Checkbox id="essential" checked={true} disabled className="mt-1" />
              <div className="flex-1">
                <label htmlFor="essential" className="text-sm font-medium text-gray-900">
                  Essential Cookies
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Required for basic functionality. Cannot be disabled.
                </p>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="analytics"
                checked={cookiePreferences.analytics}
                onCheckedChange={(checked) =>
                  setCookiePreferences((prev) => ({
                    ...prev,
                    analytics: checked as boolean,
                  }))
                }
                className="mt-1"
              />
              <div className="flex-1">
                <label htmlFor="analytics" className="text-sm font-medium text-gray-900">
                  Analytics Cookies
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Help us understand how users interact with the site.
                </p>
              </div>
            </div>

            {/* Advertising */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="advertising"
                checked={cookiePreferences.advertising}
                onCheckedChange={(checked) =>
                  setCookiePreferences((prev) => ({
                    ...prev,
                    advertising: checked as boolean,
                  }))
                }
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor="advertising"
                  className="text-sm font-medium text-gray-900"
                >
                  Advertising Cookies
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Used to display relevant ads & measure performance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
              className="flex-1"
            >
              Cancel
            </Button>

            <Button
              onClick={acceptSelected}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
