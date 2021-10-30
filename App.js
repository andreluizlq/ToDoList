import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  AsyncStorage,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";

const Item = ({ item, removeTask }) => (
  <View style={styles.ContainerView}>
    <Text style={styles.Texto}>{item}</Text>
    <TouchableOpacity onPress={removeTask(item)}>
      <MaterialIcons
        name="delete-outline"
        size={25}
        color="#f64c75"
        position="absolute"
      />
    </TouchableOpacity>
  </View>
);

const App = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask === "") return;

    const search = task.filter((task) => task === newTask);

    if (search.length != 0) {
      Alert.alert("Atenção", "Nome da tarefa repetido!");
      return;
    }

    setTask([...task, newTask]);
    setNewTask("");

    Keyboard.dismiss();
  };

  const removeTask = (item) => async () =>
    Alert.alert(
      "Deletar tarefa",
      "Tem certeza que deseja remover esta anotação?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => setTask(task.filter((task) => task != item)),
        },
      ],
      { cancelable: false }
    );

  useEffect(() => {
    const loadData = async () => {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    };
    loadData();
  }, []);

  const saveData = async () =>
    AsyncStorage.setItem("task", JSON.stringify(task));

  useEffect(() => {
    saveData();
  }, [task]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#E8EAED" />
        <View>
          <Text style={styles.Title}>Minhas Tarefas</Text>
        </View>
        <View style={styles.Body}>
          <FlatList
            style={styles.FlatList}
            data={task}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={(props) => <Item {...props} removeTask={removeTask} />}
          />
        </View>
        <View style={styles.Form}>
          <TextInput
            style={styles.Input}
            placeholderTextColor="#999"
            autoCorrect={true}
            placeholder="Adicione uma tarefa"
            textAlign="center"
            maxLength={40}
            onChangeText={setNewTask}
            value={newTask}
          />
          <TouchableOpacity style={styles.Button} onPress={addTask}>
            <Ionicons name="ios-add" size={25} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default App;
