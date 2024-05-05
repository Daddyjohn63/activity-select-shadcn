'use client';
import ActivityFormShadcn from '@/components/ActivityFormShadcn';

export default function Home() {
  return (
    <section className="container py-6">
      <div className="flex text-2xl pb-6 ">Add your activity</div>
      {/* <ActivityForm /> */}
      <ActivityFormShadcn />
    </section>
  );
}
