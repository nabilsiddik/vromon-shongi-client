export const dynamic = "force-dynamic";
import { TravelPlanForm } from "@/components/forms/TravelPlanForm";

const CreatePlan = () => {
  return (
    <div>
      <div className="mx-auto bg-white px-10 rounded-md max-w-4xl">
        <div className="mb-5 text-center">
          <h2 className="font-bold text-3xl">Create Your Travel Plan</h2>
          <p className="mt-2">Create your plan that will visible to others.</p>
        </div>
        <TravelPlanForm />
      </div>
    </div>
  );
};

export default CreatePlan;
