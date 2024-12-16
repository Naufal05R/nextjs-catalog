import { Skeleton } from "../ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
        <Skeleton className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
        <Skeleton className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
      </div>
      <Skeleton className="min-h-screen flex-1 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 md:min-h-min" />
    </div>
  );
};
