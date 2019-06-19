import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TextInput, KeyboardAvoidingView, TouchableHighlight, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import Task from "../components/task";
import TaskDesc from "../components/task-description";
import Filter from "../components/filter";
// import tasks from "../tasks.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 5
  },
  filter: {
    flex: 1,
  },
  taskList: {
    flex: 6,
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  addFieldWrap: {
    height: 50,
    backgroundColor: 'rgba(250, 251, 252, 0.77)',
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  taskListMain: {
    // padding: 15
  },
  taskAddField: {
    backgroundColor: "#fff",
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    position: "relative"
  },
  addFieldBtn: {
    position: "absolute",
    right: 15,
    top: 13
  }
});

export default class TaskList extends Component{
  state = {
    tasks: [],
    filterBy: "all",
    activeTaskId: null,
    newTaskTitle: "",
    uniqueId: 0
  }

  render() {
    const filteredElements = this.state.tasks.filter(task => task.importance === this.state.filterBy || this.state.filterBy === "all");
    const taskElements = filteredElements.map((task) => {
      task.key = task.id + "";
      return task;
    });

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.filter}>
          <Filter filter = {this.filterTasks} filterBy = {this.state.filterBy}/>
        </View>
        <View style={styles.taskList}>
          <View style={styles.taskListMain}>
            <FlatList
              data={taskElements}
              renderItem={({item}) => <Task task = {item} del = {this.deleteTask} setDone = {this.setTaskDone} isDone = {item.isDone} setActive = {this.setActiveTask} activeTaskId = {this.state.activeTaskId} />}
            />
          </View>
        </View>
        <View style={styles.addFieldWrap}>
          <TextInput style={styles.taskAddField} value = {this.state.newTaskTitle} placeholder="Type a task" onChangeText={this.handleChange} onSubmitEditing = {this.handleAddTaskBtn}/>
          <TouchableHighlight style={styles.addFieldBtn}  activeOpacity={1} underlayColor="#fff" onPress = {this.handleAddTaskBtn}>
            <View >
              <Icon
                name='send'
                type='material'
                color='#eee'
              />
            </View>
          </TouchableHighlight>
        </View>
        <TaskDesc task = {this.getActiveTask()} edit = {this.editTask}  del = {this.deleteTask} close = {this.closeDesc}/>
      </KeyboardAvoidingView>
    );
  }
  async componentDidMount(){
    let savedTasks = await this.getTasks();
    let uniqueId = 0;
    if(savedTasks){
      savedTasks = JSON.parse(savedTasks);
      savedTasks.forEach((task) => {
        if(task.id > uniqueId) uniqueId = task.id;
        if(task.time.end){
          task.time.end = new Date(task.time.end);
          task.timer = this.setTimerOverdue(task, task.id)();
        }
      });
      this.setState({tasks: savedTasks, uniqueId});
    }
  }
  componentDidUpdate = () => {
    if(JSON.stringify(this.state.tasks) !== this.getTasks()){
      this.saveTasks();
    }
  }
  handleChange = (val) => {
    this.setState({newTaskTitle: val});
  }
  handleAddTaskBtn = () => {
    if(this.state.newTaskTitle){
      this.setState({newTaskTitle: ""});
      this.addNewTask();
    }
  }
  addNewTask = () => {
    let tasks = this.state.tasks;
    let uniqueId = this.state.uniqueId;
    uniqueId++;
    tasks.push({
      id: uniqueId,
      title: this.state.newTaskTitle,
      description: null,
      importance: "usual",
      time: {
        end: null,
        done: null
      },
      isOverdue: false,
      isDone: false,
      timer: null
    });
    this.setState({tasks, uniqueId, filterBy: "all"});
  }
  deleteTask = (id) => {
    let tasks = this.state.tasks;
    let delIndex = this.getTaskById(id).index;
    // clearTimeout(tasks[delIndex].timer);
    tasks.splice(delIndex, 1);
    this.setState({tasks, activeTaskId: null});
  }
  setTaskDone = (id) => {
    let tasks = this.state.tasks;
    let doneIndex = this.getTaskById(id).index;

    tasks[doneIndex].isDone = !tasks[doneIndex].isDone;
    tasks[doneIndex].time.done = new Date();
    this.setState({tasks});
    // this.checkOverdue(id);
  }
  setActiveTask = (id) => {
    this.setState({activeTaskId: id});
  }
  getActiveTask = () => {
    return this.state.activeTaskId && this.getTaskById(this.state.activeTaskId).task;
  }
  editTask = (id, editElem) => {
    let item = this.getTaskById(id);
    let task = item.task, index = item.index;

    (editElem.title || editElem.title === "") && (task.title = editElem.title);
    (editElem.description || editElem.description === "") && (task.description = editElem.description);
    editElem.importance && (task.importance = editElem.importance);
    (editElem.time ||  editElem.time === null) && (task.time.end = editElem.time);
    if(editElem.time){
      task.timer = this.setTimerOverdue(task, id)();
    }
    let newTasksState = this.state.tasks.slice();
    newTasksState.splice(index, 1, task);

    this.setState({tasks: newTasksState});
  }
  setTimerOverdue = (task, id) => {
    return () => {
      task.isOverdue = false;
      let timeToCheck = task.time.end.getTime() - (new Date()).getTime();
      console.log(task.title, Math.ceil(timeToCheck/1000));
      if(task.timer) clearTimeout(task.timer);
      return setTimeout(() => {
        this.checkOverdue(id);
      }, timeToCheck)
    }
  }
  checkOverdue = (id) => {
    let item = this.getTaskById(id);
    let task = item.task, index = item.index;
    if(!task.time.end) return;
    let tasks = this.state.tasks.slice();

    if(((new Date()).getTime() > task.time.end.getTime()) && !task.isDone) {
      task.isOverdue = true;
    }else if(task.isDone){
      task.isOverdue = false;
    }
    tasks.splice(index, 1, task);
    this.setState({tasks});

  }
  saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }catch (e){
      console.log(e);
    }
  }
  getTasks = async () => {
    try {
      const value = await AsyncStorage.getItem('tasks');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };
  filterTasks = (filterBy) => {
    this.setState({filterBy});
  }
  closeDesc = () => {
    this.setState({activeTaskId: null});
  }

  getTaskById = (id) => {
    let tasks = this.state.tasks;
    for (let i = 0; i < tasks.length; i++){
      if(tasks[i].id  === id){
        return {
          task: tasks[i],
          index: i
        }
      }
    }
  }

}