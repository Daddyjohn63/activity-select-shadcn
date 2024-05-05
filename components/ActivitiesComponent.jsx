'use client';
import { XCircle } from 'lucide-react';
export default function ActivitiesList({
  activities,
  selectedActivities,
  addActivity,
  removeActivity,
  category
}) {
  return (
    <div className="w-[250px]">
      <h2 className="text-xl font-bold mb-4">Activity Type is: {category}</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.label} className="relative mb-2">
            <button
              type="button"
              onClick={() => addActivity(activity)}
              className="w-full text-left p-2 rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {activity.label}
              {selectedActivities.find(act => act.label === activity.label) && (
                <div className="absolute top-0 right-0 p-1">
                  <XCircle
                    onClick={e => {
                      e.stopPropagation();
                      removeActivity(activity.label);
                    }}
                    className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
                  />
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
