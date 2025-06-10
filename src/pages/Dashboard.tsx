import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import PageLayout from '@/components/navigation/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading } = useAuth(); // Use 'loading' instead of 'isLoading'

  if (loading) {
    return (
      <PageLayout title="Dashboard" description="Your CRD dashboard">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`Welcome back, ${user?.displayName || 'Creator'}`}
      description="Manage your cards, collections, and creative projects"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Button asChild variant="secondary" className="w-full justify-start">
                <Link to="/cards/create" className="flex items-center w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Card
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-start">
                <Link to="/collections" className="flex items-center w-full">
                  <Star className="mr-2 h-4 w-4" />
                  Manage Collections
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-start">
                <Link to="/teams" className="flex items-center w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Team Management
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-start">
                <Link to="/analytics" className="flex items-center w-full">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white shadow-md rounded-lg md:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span>Created "Holographic Charizard" card</span>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Added to "Rare Finds" collection</span>
                <span className="text-sm text-gray-500">3 hours ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Shared "Vintage Baseball" card</span>
                <span className="text-sm text-gray-500">Yesterday</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
