import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TextInput } from 'react-native';
import tasks from "../tasks.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
    padding: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  taskListMain: {
    padding: 15
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
    const filteredElements = tasks.filter(task => task.importance === this.state.filterBy || this.state.filterBy === "all");
    const taskElements = filteredElements.map((task) => {
      return {key: task.title};
    });

    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <Text>Filter</Text>
        </View>
        <View style={styles.taskList}>
          <Text>Task list</Text>
          <View style={styles.taskListMain}>
            <FlatList data={taskElements} renderItem={({item}) => <Text>{item.title}</Text>}/>
          </View>
        </View>
        <View style={styles.addFieldWrap}>
            <TextInput placeholder="Type a task" onChangeText={this.handleChange}/>
        </View>
      </View>
    );
  }
  handleChange = (val) => {
    this.setState({newTaskTitle: val});
  }

}