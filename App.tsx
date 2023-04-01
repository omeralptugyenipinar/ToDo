
import React, { useRef,useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Button,
  Pressable,
} from 'react-native';

function App(): JSX.Element {
  const [counter, setCounter] = useState(0);
  const textRef = useRef(null);

  const [color, setColor] = useState('#808080');
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [newcolor, setNewColor] = useState('#7DA453');
  const [newtextcolor, setNewTextColor] = useState('white');

  function addTodo() {
    if (text === '') {
      return;
    }

    const newTodo = { id: Date.now(), text: text, completed: false };
    setTodos([...todos, newTodo]);
    setText('');
    setColor('#808080');
    setCounter(todos.length + 1);
  }

  function handlePress(id: number) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      })
    );
  }

  function changeTextHandler(value: string) {
    setText(value);
    if (value === '') {
      setColor('#808080');
    } else {
      setColor('#FFA500');
    }
  }

  useEffect(() => {
      const numUncompleted = todos.filter((todo) => !todo.completed).length;
      setCounter(numUncompleted);
    }, [todos]);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Yapılacaklar</Text>
        <Text style={styles.counterText}>{counter}</Text>
      </View>
      <ScrollView style={styles.list}>
        {todos.map((todo) => (
          <Pressable
            key={todo.id}
            style={[
              styles.new,
              { backgroundColor: todo.completed ? '#37474F' : newcolor },
            ]}
            onPress={() => handlePress(todo.id)}
          >
            <Text
              style={[
                styles.todoText,
                {
                  marginLeft: 10,
                  marginTop: 5,
                  textDecorationLine: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'gray' : 'white',
                },
              ]}
            >
              {todo.text}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.saveSection}>
        <TextInput
          style={styles.textInput}
          ref={textRef}
          placeholder="Yapılacak..."
          placeholderTextColor="#808080"
          onChangeText={changeTextHandler}
          value={text}
        />
        <View style={styles.stripe}></View>
        <Pressable
          id="button"
          style={[styles.button, { backgroundColor: color }]}
          onPress={addTodo}
        >
          <Text style={styles.buttonText}>Kaydet</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#102027',
    flex: 1,
  },

  innerContainer: {
    flexDirection: 'row',
  },

  text: {
    marginLeft: 10,
    color: '#FFA500',
    fontSize: 50,
    fontWeight: 'bold',
  },

  counterText: {
    fontSize: 50,
    color: '#FFA500',
    fontWeight: 'bold',
    marginLeft: 'auto',
  },

  saveSection: {
   margin:10,
   backgroundColor: '#37474F',
   height: Dimensions.get('window').height/7,
   marginTop: 'auto',
   marginBottom: 30,
   borderRadius: 10,
  },

  button: {
    borderRadius: 10,
    padding: 10,
    margin: 15,
    alignItems: 'center',
  },

  buttonText: {
    color:'white',
  },

  stripe: {
   backgroundColor: '#78909C',
   height: 1,
   marginRight: 10,
   marginLeft: 10,
  },

  list: {
    flex: 1,
  },

  textInput: {
    marginLeft: 10,
    color: 'white',
  },

  new: {
    height: 30,
    margin: 5,
    borderRadius: 10,
  },


});

export default App;
