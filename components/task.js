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
    title: {
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
    }
});

export default class Task extends Component{
    render() {
        const {task} = this.props;
        return (
            <TouchableHighlight  activeOpacity={1} underlayColor="#fff" onPress = {this.handleActiveBtn}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <CheckBox value = {task.isDone} onChange = {this.handleDoneBtn}/>
                    <Text style={{marginLeft: 10}}>{task.title}</Text>
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
