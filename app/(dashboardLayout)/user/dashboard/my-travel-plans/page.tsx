export const dynamic = "force-dynamic";
import TravelPlansTable from "@/components/modules/admin/travelPlanManagement/TravelPlansTable";
import TableFilterBar from "@/components/shared/tables/tableFilterBar";
import TablePagination from "@/components/shared/tables/TablePagination";
import { queryStringFormatter } from "@/lib/formatter";
import {
  getAllTravelPlans,
  getMyTravelPlan,
} from "@/services/travelPlan/travelPlanManagement";

const MyTravelPlans = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const myTravelPlans = await getAllTravelPlans(queryString);

  console.log(myTravelPlans, "my");

  return (
    <div>
      <TableFilterBar />
      <TravelPlansTable travelPlans={myTravelPlans?.data} />
      <div className="mt-4 flex justify-start">
        {/* <TablePagination currentPage={travelPlans?.meta?.page || 1} totalPages={totalPages || 1} /> */}
      </div>
    </div>
  );
};

export default MyTravelPlans;
