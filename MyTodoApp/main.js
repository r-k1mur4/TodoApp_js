"use strict";

{

  // let todos = JSON.parse(localStorage.getItem('todos')) || [];


  let todos;

// localStorageにtodosプロパティがあるか確認
if (localStorage.getItem('todos') === null) {
  // ない場合はからの配列を作成
  todos = [];
} else {
  // ある場合はtodosを読み込み
  todos = JSON.parse(localStorage.getItem('todos'));
}

  const renderTodo = (todo) => {
    /*
    - li
      - label
        - input
        - span
      - button
    */

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = todo.isCompleted;

    const span = document.createElement("span");
    span.textContent = todo.title;

    const label = document.createElement("label");

    label.appendChild(input);
    label.appendChild(span);

    const button = document.createElement("button");
    button.textContent = "x";
    // 削除ボタン
    button.addEventListener('click', () => {
      if (!confirm('Sure?')) {
        return;
      }
        li.remove();
    });


    const li = document.createElement("li");
    li.appendChild(label);
    li.appendChild(button);
    // ulタグにliを追加していく
    document.querySelector("#todos").appendChild(li);
  };

  const renderTodos = () => {
    todos.forEach((todo) => {
      renderTodo(todo);
    });
  };

  // 項目の追加
  document.querySelector("#add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#add-form input");
    const todo = {
      title: input.value,
      isCompleted: false,
    };
    renderTodo(todo);
    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));

    input.value = "";
    input.focus();
  });

  renderTodos();

}
