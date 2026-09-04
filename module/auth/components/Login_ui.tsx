"use client"
import React from "react"
import { signIn } from "@/lib/auth-client"
import { GitBranchIcon } from "lucide-react"
import { useState } from "react"

const LoginUI = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleGithubLogin = async () => {
    setIsLoading(true)
    try {
      await signIn.social({
        provider: "github",
      })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex bg-linear-to-br from-black via-zinc-900 to-zinc-700 text-white">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center px-12 py-16">
        <div className="max-w-lg">
        {/*Logo */}
        <div className="mb-28">
          <div className="inline-flex items-center gap-2 text-2xl font-black">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center object-contain">
            </div>
              <span className="">Code Review</span>
          </div>
          {/* Main Content */}
          <h1 className="mb-4 text-5xl leading-tight font-bold text-white">
            Reduce Code Review Time and Fixing Bugs,
            <span className="block">Instantly.</span>
          </h1>
          <p className="text-lg leading-relaxed text-gray-400 mb-8">
            Supercharge your team to ship faster with an advance AI Code
            review.
          </p>
        </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-12 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-12">
            <h2 className="mb-2 text-3xl font-bold">Welcome Back</h2>
            <p className="text-gray-400">
              Login using one of the following providers:
            </p>
          </div>

          {/* Github Login */}
          <button
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="mb-8 flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-4 py-3 font-semibold text-black transition-colors hover:bg-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <GitBranchIcon size={20} />
            {isLoading ? "Signing in..." : "Github"}
          </button>

          {/* Footer Links */}
          <div className="space-y-4 text-center text-sm text-gray-400">
            <div>
              New to CodeRabbit?{' '}
              <a href="a" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Sign Up
              </a>
            </div>
            <div>
              <a
                href="a"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Self-Hosted Services
              </a>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-12 pt-8 border-t  border-gray-700 flex justify-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-400">Terms of Use</a>
            <span>and</span>
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginUI
