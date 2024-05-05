'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { inesActivities } from '@/data/inesactivities';
import { useEffect, useState } from 'react';
import ActivitiesList from './ActivitiesComponent';
import SelectedActivitiesSidebar from './ActivitiesSidebar';

// Define the Zod schema for form validation
const FormSchema = z.object({
  activities: z
    .array(
      z.object({
        label: z.string(),
        category: z.string()
      })
    )
    .nonempty({ message: 'You must select at least one activity' })
});

// Main component for the activity form
export default function ActivityFormShadcn() {
  // State to manage selected activities
  const [selectedActivities, setSelectedActivities] = useState([]);
  // Initialize form
  const form = useForm({
    resolver: zodResolver(FormSchema), // Apply Zod schema for validation
    defaultValues: { activities: [] } // Set default form values
  });

  const { setError, clearErrors, reset } = form; // Destructure form methods from RHF

  // Function to handle form submission
  const onSubmit = data => {
    console.log('FORM SUBMIT', data.activities);
    reset(); // Reset the form after submission
    setSelectedActivities([]); // Clear selected activities
  };

  // Function to add an activity to the selected list
  const addActivity = activity => {
    setSelectedActivities(prev => {
      // Check if the activity is already added
      if (!prev.find(act => act.label === activity.label)) {
        clearErrors('activities'); // Clear any existing validation errors
        return [...prev, activity]; // Add the new activity
      }
      return prev; // Return the current list unchanged if the activity is already there
    });
  };

  // Function to remove an activity from the selected list
  const removeActivity = activityLabel => {
    setSelectedActivities(prev => {
      const newActivities = prev.filter(act => act.label !== activityLabel);
      if (newActivities.length === 0) {
        //provides user immediate feedback.Had to use RHF props to achieve this. Would be good to somehow hook into shadncn form props so the same validation message can be used as in FormSchema.
        setError('activities', { message: 'You must select at least one activity' });
      }
      return newActivities;
    });
  };

  // Update form value when selected activities change
  useEffect(() => {
    form.setValue('activities', selectedActivities);
  }, [selectedActivities, form]);

  return (
    <Form {...form}>
      <div className="flex">
        {/* Sidebar for selected activities */}
        <SelectedActivitiesSidebar
          selectedActivities={selectedActivities}
          removeActivity={removeActivity}
          className="bg-slate-100"
        />

        {/* MAIN FORM */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="activities"
            render={() => {
              return (
                <FormItem>
                  <FormControl>
                    <ActivitiesList
                      activities={inesActivities.filter(act => act.category === 'relax')}
                      selectedActivities={selectedActivities}
                      addActivity={addActivity}
                      removeActivity={removeActivity}
                      category="Relax"
                    />
                  </FormControl>
                  <FormControl>
                    <ActivitiesList
                      activities={inesActivities.filter(
                        act => act.category === 'exercise'
                      )}
                      selectedActivities={selectedActivities}
                      addActivity={addActivity}
                      removeActivity={removeActivity}
                      category="Exercise"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>
  );
}
