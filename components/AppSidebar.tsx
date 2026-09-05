"use client"
import {
  FolderGitIcon,
  BookOpen,
  Settings,
  Moon,
  Sun,
  LogOut,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import Link from "next/link"
import Logout from "@/module/auth/components/Logout"

export const AppSidebar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigationItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BookOpen,
    },
    {
      title: "Repository",
      url: "/dashboard/repository",
      icon: FolderGitIcon,
    },
    {
      title: "Reviews",
      url: "/dashboard/reviews",
      icon: BookOpen,
    },
    {
      title: "Subscription",
      url: "/dashboard/subscription",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + "/dashboard")
  }

  if (!mounted || !session) return null
  const user = session.user
  const userName = user.name || "GUEST"
  const userEmail = user.email || ""
  const userAvatar = user.image || ""
  const userinitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col gap-4 px-2 py-6">
          <div className="flex items-center gap-4 rounded-lg bg-sidebar-accent/50 px-3 py-4 transition-colors hover:bg-sidebar-accent/70">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FolderGitIcon className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-wide text-sidebar-foreground">
                Connected Account
              </p>
              <p className="text-sm font-medium text-sidebar-foreground">
                @{userName}
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-col gap-1 px-3 py-6">
        <div className="mb-2">
          <p className="mb-3 px-3 text-xs font-semibold tracking-widest text-sidebar-foreground/60 uppercase">
            Menu
          </p>
        </div>
        <SidebarMenu className="gap-2">
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                // asChild
                tooltip={item.title}
                className={`h-11 rounded-lg px-4 transition-all duration-200 ${isActive(item.url) ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/60"}`}
              >
                <Link href={item.url} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SidebarMenuButton
                  size={"lg"}
                  className="h-12 rounded-lg px-4 transition-colors hover:bg-sidebar-accent/50 data-state-open:bg-sidebar-accent data-state-open:text-sidebar-accent-foreground"
                >
                  <Avatar className={"h-10 w-10 shrink-0 rounded-lg"}>
                    <AvatarImage
                      src={userAvatar || "/placeholder.svg"}
                      alt={userName}
                    />
                    <AvatarFallback className={"rounded-lg"}>
                      {userinitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid min-w-0 flex-1 text-left text-sm leading-relaxed">
                    <span className="truncate text-base font-semibold">
                      {userName}
                    </span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      {userEmail}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={"w-80 rounded-lg"}
                align="end"
                side="right"
                sideOffset={8}
              >
                <div className="border-t border-b px-2 py-3">
                  <div className="flex gap-3 px-2 py-2">
                    <Avatar className={"h-10 w-10 shrink-0 rounded-lg"}>
                      <AvatarImage
                        src={userAvatar || "/placeholder.svg"}
                        alt={userName}
                      />
                      <AvatarFallback className={"rounded-lg"}>
                        {userinitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid min-w-0 flex-1 text-left text-sm leading-relaxed">
                      <span className="truncate text-base font-semibold">
                        {userName}
                      </span>
                      <span className="truncate text-xs text-sidebar-foreground/70">
                        {userEmail}
                      </span>
                    </div>
                  </div>

                  <DropdownMenuItem>
                    <button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="flex w-full cursor-pointer items-center gap-3 rounded-md px-1 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent/50"
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun className="h-5 w-5 shrink-0" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="h-5 w-5 shrink-0" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={
                      "my-1 cursor-pointer rounded-md px-3 py-3 font-medium transition-colors hover:bg-red-500/10 hover:text-red-600"
                    }
                  >
                    <LogOut className="mr-3 h-5 w-5 shrink-0" />
                    <Logout>Logout</Logout>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
