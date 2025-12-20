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

const JoinRequestModalDialog = ({
  currentUser,
  handleJoin,
  plan,
  isJoining,
}: any) => {
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
                <AlertDialogAction onClick={handleJoin} disabled={isJoining}>
                  {isJoining ? "Joining..." : "Yes, Join"}
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
              <AlertDialogAction onClick={handleJoin} disabled={isJoining}>
                {isJoining ? "Joining..." : "Yes, Join"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default JoinRequestModalDialog;
