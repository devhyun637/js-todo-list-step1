import todo from "./todo.js";

import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";
import TodoCount from "./component/TodoCount.js";
import TodoFilter from "./component/TodoFilter.js";

function app() {
  const renderTodo = () => {
    const filteredTodo = todo.filterItems();
    todoList.renderTodoList(filteredTodo);
    todoCount.renderTodoCount(filteredTodo);
  };

  const init = () => {
    renderTodo();
  };

  new TodoInput(renderTodo);
  const todoList = new TodoList(renderTodo);
  const todoCount = new TodoCount(renderTodo);
  new TodoFilter(renderTodo);
  init();
}

new app();
