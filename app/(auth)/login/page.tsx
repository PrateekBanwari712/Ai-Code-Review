
import LoginUI from '@/module/auth/components/Login_ui'
import {requireUnAuth} from "@/module/auth/utils/auth-utils"
import React from 'react'

const LoginPage = async() => {
  await requireUnAuth();
  return (
    <div>
        <LoginUI/>
    </div>
  )
}

export default LoginPage