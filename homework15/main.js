const form = document.querySelector('.js--form');
const input = document.querySelector('.js--form__input');
const todosWrapper = document.querySelector('.js--todos-wrapper');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

renderTodos();

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const todoText = input.value.trim(); 
  if (todoText === '') return;

  const newTodo = {
    id: Date.now(),
    text: todoText,
    checked: false
  };

  todos.push(newTodo); 
  saveToLocalStorage(); 
  renderTodos(); 

  input.value = ''; 
});

function renderTodos() {
  todosWrapper.innerHTML = ''; 

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.checked ? 'todo-item--checked' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.checked;

    checkbox.addEventListener('change', () => {
      todo.checked = checkbox.checked; 
      saveToLocalStorage();
      renderTodos(); 
    });

    const span = document.createElement('span');
    span.className = 'todo-item__description';
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-item__delete';
    deleteBtn.textContent = 'Видалити';

    deleteBtn.addEventListener('click', () => {
      todos = todos.filter(item => item.id !== todo.id);
      saveToLocalStorage(); 
      renderTodos(); 
    });


    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    todosWrapper.appendChild(li);
  });
}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
