import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";

interface Props {
  name: string;
}

function UserAvatar({ name }: Props) {
  return (
    <Avatar>
      <AvatarFallback className="bg-amber-100 text-black">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
