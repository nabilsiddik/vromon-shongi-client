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
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const JoinRequestModalDialog = ({
  currentUser,
  plan,
  isAlreadyRequested,
}: any) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleJoin = async () => {
    try {
      const data = await handleTravelersJoin(plan?.id);

      if (data?.success && data?.data?.id) {
        toast.success("Join request sent. Wait for confirm.");
        startTransition(() => {
          router.refresh();
        });
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
              <Button disabled={isAlreadyRequested} className="w-full mt-3">
                {isAlreadyRequested
                  ? "Requested"
                  : `Join With ${plan?.user?.firstName} ${plan?.user?.lastName}`}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Join</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to join <b>{plan?.user?.firstName} ${plan?.user?.lastName}</b> for
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
        <Link href={"/subscription"}>
          <Button className="w-full mt-3 cursor-pointer">
            Join With {plan?.user?.firstName} {plan?.user?.lastName}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default JoinRequestModalDialog;
