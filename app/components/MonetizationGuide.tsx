
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

const MonetizationGuide = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-center">Monetization Strategy Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Phase 1: Google AdSense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Easy setup and approval process</li>
              <li>• Automatic ad optimization</li>
              <li>• Expected RPM: $1-3 for developer tools</li>
              <li>• Focus on content quality for approval</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Phase 2: Premium Networks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Media.net, Ezoic, AdThrive</li>
              <li>• Higher RPM: $3-8 potential</li>
              <li>• Requires 50k+ monthly pageviews</li>
              <li>• Better targeting for tech audience</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Phase 3: Direct Sponsorships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Developer tools and services</li>
              <li>• API providers and databases</li>
              <li>• Coding bootcamps and courses</li>
              <li>• $500-2000+ per month potential</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Phase 4: Premium Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• API access for bulk generation</li>
              <li>• Advanced export formats</li>
              <li>• Custom data schemas</li>
              <li>• $5-20/month subscription tiers</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Current Ad Placement Strategy:</h4>
        <ul className="text-sm space-y-1">
          <li>• <strong>Hero Section:</strong> High-impact leaderboard for maximum visibility</li>
          <li>• <strong>Sidebar Ads:</strong> Desktop skyscrapers for persistent exposure</li>
          <li>• <strong>In-Content:</strong> Native placements every 6 generator cards</li>
          <li>• <strong>Responsive:</strong> Mobile-optimized banner sizes</li>
          <li>• <strong>Footer:</strong> Additional inventory without disrupting UX</li>
        </ul>
      </div>
    </div>
  );
};

export default MonetizationGuide;
