import { getAdminAnalytics } from "@/services/admin/adminManagement";
import AdminAnalyticsDashboard from "@/components/modules/admin/activityManagement/AdminAnalyticsDashboard";

export const dynamic = "force-dynamic";

const AdminDashboard = async () => {
  const analyticsData = await getAdminAnalytics();

  return <AdminAnalyticsDashboard data={analyticsData} />;
};

export default AdminDashboard;
