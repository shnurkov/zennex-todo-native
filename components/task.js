import React, {Component} from 'react';
import { StyleSheet, View, Text, CheckBox, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    titleWrap: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    delete: {
        borderRadius: 14,
        width: 28,
        height: 28,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    activeTask: {
        borderWidth: 1.5,
        borderColor: "#40A9FF"
    },
    doneTask: {
        textDecorationLine: "line-through",
        color: "#eee"
    },
    overdueTask: {
        backgroundColor: "#f3e0e0",
        borderWidth: 0,
    },
    overdueActiveTask: {
        borderWidth: 1.5,
        borderColor: "#eabcbc",
        backgroundColor: "#f3e0e0"
    },
    title: {
        marginLeft: 10
    },
    importance: {
        marginLeft: 8
    },
    importanceLabel: {
        width: 10,
        height: 2,
        backgroundColor: "gray",
        marginBottom: 1
    },
    importanceLabelDone: {
        width: 10,
        height: 2,
        backgroundColor: "#eee",
        marginBottom: 1
    }
});

export default class Task extends Component{
    render() {
        const {task, activeTaskId} = this.props;
        let taskClassName = [styles.container];
        // if(task.isDone) taskClassName.push(styles.doneTask);
        if(activeTaskId === task.id) taskClassName.push(styles.activeTask);

        if(task.isOverdue && activeTaskId === task.id) taskClassName.push(styles.overdueActiveTask);
        else if(task.isOverdue) taskClassName.push(styles.overdueTask);
        console.log("length: ", task.title.length);
        console.log("cut: ", task.title.slice(0, 20) + "...");
        return (
            <TouchableHighlight  activeOpacity={1} underlayColor="#fff" onPress = {this.handleActiveBtn}>
            <View style={taskClassName}>
                <View style={styles.titleWrap}>
                    <CheckBox containerStyle={{backgroundColor: 'blue'}} value = {task.isDone} onChange = {this.handleDoneBtn}/>
                    <View style={styles.importance}>
                        <View style={task.isDone ? styles.importanceLabelDone :styles.importanceLabel} />
                        {(task.importance === "important" || task.importance === "very-important") &&<View style={task.isDone ? styles.importanceLabelDone :styles.importanceLabel} />}
                        {(task.importance === "very-important") &&<View style={task.isDone ? styles.importanceLabelDone :styles.importanceLabel} />}
                    </View>
                    <Text style={task.isDone ? [styles.title, styles.doneTask] : styles.title}>{task.title.length > 25 ? task.title.slice(0, 22) + "...": task.title}</Text>
                </View>
                <TouchableHighlight style={styles.delete} activeOpacity={1} underlayColor="#eee" onPress = {this.handleDeleteBtn}>
                    <View>
                    <Icon
                        name='close'
                        type='material'
                        color='#000'
                    />
                    </View>
                </TouchableHighlight>
            </View>
            </TouchableHighlight>
        );
    }
    handleDeleteBtn = (e) => {
        e.stopPropagation();
        this.props.del(this.props.task.id);
      }
    handleDoneBtn = (e) => {
        e.stopPropagation();
        this.props.setDone(this.props.task.id);
    }
    handleActiveBtn = (e) => {
        e.stopPropagation();
        this.props.setActive(this.props.task.id);
    }
}
