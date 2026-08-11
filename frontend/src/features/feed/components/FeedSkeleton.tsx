const SKELETON_CARDS = [0, 1, 2];

export default function FeedSkeleton() {
  return (
    <div className="m-auto max-w-3xl px-4 space-y-4 pb-8" aria-hidden="true">
      {SKELETON_CARDS.map((i) => (
        <div
          key={i}
          className="flex bg-surface rounded-2xl shadow-sm border border-gray-100 p-4 gap-3 animate-pulse"
        >
          <div className="shrink-0 size-12 rounded-full bg-gray-200" />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-28 rounded bg-gray-200" />
              <div className="h-3 w-16 rounded bg-gray-100" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-gray-100" />
              <div className="h-3 w-2/3 rounded bg-gray-100" />
            </div>
            <div className="h-40 w-full rounded-xl bg-gray-200" />
            <div className="flex gap-3 pt-1">
              <div className="h-6 w-14 rounded-full bg-gray-100" />
              <div className="h-6 w-14 rounded-full bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
