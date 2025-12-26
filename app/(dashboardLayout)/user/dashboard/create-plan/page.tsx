export const dynamic = "force-dynamic";
import { TravelPlanForm } from "@/components/forms/TravelPlanForm";

const CreatePlan = () => {
  return (
    <div>
      <div className="lg:max-w-6xl max-w-12/12 mx-auto">
        <TravelPlanForm />
      </div>
    </div>
  );
};

export default CreatePlan;
