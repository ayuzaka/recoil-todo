declare namespace Todo {
  export type TodoItemType = {
    id: string
    text: string
    isComplete: boolean
  }

  export type FilterType = 'Show All' | 'Show Completed' | 'Show Uncompleted'
}
