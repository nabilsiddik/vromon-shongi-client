export const dynamic = "force-dynamic";
import { TravelPlanForm } from "@/components/forms/TravelPlanForm";

const CreatePlan = () => {
  return (
    <div>
      <div className="mx-auto bg-white py-10 px-10 rounded-md max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="font-bold text-4xl">Create Your Travel Plan</h2>
          <p className="mt-2 font-medium">Create your plan that will visible to others.</p>
        </div>
        <TravelPlanForm />
      </div>
    </div>
  );
};

export default CreatePlan;
