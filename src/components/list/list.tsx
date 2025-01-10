import { useEffect, useState } from "react";
import styles from "./list.module.scss";
import { ITask } from "@/utils/interfaces/task";
import { json } from "stream/consumers";

export function List() {
  const [newTask, setNewTask] = useState<string>("");
  const [todoList, setTodoList] = useState<any[]>([]);

  useEffect(() => {
    const updateList = () => {
      let localTodoList = localStorage.getItem("@todolist") || "";

      if (localTodoList) {
        const formattedList = JSON.parse(localTodoList);
        setTodoList(formattedList);
      }
    };
    updateList();
  }, [newTask]);

  function addNewNote() {
    let newTodoList = todoList;

    let task: ITask = {
      task_name: newTask,
      task_status: false,
    };

    todoList.push(task);
    localStorage.setItem("@todolist", JSON.stringify(todoList));

    console.log(todoList);
  }

  return (
    <div className={styles.list_container}>
      <div>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.currentTarget.value)}
          type="text"
          placeholder="Create a new todo..."
        />
        <button
          onClick={addNewNote}
          disabled={newTask ? false : true}
          className={styles.add_button}
        >
          +
        </button>
      </div>

      <div className={styles.list_items}>
        {todoList.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <input
                value={item.task_status}
                type="checkbox"
                name="check_task"
              />
              <label>{item.task_name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
