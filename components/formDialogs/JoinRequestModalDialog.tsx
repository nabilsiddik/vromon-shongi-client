"use client";

import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { handleTravelersJoin } from "@/services/participant/participantManagement";
import { toast } from "sonner";

const JoinRequestModalDialog = ({ currentUser, plan }: any) => {
  const handleJoin = async () => {
    try {
      const data = await handleTravelersJoin(plan?.id);

      if (data?.success && data?.data?.id) {
        toast.success("Join request sent. Wait for confirm.");
      } else if (!data?.success && data?.message === "Request already exists") {
        toast.error(`${data?.message}. Please wait for accept.`);
      } else if (
        !data?.success &&
        data?.message === "Cannot join your own plan"
      ) {
        toast.error(`${data?.message}`);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err: any) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      {currentUser?.verifiedBadge ? (
        <>
          {/* join request confirm modal */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full mt-3">
                Join With {plan?.user?.name}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Join</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to join <b>{currentUser?.name}</b> for
                  this trip to <b>{plan?.destination}</b>?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleJoin}>
                  Yes, Join
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full mt-3">
              Join With {plan?.user?.name}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Join</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to join <b>{currentUser?.name}</b> for
                this trip to <b>{plan?.destination}</b>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleJoin}>
                Yes, Join
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default JoinRequestModalDialog;
