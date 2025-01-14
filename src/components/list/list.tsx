import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import styles from "./list.module.scss";
import { ITask } from "@/utils/interfaces/task";
import { json } from "stream/consumers";
import { randomUUID } from "crypto";

export function List() {
  const [newTask, setNewTask] = useState<string>("");
  const [todoList, setTodoList] = useState<any[]>([]);
  const [uncompletedTasks, setUncompletedTasks] = useState<[]>([]);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);

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

  // useEffect(() => {
  //   const updateCompleted = () => {
  //     let localCompleted = localStorage.getItem("@completedTasks") || "";

  //     if (localCompleted) {
  //       const formattedList = JSON.parse(localCompleted);
  //       setUncompletedTasks(formattedList);
  //     }
  //   };
  //   updateCompleted();
  //   console.log(completedTasks);
  // }, [completedTasks]);

  function addNewNote() {
    console.log(completedTasks);

    // let newTodoList = todoList;

    // let task: ITask = {
    //   task_name: newTask,
    //   task_status: false,
    //   task_id: uuid(),
    // };

    // todoList.push(task);
    // localStorage.setItem("@todolist", JSON.stringify(todoList));
  }

  function completeTask(item: ITask) {
    item.task_status = !item.task_status;

    if (!completedTasks.includes(item) && item.task_status == true) {
      const newCompleted = [...completedTasks, item];
      localStorage.setItem("@completedTasks", JSON.stringify(newCompleted));
      setCompletedTasks(newCompleted);
    }

    if (item.task_status === false) {
      const taksList = completedTasks;
      const task = taksList.indexOf(item);
      if (task > -1) {
        taksList.splice(task, 1);
        setCompletedTasks(taksList);
      }
    }
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
          // disabled={newTask ? false : true}
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
                onChange={() => completeTask(item)}
              />
              <label htmlFor="check_task">{item.task_name}</label>
            </div>
          );
        })}
        <div className={`${styles.item} ${styles.item}`}>
          <div>{todoList.length} items left</div>
        </div>
      </div>
    </div>
  );
}
