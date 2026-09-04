import { Button } from "@/components/ui/button"
import Logout from "@/module/auth/components/Logout"
import { requireAuth } from "@/module/auth/utils/auth-utils"


export default async function Logou() {
  await requireAuth()
  return (
    <div className="flex min-h-svh p-6">
      <Logout>
        <Button className="bg-primary">Logout</Button>
      </Logout>
    </div>
  )
}
