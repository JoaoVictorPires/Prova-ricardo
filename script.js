const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

const validate = () => inputElement.value.trim().length > 0;

const AddTask = () => {
  const inputIsValid = validate();

  console.log(inputIsValid);

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const ItemContainer = document.createElement("div");
  ItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far");
  deleteItem.classList.add("fa-trash-alt");

  deleteItem.addEventListener("click", () =>
    DeleteClick(ItemContainer, taskContent)
  );

  ItemContainer.appendChild(taskContent);
  ItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(ItemContainer);

  inputElement.value = "";

  updateLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const DeleteClick = (ItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      ItemContainer.remove();
    }
  }

  updateLocalStorage();
};

const InputChange = () => {
  const inputIsValid = validate();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasks = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const ItemContainer = document.createElement("div");
    ItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", () =>
      DeleteClick(ItemContainer, taskContent)
    );

    ItemContainer.appendChild(taskContent);
    ItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(ItemContainer);
  }
};

refreshTasks();

addTaskButton.addEventListener("click", () => AddTask());

inputElement.addEventListener("change", () => InputChange());