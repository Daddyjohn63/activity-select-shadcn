'use client';
import { XCircle } from 'lucide-react';

// Component to display selected activities in a sidebar
export default function SelectedActivitiesSidebar({
  selectedActivities, // List of selected activities
  removeActivity // Function to remove an activity from the selected list
}) {
  return (
    <div className="w-[250px] bg-slate-100 mr-6 px-3 rounded-lg ">
      {/* Title for the sidebar */}
      <h2 className="text-xl font-bold mb-4">Selected Activities</h2>
      {/* List of selected activities */}
      <ul>
        {selectedActivities.map(activity => (
          <li key={activity.label} className="relative mb-2">
            {/* List of selected activities */}
            <button
              type="button"
              // removed the onClick here as the whole button would be used.
              // onClick={() => removeActivity(activity.label)}
              className="w-full text-left p-2 rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {activity.label}
              <div className="absolute top-0 right-0 p-1">
                {/* Button to remove selected activity */}
                <XCircle
                  onClick={e => {
                    e.stopPropagation(); // Prevent event bubbling
                    removeActivity(activity.label); // Remove the activity when icon is clicked
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
