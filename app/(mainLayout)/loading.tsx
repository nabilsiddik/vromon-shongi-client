export default function MainLoading() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-primary/10" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-gray-800">Loading page...</p>
        <p className="text-xs text-muted-foreground">Fetching travel plans and details</p>
      </div>
    </div>
  );
}
