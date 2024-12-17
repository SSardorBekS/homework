"use client"

import * as React from "react"
import { ChevronDown, Plus } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
            <SidebarMenuButton className="w-fit px-1.5">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                {/* <activeTeam.logo className="size-3" /> */}
              </div>
              <span className="truncate font-semibold">HomeWork</span>
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
