"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { User } from "lucide-react";

interface UserInfoCellProps {
  name?: string;
  email?: string;
  photo?: string | null;
  gender?: string,
  userId?: string
}

export function UserInfoCell({ userId, name, email, photo, gender }: UserInfoCellProps) {

  let userPlaceholderImage = gender?.toUpperCase() === 'MALE' ? '/images/man.png' : '/images/woman.png'

  return (
    <div className="flex items-center gap-3">
      <Link target="_blank" href={`/traveler-profile/${userId}`}>
        <Avatar className="w-10 h-10 border">
          {photo && <AvatarImage src={photo} alt={name || 'user'} className="object-cover" />}
          <AvatarFallback className="bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-semibold">
            {name ? name.slice(0, 2).toUpperCase() : <User className="size-4 text-gray-500" />}
          </AvatarFallback>
        </Avatar>
      </Link>

      <div>
        <Link target="_blank" href={`/traveler-profile/${userId}`}>
          <p className="font-medium hover:underline">{name}</p>
        </Link>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}