const endpoint = 'http://localhost:3030'

export type HttpMethod = 'GET' | 'POST'

type FetchError = {
  code: number
  message: string
}

export const customFetchJSON = async <Req, Res>(
  url: string,
  method: HttpMethod,
  body?: Req,
  signal?: AbortSignal
): Promise<Success<Res> | Failure<FetchError>> => {
  try {
    const response = await fetch(`${endpoint}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      signal,
    })

    if (!response.ok) {
      const result: FetchError = await response.json()

      return {
        type: 'failure',
        value: result,
      }
    }

    const result: Res = await response.json()

    return {
      type: 'success',
      value: result,
    }
  } catch (error: unknown) {
    return {
      type: 'failure',
      value: {
        code: 500,
        message: 'unexpected error',
      },
    }
  }
}
