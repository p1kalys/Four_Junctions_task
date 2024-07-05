import { useState, useEffect } from "react"
import { SignUpData } from "../types/auth"
import authService from "../services/auth.services"

const useSignUp = () => {
  const [signUpData, setSignUpData] = useState<SignUpData | null>(null)
  const [response, setResponse] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (signUpData) {
        await authService.register(signUpData)
          .then((response: any) => {
            setResponse(response.data)
          })
          .catch((e: Error) => {
            console.log(e)
          })
      }
    }

    fetchData()
  }, [signUpData])

  return { response, setSignUpData }
}

export default useSignUp
