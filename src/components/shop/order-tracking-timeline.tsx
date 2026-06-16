'use client';

import { Check, Circle, Truck, Package, MapPin, Clock, Box, Home } from 'lucide-react';
import { format } from 'date-fns';

interface TrackingStep {
  status: string;
  description: string;
  location: string | null;
  timestamp: string;
}

interface OrderTrackingTimelineProps {
  trackingSteps: TrackingStep[];
  currentStatus: string;
}

// Define the full tracking journey (Flipkart-style)
const TRACKING_JOURNEY = [
  { key: 'pending', label: 'Order Placed', icon: Box, color: 'text-amber-600' },
  { key: 'confirmed', label: 'Order Confirmed', icon: Check, color: 'text-blue-600' },
  { key: 'processing', label: 'Packed & Ready', icon: Package, color: 'text-indigo-600' },
  { key: 'shipped', label: 'Shipped', icon: Truck, color: 'text-purple-600' },
  { key: 'out-for-delivery', label: 'Out for Delivery', icon: MapPin, color: 'text-orange-600' },
  { key: 'delivered', label: 'Delivered', icon: Home, color: 'text-emerald-600' },
];

function getStepIndex(status: string): number {
  const idx = TRACKING_JOURNEY.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : -1;
}

export function OrderTrackingTimeline({ trackingSteps, currentStatus }: OrderTrackingTimelineProps) {
  const currentIdx = getStepIndex(currentStatus);
  const isCancelled = currentStatus === 'cancelled';

  // Build a map of actual tracking timestamps
  const trackingMap = new Map<string, TrackingStep>();
  for (const step of trackingSteps) {
    trackingMap.set(step.status, step);
  }

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
            <Circle className="h-5 w-5 text-red-500 fill-red-500" />
          </div>
          <div>
            <h3 className="font-bold text-red-700">Order Cancelled</h3>
            {trackingMap.has('cancelled') && (
              <p className="text-sm text-red-500">
                {format(new Date(trackingMap.get('cancelled')!.timestamp), 'MMM d, yyyy · h:mm a')}
              </p>
            )}
          </div>
        </div>
        {trackingMap.has('cancelled') && trackingMap.get('cancelled')!.description && (
          <p className="text-sm text-red-600 ml-13">{trackingMap.get('cancelled')!.description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
        <Truck className="h-5 w-5 text-emerald-600" />
        Track Your Order
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Order status updated in real-time
      </p>

      {/* Flipkart-style horizontal progress bar (desktop) */}
      <div className="hidden sm:block mb-8">
        <div className="relative">
          {/* Background line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full" />
          {/* Active line */}
          <div
            className="absolute top-5 left-0 h-1 bg-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${currentIdx >= 0 ? (currentIdx / (TRACKING_JOURNEY.length - 1)) * 100 : 0}%` }}
          />
          {/* Step dots */}
          <div className="relative flex justify-between">
            {TRACKING_JOURNEY.map((step, idx) => {
              const isCompleted = idx <= currentIdx;
              const isCurrent = idx === currentIdx;
              const trackingData = trackingMap.get(step.key);
              const Icon = step.icon;

              return (
                <div key={step.key} className="flex flex-col items-center" style={{ width: `${100 / TRACKING_JOURNEY.length}%` }}>
                  <div
                    className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-110'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <p className={`text-xs font-semibold mt-2 text-center ${
                    isCurrent ? 'text-emerald-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  {trackingData && (
                    <p className="text-[10px] text-muted-foreground text-center mt-0.5">
                      {format(new Date(trackingData.timestamp), 'MMM d, h:mm a')}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vertical timeline (mobile) */}
      <div className="sm:hidden">
        {TRACKING_JOURNEY.map((step, idx) => {
          const isCompleted = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          const trackingData = trackingMap.get(step.key);
          const Icon = step.icon;
          const isLast = idx === TRACKING_JOURNEY.length - 1;

          return (
            <div key={step.key} className="flex gap-3">
              {/* Timeline column */}
              <div className="flex flex-col items-center">
                <div
                  className={`relative z-10 h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                {!isLast && (
                  <div className={`w-0.5 flex-1 min-h-[32px] ${isCompleted ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                )}
              </div>

              {/* Content column */}
              <div className={`pb-4 ${isLast ? '' : ''}`}>
                <p className={`font-semibold text-sm ${isCurrent ? 'text-emerald-600' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                {trackingData ? (
                  <div className="mt-0.5">
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(trackingData.timestamp), 'MMM d, yyyy · h:mm a')}
                    </p>
                    {trackingData.description && (
                      <p className="text-xs text-gray-500 mt-0.5">{trackingData.description}</p>
                    )}
                    {trackingData.location && (
                      <p className="text-xs text-emerald-600 mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {trackingData.location}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-gray-300 mt-0.5">Pending</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed tracking log */}
      {trackingSteps.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Activity Log
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            {trackingSteps
              .slice()
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((step, idx) => {
                const journeyStep = TRACKING_JOURNEY.find((j) => j.key === step.status);
                const Icon = journeyStep?.icon || Circle;
                return (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="h-3 w-3 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-700">{step.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span>{format(new Date(step.timestamp), 'MMM d, yyyy · h:mm a')}</span>
                        {step.location && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {step.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
