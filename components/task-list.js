import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import Task from "../components/task";
import tasks from "../tasks.json";

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
    flex: 5,
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
          <Text>Filter</Text>
        </View>
        <View style={styles.taskList}>
          <View style={styles.taskListMain}>
            <FlatList
              data={taskElements}
              renderItem={({item}) => <Task task = {item} del = {this.deleteTask} setDone = {this.setTaskDone} isDone = {item.isDone} setActive = {this.setActiveTask} isActive = {this.state.activeTaskId} />}
            />
          </View>
        </View>
        <View style={styles.addFieldWrap}>
          <TextInput style={styles.taskAddField} placeholder="Type a task" onChangeText={this.handleChange}/>
          <View style={styles.addFieldBtn}>
            <Icon
              name='send'
              type='material'
              color='#eee'
            />
          </View>

        </View>
      </KeyboardAvoidingView>
    );
  }
  componentDidMount(){
    this.setState({tasks});
  }
  handleChange = (val) => {
    this.setState({newTaskTitle: val});
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