type Success<T> = {
  type: 'success'
  value: T
}

type Failure<E> = {
  type: 'failure'
  value: E
}

type Result<T, E> = Success<T> | Failure<E>

type ValueOf<T> = T[keyof T]
