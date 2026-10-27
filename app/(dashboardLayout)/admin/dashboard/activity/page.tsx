import { getAdminAnalytics } from "@/services/admin/adminManagement";
import AdminAnalyticsDashboard from "@/components/modules/admin/activityManagement/AdminAnalyticsDashboard";

export const dynamic = "force-dynamic";

const Activity = async () => {
  const analyticsData = await getAdminAnalytics();

  return <AdminAnalyticsDashboard data={analyticsData} />;
};

export default Activity;
