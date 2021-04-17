import { useRef, useEffect } from 'react'
import { customFetchJSON, HttpMethod } from '../utils/Fetch'

export const useFetch = () => {
  const abortControllerRef = useRef(new AbortController())

  const customFetch = async <Req, Res>(url: string, httpMethod: HttpMethod, body: Req) => {
    const response = await customFetchJSON<Req, Res>(url, httpMethod, body, abortControllerRef.current.signal)

    return response
  }

  useEffect(
    () => () => {
      abortControllerRef.current.abort()
    },
    []
  )

  return customFetch
}
