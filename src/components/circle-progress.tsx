export function Progress({ progress: progressInPercentage }: { progress: number }) {
  return (
    <div className="py-4">
      <div className="pb-2">{Math.round(progressInPercentage)}% dokončeno!</div>
      <div className="mb-5 h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <div
          className="w[75%] h-4 rounded-full bg-linear-to-r from-zinc-600 to-zinc-900 dark:from-zinc-400 dark:to-zinc-100"
          style={{ width: `${progressInPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
