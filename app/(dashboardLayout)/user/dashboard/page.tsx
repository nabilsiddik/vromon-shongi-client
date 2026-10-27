import getLogedInUser from "@/services/user/userManagement";
import { getMyTravelPlan } from "@/services/travelPlan/travelPlanManagement";
import {
  myParticipantRequest,
  getMyOutgoingTripRequests,
  getAllParticipationsOfAnUser,
} from "@/services/trip-participant/tripParticipantManagement";
import { getMatchedTravelers } from "@/services/traveler/travelerManagement";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PlaneTakeoff,
  Users,
  GitPullRequest,
  Send,
  MessageSquare,
  MapPin,
  Calendar,
  Sparkles,
  PlusCircle,
  Compass,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { formatDate } from "@/utils/dateManagement";

export const dynamic = "force-dynamic";

export default async function UserDashboard() {
  const [
    user,
    myPlansRes,
    incomingRequestsRes,
    outgoingRequestsRes,
    joinedTripsRes,
    matchedTravelersRes,
  ] = await Promise.all([
    getLogedInUser(),
    getMyTravelPlan("limit=6"),
    myParticipantRequest(),
    getMyOutgoingTripRequests(),
    getAllParticipationsOfAnUser(),
    getMatchedTravelers(),
  ]);

  const myPlans = Array.isArray(myPlansRes?.data) ? myPlansRes.data : [];
  const incomingRequests = Array.isArray(incomingRequestsRes) ? incomingRequestsRes : [];
  const outgoingRequests = Array.isArray(outgoingRequestsRes) ? outgoingRequestsRes : [];
  const joinedTrips = Array.isArray(joinedTripsRes) ? joinedTripsRes : [];
  const matchedTravelers = Array.isArray(matchedTravelersRes) ? matchedTravelersRes.slice(0, 3) : [];

  const pendingIncomingCount = incomingRequests.filter(
    (r: any) => r.status === "PENDING"
  ).length;

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 text-white p-6 sm:p-8 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={user?.profileImage || "https://placehold.net/200x200.png"}
                alt={user?.firstName || "Profile"}
                width={72}
                height={72}
                className="w-18 h-18 rounded-full object-cover border-3 border-white/80 shadow"
              />
              {user?.verifiedBadge && (
                <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 p-1 rounded-full text-xs shadow" title="Verified Member">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Welcome back, {user?.firstName}! 👋
                </h1>
                {user?.verifiedBadge ? (
                  <Badge className="bg-amber-400/90 hover:bg-amber-400 text-amber-950 font-semibold border-none text-xs">
                    ★ Premium Traveler
                  </Badge>
                ) : (
                  <Link href="/subscription">
                    <Badge variant="outline" className="text-white border-white/60 hover:bg-white/20 text-xs cursor-pointer">
                      Upgrade to Premium
                    </Badge>
                  </Link>
                )}
              </div>
              <p className="text-white/80 text-sm mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                {user?.currentLocation || "Location not set"} • Member since{" "}
                {user?.createdAt ? new Date(user.createdAt).getFullYear() : "2024"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link href="/user/dashboard/create-plan" className="flex-1 md:flex-none">
              <Button className="w-full bg-white text-blue-700 hover:bg-white/90 font-semibold shadow-md flex items-center gap-2">
                <PlusCircle className="w-4 h-4" /> Plan a Trip
              </Button>
            </Link>
            <Link href="/trips" className="flex-1 md:flex-none">
              <Button variant="outline" className="w-full border-white text-white hover:bg-white/10 font-semibold">
                <Compass className="w-4 h-4 mr-1.5" /> Find Trips
              </Button>
            </Link>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -top-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* 2. Pending Requests Alert Banner (if any) */}
      {pendingIncomingCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
              <GitPullRequest className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">
                You have {pendingIncomingCount} pending trip join {pendingIncomingCount === 1 ? "request" : "requests"}!
              </p>
              <p className="text-xs text-amber-700/80">
                Fellow travelers are excited to join your journeys. Review and accept them to start chatting.
              </p>
            </div>
          </div>
          <Link href="/user/dashboard/incoming-requests">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
              Review Requests
            </Button>
          </Link>
        </div>
      )}

      {/* 3. Metric Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <Link href="/user/dashboard/my-travel-plans" className="group">
          <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">My Travel Plans</p>
                <p className="text-2xl font-bold mt-1 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {myPlansRes?.meta?.total || myPlans.length}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Trips created by you</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <PlaneTakeoff className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/dashboard/incoming-requests" className="group">
          <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-amber-500">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Incoming Requests</p>
                <p className="text-2xl font-bold mt-1 text-gray-900 group-hover:text-amber-600 transition-colors">
                  {incomingRequests.length}
                </p>
                <p className="text-xs text-amber-600 font-medium mt-0.5">
                  {pendingIncomingCount} pending approval
                </p>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                <GitPullRequest className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/dashboard/outgoing-requests" className="group">
          <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-teal-500">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Outgoing Requests</p>
                <p className="text-2xl font-bold mt-1 text-gray-900 group-hover:text-teal-600 transition-colors">
                  {outgoingRequests.length}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Trips you requested</p>
              </div>
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/dashboard/received-reviews" className="group">
          <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-purple-500">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Community Rating</p>
                <p className="text-2xl font-bold mt-1 text-gray-900 flex items-center gap-1.5 group-hover:text-purple-600 transition-colors">
                  {user?.averageRating || "5.0"}
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {user?.reviewsCount || 0} reviews received
                </p>
              </div>
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* 4. Main Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols wide): My Trips & Joined Chat Rooms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: My Active Plans */}
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <PlaneTakeoff className="w-5 h-5 text-primary" /> My Active Travel Plans
              </h2>
              <Link href="/user/dashboard/my-travel-plans" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                View All ({myPlans.length}) <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {myPlans.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed rounded-xl bg-slate-50/50">
                <PlaneTakeoff className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold text-gray-800">You haven't posted any travel plans yet</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Create your first itinerary and invite like-minded travel buddies to accompany you!
                </p>
                <Link href="/user/dashboard/create-plan" className="mt-3 inline-block">
                  <Button size="sm" className="mt-2 text-xs">Create a Travel Plan</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myPlans.slice(0, 4).map((plan: any) => (
                  <div key={plan.id} className="border rounded-xl p-4 hover:shadow-md transition-all flex flex-col justify-between bg-card">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-sm line-clamp-1">{plan.title}</span>
                        <Badge variant="secondary" className="text-[10px] shrink-0">
                          {plan.travelType}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-primary" /> {plan.destination}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                      </p>
                      <p className="text-xs font-medium text-emerald-600 mt-2">
                        Budget: ${plan.budgetFrom} - ${plan.budgetTo}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                      <Link href={`/user/dashboard/join-room/${plan.id}`} className="flex-1">
                        <Button size="sm" className="w-full text-xs h-8 flex items-center gap-1.5 bg-primary hover:bg-primary/90">
                          <MessageSquare className="w-3.5 h-3.5" /> Group Chat
                        </Button>
                      </Link>
                      <Link target="_blank" href={`/trips/${plan.id}`}>
                        <Button size="sm" variant="outline" className="text-xs h-8">
                          Preview
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Joined Trips / Approved Group Chats */}
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-600" /> Joined Group Chats ({joinedTrips.length})
              </h2>
              <Link href="/user/dashboard/outgoing-requests" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                Outgoing Status <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {joinedTrips.length === 0 ? (
              <div className="text-center py-6 text-sm text-muted-foreground">
                <p>You haven't joined any trips yet.</p>
                <Link href="/trips" className="text-xs text-primary font-medium hover:underline mt-1 inline-block">
                  Explore trips to join other travelers →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {joinedTrips.slice(0, 3).map((item: any) => {
                  const trip = item.trip;
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3.5 rounded-lg border bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                          💬
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 line-clamp-1">{trip?.title || "Trip Chat Room"}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-primary" /> {trip?.destination}
                          </p>
                        </div>
                      </div>
                      <Link href={`/user/dashboard/join-room/${trip?.id}`}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs h-8 flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" /> Enter Chat
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Matched Buddies & Quick Actions */}
        <div className="space-y-6">
          {/* Matched Travelers Widget */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Matched Buddies
                </CardTitle>
                <Link href="/user/dashboard/matched-travelers" className="text-xs text-primary hover:underline">
                  See More
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {matchedTravelers.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                  Add more interests & location in your profile to discover matching travelers!
                </p>
              ) : (
                matchedTravelers.map((buddy: any) => (
                  <Link
                    key={buddy.id}
                    href={`/traveler-profile/${buddy.id}`}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                  >
                    <Image
                      src={buddy.profileImage || "https://placehold.net/200x200.png"}
                      alt={buddy.firstName}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-gray-900">
                        {buddy.firstName} {buddy.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {buddy.currentLocation || "Traveler"}
                      </p>
                      {buddy.interests?.length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {buddy.interests.slice(0, 2).map((interest: string, i: number) => (
                            <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                              {interest}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>

          {/* Quick Profile Summary Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> Profile Quick Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Account Status</span>
                <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                  {user?.status || "ACTIVE"}
                </Badge>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Visited Countries</span>
                <span className="font-semibold">{user?.visitedCountries?.length || 0} countries</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Interests Set</span>
                <span className="font-semibold">{user?.interests?.length || 0} listed</span>
              </div>

              <Link href="/user/dashboard/profile" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Edit Profile Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
