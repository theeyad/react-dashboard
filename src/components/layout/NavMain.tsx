import { type IconType } from "react-icons"
import { useLocation, useNavigate } from 'react-router'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export default function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: IconType
  }[]
}) {
  const navigate = useNavigate();
  let location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                className="cursor-pointer" 
                isActive={location.pathname === item.url}
                onClick={() => {
                  if (location.pathname === item.url) return;
                  navigate(item.url)
                }} 
                tooltip={item.title}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
