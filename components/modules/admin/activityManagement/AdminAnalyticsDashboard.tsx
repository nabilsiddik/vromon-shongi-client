"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  PlaneTakeoff,
  GitPullRequest,
  Star,
  CreditCard,
  TrendingUp,
  MapPin,
  Calendar,
  ShieldCheck,
  UserCheck,
  UserX,
  ExternalLink,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { formatDate } from "@/utils/dateManagement";

interface AdminAnalyticsProps {
  data: any;
}

export default function AdminAnalyticsDashboard({ data }: AdminAnalyticsProps) {
  const overview = data?.overview || {};
  const monthlyTrends = Array.isArray(data?.monthlyTrends) ? data.monthlyTrends : [];
  const travelTypeBreakdown = Array.isArray(data?.travelTypeBreakdown) ? data.travelTypeBreakdown : [];
  const topDestinations = Array.isArray(data?.topDestinations) ? data.topDestinations : [];
  const statusDistribution = Array.isArray(data?.statusDistribution) ? data.statusDistribution : [];
  const recentActivity = data?.recentActivity || {};

  const totalTypeCount = travelTypeBreakdown.reduce((sum: number, item: any) => sum + item.count, 0) || 1;
  const maxTrend = Math.max(...monthlyTrends.map((m: any) => Math.max(m.users, m.plans)), 5);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
            <span className="p-2 bg-primary/10 text-primary rounded-xl">
              <Activity className="w-7 h-7" />
            </span>
            Admin Command Center
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time platform insights, activity streams, and operational metrics for Vromon Shongi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard/users">
            <Button variant="outline" className="text-xs h-9 font-medium">
              <Users className="w-3.5 h-3.5 mr-1.5" /> Manage Users
            </Button>
          </Link>
          <Link href="/admin/dashboard/travel-plans">
            <Button className="text-xs h-9 font-medium bg-primary hover:bg-primary/90">
              <PlaneTakeoff className="w-3.5 h-3.5 mr-1.5" /> Manage Plans
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Users */}
        <Card className="border-t-4 border-t-blue-600 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Users</p>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">{overview.totalUsers || 0}</p>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t text-xs text-muted-foreground">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <UserCheck className="w-3.5 h-3.5" /> {overview.activeUsers || 0} active
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> {overview.verifiedUsers || 0} verified
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Travel Plans */}
        <Card className="border-t-4 border-t-emerald-600 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Travel Plans</p>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <PlaneTakeoff className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">{overview.totalPlans || 0}</p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t text-xs text-muted-foreground">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <TrendingUp className="w-3.5 h-3.5" /> Active Itineraries
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Join Requests & Participants */}
        <Card className="border-t-4 border-t-amber-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trip Participants</p>
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <GitPullRequest className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">{overview.totalParticipants || 0}</p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t text-xs text-muted-foreground">
              <span className="text-amber-700 font-medium">
                Approved & Pending Mates
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions & Rating */}
        <Card className="border-t-4 border-t-purple-600 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rating & Premium</p>
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-3xl font-bold text-gray-900">{overview.averageRating || "5.0"}</p>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs text-muted-foreground">
              <span>{overview.totalReviews || 0} Total Reviews</span>
              <span className="font-semibold text-purple-600">{overview.activeSubscriptions || 0} Active Subscriptions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Visual Charts Grid (Monthly Trend & Type Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend SVG Chart (2 cols) */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> Platform Growth Trend (Past 6 Months)
                </CardTitle>
                <CardDescription>
                  Comparison between new user registrations and travel plans created.
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600" /> Users
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" /> Plans
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {monthlyTrends.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-10">No trend data available yet.</p>
            ) : (
              <div className="pt-4">
                {/* SVG Bar Chart */}
                <div className="h-60 flex items-end justify-between gap-4 sm:gap-6 px-2 sm:px-4 border-b border-l pb-2">
                  {monthlyTrends.map((item: any, idx: number) => {
                    const userBarHeight = Math.max((item.users / maxTrend) * 100, 6);
                    const planBarHeight = Math.max((item.plans / maxTrend) * 100, 6);

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full">
                          {/* User Bar */}
                          <div
                            style={{ height: `${userBarHeight}%` }}
                            className="w-1/2 max-w-[24px] bg-blue-600 rounded-t-md transition-all duration-300 group-hover:bg-blue-700 relative"
                            title={`Users: ${item.users}`}
                          >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-gray-900 text-white px-1.5 py-0.5 rounded shadow">
                              {item.users}
                            </span>
                          </div>
                          {/* Plan Bar */}
                          <div
                            style={{ height: `${planBarHeight}%` }}
                            className="w-1/2 max-w-[24px] bg-emerald-500 rounded-t-md transition-all duration-300 group-hover:bg-emerald-600 relative"
                            title={`Plans: ${item.plans}`}
                          >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-gray-900 text-white px-1.5 py-0.5 rounded shadow">
                              {item.plans}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground">{item.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Travel Type & Status Breakdown (1 col) */}
        <Card className="shadow-sm flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <PlaneTakeoff className="w-5 h-5 text-indigo-600" /> Travel Type Distribution
            </CardTitle>
            <CardDescription>Preference breakdown across trips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {travelTypeBreakdown.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">No travel plans created yet.</p>
            ) : (
              travelTypeBreakdown.map((item: any) => {
                const percentage = Math.round((item.count / totalTypeCount) * 100);
                const colorClass =
                  item.type === "SOLO"
                    ? "bg-blue-500"
                    : item.type === "FAMILY"
                    ? "bg-purple-500"
                    : "bg-emerald-500";

                return (
                  <div key={item.type} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="capitalize">{item.type}</span>
                      <span className="text-muted-foreground">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${percentage}%` }}
                        className={`h-full ${colorClass} rounded-full transition-all duration-500`}
                      />
                    </div>
                  </div>
                );
              })
            )}

            {/* Popular Destinations List */}
            <div className="pt-4 border-t">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Top Destinations
              </p>
              <div className="space-y-2">
                {topDestinations.slice(0, 4).map((dest: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b last:border-none">
                    <span className="flex items-center gap-1.5 font-medium text-gray-800">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> {dest.destination}
                    </span>
                    <Badge variant="secondary" className="text-[11px] font-semibold">
                      {dest.count} {dest.count === 1 ? "plan" : "plans"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Recent Activities Feed & Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registered Users */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" /> Newly Joined Travelers
                </CardTitle>
                <CardDescription>Latest community registrations</CardDescription>
              </div>
              <Link href="/admin/dashboard/users">
                <Button variant="ghost" size="sm" className="text-xs text-primary font-semibold hover:underline">
                  View All <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity?.users?.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">No users found.</p>
            ) : (
              recentActivity.users?.map((u: any) => (
                <div key={u.id} className="flex items-center justify-between p-2.5 rounded-lg border hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <Image
                      src={u.profileImage || "https://placehold.net/200x200.png"}
                      alt={u.firstName}
                      width={38}
                      height={38}
                      className="w-9 h-9 rounded-full object-cover border"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                        {u.firstName} {u.lastName}
                        {u.verifiedBadge && (
                          <span title="Verified">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={u.role === "ADMIN" ? "default" : "secondary"} className="text-[10px]">
                      {u.role}
                    </Badge>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{formatDate(u.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Travel Plans Created */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <PlaneTakeoff className="w-4 h-4 text-emerald-600" /> Recent Travel Plans
                </CardTitle>
                <CardDescription>Latest itineraries posted by hosts</CardDescription>
              </div>
              <Link href="/admin/dashboard/travel-plans">
                <Button variant="ghost" size="sm" className="text-xs text-primary font-semibold hover:underline">
                  View All <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity?.plans?.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">No travel plans found.</p>
            ) : (
              recentActivity.plans?.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between p-2.5 rounded-lg border hover:bg-muted/40 transition-colors">
                  <div className="min-w-0 flex-1 pr-3">
                    <p className="text-xs font-bold text-gray-900 truncate">{p.title}</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-primary" /> {p.destination} • Hosted by{" "}
                      <span className="font-medium text-gray-700">
                        {p.user?.firstName} {p.user?.lastName}
                      </span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-semibold text-emerald-600 block">
                      ${p.budgetFrom} - ${p.budgetTo}
                    </span>
                    <Link target="_blank" href={`/trips/${p.id}`} className="text-[10px] text-primary hover:underline flex items-center gap-0.5 justify-end mt-0.5">
                      View <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
