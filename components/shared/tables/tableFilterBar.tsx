"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const TableFilterBar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [verifiedBadge, setVerifiedBadge] = useState<string>("");
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    // search
    if (searchText) {
      params.set("searchTerm", searchText);
    } else {
      params.delete("searchTerm");
    }

    // role
    if (role && role !== "ALL") {
      params.set("role", role);
    } else {
      params.delete("role");
    }

    // status
    if (status && status !== "ALL") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    // gender
    if (gender && gender !== "ALL") {
      params.set("gender", gender);
    } else {
      params.delete("gender");
    }

    // verified
    if (verifiedBadge && verifiedBadge !== "ALL") {
      params.set("verifiedBadge", verifiedBadge);
    } else {
      params.delete("verifiedBadge");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });

    console.log({
      searchText,
      role,
      status,
      gender,
      verifiedBadge,
    });
  }, [searchText, role, status, gender, verifiedBadge]);
  return (
    <div>
      <div className="flex items-center gap-3">
        {/* search by  */}
        <Input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search Name or Email"
        />

        {/* filter by role*/}
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">ALL</SelectItem>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="USER">USER</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* filter by status*/}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">ALL</SelectItem>
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="DELETED">DELETED</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* filter by GENDER*/}
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">ALL</SelectItem>
              <SelectItem value="MALE">MALE</SelectItem>
              <SelectItem value="FEMALE">FEMALE</SelectItem>
              <SelectItem value="OTHERS">OTHERS</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* filter by Verified status*/}
        <Select value={verifiedBadge} onValueChange={setVerifiedBadge}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select verified status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">ALL</SelectItem>
              <SelectItem value="true">VERIFIED</SelectItem>
              <SelectItem value="false">UNVERIFIED</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TableFilterBar;
