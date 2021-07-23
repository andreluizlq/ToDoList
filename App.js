import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  AsyncStorage
} from 'react-native';

import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const[task, setTask] = useState([]);
  const[newTask, setNewTask] = useState('');

  async function addTask() {
    if (newTask === "") {
      return;
    }

    const search = task.filter(task => task === newTask)
    
    if(search.length != 0){
      Alert.alert("Atenção", "Nome da tarefa repetido!")
      return;
    }
    
    setTask([ ... task, newTask]);
    setNewTask('');

    Keyboard.dismiss();
  }

  async function removeTask(item) {
    Alert.alert(
      "Deletar tarefa",
      "Tem certeza que deseja remover esta anotação?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return
          },
          style:"cancel"
        },
        {
          text: "OK",
          onPress: () =>  setTask(task.filter(task => task != item))

        }
      ],
      {cancelable: false}
    );
  }

  useEffect(() => {
    async function loadData() {
      const task = await AsyncStorage.getItem("task");

      if(task) {
        setTask(JSON.parse(task));
      }
    }
    loadData();
  },[])

  useEffect(() => {
    async function saveData() {
      AsyncStorage.setItem("task", JSON.stringify(task))
    }
    saveData();
  }, [task])

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#E8EAED"/>
        <View>
          <Text style={styles.Title}>Minhas Tarefas</Text>
        </View>
        <View style={styles.Body}>
          <FlatList
            style={styles.FlatList}
            data={task}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>(
              <View style={styles.ContainerView}>
                <Text style={styles.Texto}>{item}</Text>
                <TouchableOpacity onPress={() => removeTask(item)}>
                  <MaterialIcons
                    name="delete-outline"
                    size={25}
                    color="#f64c75"
                    position="absolute"
                  />
                </TouchableOpacity>
              </View>
            )}
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
            onChangeText={ text => setNewTask(text)}
            value={newTask}
          />
          <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
            <Ionicons
              name="ios-add"
              size={25}
              color= "#FFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20
  },

  Body:{
    flex: 1
  },

  Title:{
    fontWeight:'bold',
    fontSize: 24,
    paddingTop: 50,
    paddingBottom: 30,
  },

  Form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 13,
  },

  Input: {
    width: 246,
    height: 45,
    backgroundColor:"#FFFFFF",
    borderRadius: 60,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  },

  Button: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 52,
    marginLeft: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  },

  FlatList: {
    flex: 1,
    marginTop: 5
  },

  ContainerView:{
    marginBottom: 15,
    padding: 15,
    borderRadius: 10 ,
    backgroundColor: "#FFFFFF",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  },

  Texto: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  }
});
