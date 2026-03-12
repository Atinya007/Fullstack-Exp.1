let tasks = [];
function addTask() {
  const name = taskName.value.trim();
  if (!name) return;
  tasks.push({ name, priority: priority.value, completed: false });
  taskName.value = "";
  render(tasks);
}
function render(list) {
  listEl.innerHTML = "";
  list.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${t.name} [${t.priority}]`;
    li.onclick = () => { tasks[i].completed = !tasks[i].completed; render(tasks); };
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = e => {
      e.stopPropagation(); 
      tasks.splice(i, 1);
      render(tasks);
    };
    li.appendChild(delBtn);
    listEl.appendChild(li);
  });
}
function filter(type) {
  render(
    type === "all"
      ? tasks
      : tasks.filter(t => type === "completed" ? t.completed : !t.completed)
  );
}
const listEl = document.getElementById("list");
