import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);

    if(taskWithSameTitle){
      return Alert.alert('Task já cadastrada', 'Você não pode inserir uma tarefa que tenha um título já existente')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => ({...task}))

    const foundItem = updatedTask.find(item => item.id === id);

    if(!foundItem) {
      return;

    } else {
      foundItem.done = !foundItem.done;
      setTasks(updatedTask)  
    }
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const updatedTask = tasks.map(task => ({...task}))

    const taskToBeUpdated = updatedTask.find(item => item.id === taskId);

    if(!taskToBeUpdated) {
      return;

    } else {
      taskToBeUpdated.title = taskNewTitle;
      setTasks(updatedTask)
    }

  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover a tareda?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updateTask = tasks.filter(task => task.id !== id);

        setTasks(updateTask)
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})