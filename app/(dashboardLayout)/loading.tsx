import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4 animate-fade-in">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-primary/10" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-gray-800">Loading dashboard...</p>
        <p className="text-xs text-muted-foreground">Preparing your data and conversations</p>
      </div>
    </div>
  );
}
