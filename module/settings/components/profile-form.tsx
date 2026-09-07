"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUserProfile, updateUserProfile } from "@/module/settings/actions"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/toast"

export function ProfileForm() {
  const queryClient = useQueryClient()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => await getUserProfile(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (profile) {
      setName(profile.name || "")
      setEmail(profile.email || "")
    }
  },[profile])

  const updateMutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      return await updateUserProfile(data)
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["user-profile"] })
        toast.add({
          type: "success",
          title: "Profile updated successfully",
        })
      }
    },
    onError: () =>
      toast.add({
        type: "error",
        title: "Failed to update profile",
      }),
  })
  // React.formevent work nahi kar raha tha
  const handleSubmit = (e: React.SyntheticEvent) => {
    updateMutation.mutate({ name, email })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-10 rounded bg-muted"></div>
            <div className="h-10 rounded bg-muted"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle> Profile Settings</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled = {updateMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Email</Label>
            <Input
              id="email"
              placeholder="john@doe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled = {updateMutation.isPending}
            />
          </div>
          <Button type="submit" disabled={updateMutation.isPending}>{updateMutation.isPending ? "Saving..." : "Save Changes"}</Button>
          
        </form>
      </CardContent>
    </Card>
  )
}
