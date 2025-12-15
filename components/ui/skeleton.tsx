import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200",
        className
      )}
    />
  );
}

// Pre-built skeleton patterns for common use cases

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("bg-white rounded-2xl p-5 shadow-sm border border-gray-100", className)}>
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
      <Skeleton className="w-16 h-8 mb-2" />
      <Skeleton className="w-24 h-4" />
    </div>
  );
}

export function SkeletonLeadRow({ className }: SkeletonProps) {
  return (
    <div className={cn("flex items-center gap-4 px-4 py-3 rounded-lg bg-white", className)}>
      {/* Avatar */}
      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
      {/* Name & handle */}
      <div className="flex-1 min-w-0">
        <Skeleton className="w-32 h-4 mb-2" />
        <Skeleton className="w-20 h-3" />
      </div>
      {/* Status */}
      <Skeleton className="w-20 h-6 rounded-md hidden md:block" />
      {/* Type */}
      <Skeleton className="w-16 h-5 rounded-full hidden md:block" />
      {/* Last activity */}
      <div className="hidden md:block flex-1">
        <Skeleton className="w-full max-w-[200px] h-4 mb-1" />
        <Skeleton className="w-16 h-3" />
      </div>
      {/* Assigned */}
      <Skeleton className="w-7 h-7 rounded-full hidden md:block" />
    </div>
  );
}

export function SkeletonConversation({ className }: SkeletonProps) {
  return (
    <div className={cn("flex items-start gap-3 p-3 rounded-lg", className)}>
      {/* Avatar */}
      <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-12 h-3" />
        </div>
        <Skeleton className="w-full h-4 mb-1" />
        <Skeleton className="w-3/4 h-3" />
      </div>
    </div>
  );
}

export function SkeletonMessage({ isOwn = false, className }: SkeletonProps & { isOwn?: boolean }) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start", className)}>
      <div className={cn(
        "rounded-2xl px-4 py-3 max-w-[70%]",
        isOwn ? "bg-gray-200" : "bg-gray-100"
      )}>
        <Skeleton className={cn("h-4 mb-1", isOwn ? "w-32" : "w-48")} />
        <Skeleton className={cn("h-4", isOwn ? "w-24" : "w-36")} />
      </div>
    </div>
  );
}

export function SkeletonDetailPanel({ className }: SkeletonProps) {
  return (
    <div className={cn("p-6 space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div>
          <Skeleton className="w-32 h-5 mb-2" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>

      {/* Info section */}
      <div className="space-y-4">
        <Skeleton className="w-20 h-4" />
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="w-14 h-4" />
            <Skeleton className="w-28 h-4" />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <Skeleton className="w-16 h-4" />
        <div className="flex gap-2">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-14 h-6 rounded-full" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Skeleton className="flex-1 h-10 rounded-xl" />
        <Skeleton className="flex-1 h-10 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, className }: SkeletonProps & { rows?: number }) {
  return (
    <div className={cn("space-y-1 p-2", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonLeadRow key={i} />
      ))}
    </div>
  );
}

export function SkeletonInbox({ className }: SkeletonProps) {
  return (
    <div className={cn("flex h-full", className)}>
      {/* Conversation list */}
      <div className="w-80 border-r border-gray-200 p-2 space-y-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonConversation key={i} />
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div>
            <Skeleton className="w-24 h-4 mb-1" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4">
          <SkeletonMessage />
          <SkeletonMessage isOwn />
          <SkeletonMessage />
          <SkeletonMessage />
          <SkeletonMessage isOwn />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <Skeleton className="w-full h-12 rounded-xl" />
        </div>
      </div>

      {/* Detail panel */}
      <div className="w-80 border-l border-gray-200">
        <SkeletonDetailPanel />
      </div>
    </div>
  );
}
