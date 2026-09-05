import { Button } from "@/components/ui/button"
import Logout from "@/module/auth/components/Logout"
import { requireAuth } from "@/module/auth/utils/auth-utils"
import { redirect } from "next/navigation"


export default async function Logou() {
  await requireAuth()
  return redirect("/dashboard");
}
