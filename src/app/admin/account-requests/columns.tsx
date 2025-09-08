"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Eye } from "lucide-react";

export interface AccountRequest {
  fullName: string;
  email: string;
  createdAt: Date | null;
  status: "APPROVED" | "PENDING" | "REJECTED" | null;
  universityCard: string | null;
  universityId: number;
}

export const columns: ColumnDef<AccountRequest>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getInitials(row.original.fullName || "A")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200"> {row.original.fullName}</p>
          <p className="text-xs text-light-500">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
    cell: ({ row }) => dayjs(row.original.createdAt).format("DD MMM YYYY"),
  },
  {
    accessorKey: "universityId",
    header: "University ID No",
  },
  {
    accessorKey: "universityCard",
    header: "University ID Card",
    cell: ({ row }) => (
      <Button variant="ghost" className="text-blue-600">
        <Eye /> View ID Card
      </Button>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
