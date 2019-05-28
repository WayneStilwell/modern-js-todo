'use strict'

const getSavedTodos = () => {
  const todoJSON = localStorage.getItem('todos')

  try {
    return todoJSON ? JSON.parse(todoJSON) : []
  } catch (e) {
    return []
  }
}

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id)

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1)
  }
}

const renderTodos = (todos, filters) => {
  const todoList = document.querySelector('#todos')
  todoList.innerHTML = ''

  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed

    return searchTextMatch && hideCompletedMatch
  })

  todoList.appendChild(generateSummaryDOM(filteredTodos))

  filteredTodos.forEach(function (todo) {
    todoList.appendChild(generateTodoDOM(todo))
  })
}

const getTodosLeft = (todos) => {
  const todosLeft = todos.filter((todo) => !todo.completed)

  return todosLeft.length
}

const generateTodoDOM = (todo) => {
  const container = document.createElement('div')

  const checkBox = document.createElement('input')
  checkBox.setAttribute('type', 'checkbox')
  checkBox.checked = todo.completed
  checkBox.addEventListener('change', () => {
    toggleTodo(todo)
    saveTodos(todos)
    renderTodos(todos, filters)
  })
  container.appendChild(checkBox)

  const textSpan = document.createElement('span')
  textSpan.textContent = todo.text
  container.appendChild(textSpan)

  const removeButton = document.createElement('button')
  removeButton.textContent = 'x'
  container.appendChild(removeButton)
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

  return container
}

const generateSummaryDOM = (todos) => {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${getTodosLeft(todos)} todos left`

  return summary
}

const toggleTodo = (todo) => {
  todo.completed = !todo.completed
}
