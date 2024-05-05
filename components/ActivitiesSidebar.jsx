// SelectedActivitiesSidebar.jsx

import { XCircle } from 'lucide-react';

export default function SelectedActivitiesSidebar({
  selectedActivities,
  removeActivity
}) {
  return (
    <div className="w-[250px] bg-slate-100 mr-6 px-3 rounded-lg ">
      <h2 className="text-xl font-bold mb-4">Selected Activities</h2>
      <ul>
        {selectedActivities.map(activity => (
          <li key={activity.label} className="relative mb-2">
            <button
              type="button"
              // onClick={() => removeActivity(activity.label)}
              className="w-full text-left p-2 rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {activity.label}
              <div className="absolute top-0 right-0 p-1">
                <XCircle
                  onClick={e => {
                    e.stopPropagation();
                    removeActivity(activity.label);
                  }}
                  className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
                />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
