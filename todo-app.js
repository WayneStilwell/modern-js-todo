'use strict'

let todos = getSavedTodos()

const filters = {
  searchText: '',
  hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#add-form').addEventListener('submit', (e) => {
  e.preventDefault()

  const textField = e.target.elements.newTodo
  todos.push({
    id: uuidv4(),
    text: textField.value,
    completed: false
  })
  saveTodos(todos)

  textField.value = ''

  renderTodos(todos, filters)
})

document.querySelector('#filter-todos').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderTodos(todos, filters)
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
  filters.hideCompleted = e.target.checked
  renderTodos(todos, filters)
})
