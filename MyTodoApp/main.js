"use strict";

{
  // let todos = JSON.parse(localStorage.getItem('todos')) || [];

  let todos;

  // localStorageにtodosプロパティがあるか確認
  if (localStorage.getItem("todos") === null) {
    // ない場合はからの配列を作成
    todos = [];
  } else {
    // ある場合はtodosを読み込み
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
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
    input.addEventListener('change', () => {
      todos.forEach((item) => {
        if (item.id === todo.id) {
          item.isCompleted = !item.isCompleted;
        }
      })
    saveTodos();
    });

    const span = document.createElement("span");
    span.textContent = todo.title;

    const label = document.createElement("label");

    label.appendChild(input);
    label.appendChild(span);

    const button = document.createElement("button");
    button.textContent = "x";
    // 削除ボタン
    button.addEventListener("click", () => {
      if (!confirm("Sure?")) {
        return;
      }
      li.remove();

      todos = todos.filter((item) => {
        return item.id !== todo.id;
      })

      saveTodos();
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
      // 識別できるようにする
      id: Date.now(),
      title: input.value,
      isCompleted: false,
    };
    renderTodo(todo);
    todos.push(todo);
    console.table(todos);
    saveTodos();

    input.value = "";
    input.focus();
  });

  document.querySelector('#purge').addEventListener('click', () => {
    if (!confirm('Sure?')) {
      return;
    }
    todos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });
    saveTodos();
    document.querySelectorAll('#todos li').forEach((li) => {
      li.remove();
    });
    renderTodos();
  });

  renderTodos();
}
