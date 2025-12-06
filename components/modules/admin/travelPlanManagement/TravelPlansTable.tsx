"use client";

import ManagementTable from "@/components/shared/tables/ManagementTable";
import { travelPlansColumns } from "./travelPlansColumns";

const TravelPlansTable = ({ travelPlans }: any) => {

  return (
    <>
      <ManagementTable
        data={travelPlans}
        columns={travelPlansColumns}
        emptyMessage="No travel plan found"
        getRowKey={(travelPlan) => travelPlan?.id}
      />
    </>
  );
};

export default TravelPlansTable;