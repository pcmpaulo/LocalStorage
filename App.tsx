import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet, Text,
  View,
} from 'react-native';
import NoteEditor from './src/components/NoteEditor';
import {Note} from './src/components/Note';
import {createTable, listNote} from './src/services/Notes';
import {Picker} from '@react-native-picker/picker';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});

  useEffect(() => {
    createTable();
    showNotes();
  }, []);

  async function showNotes() {
    const response = await listNote();
    setNotes(response);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalPicker}>
        <Picker
          selectedValue={category}
          onValueChange={newCategory => {
            setCategory(newCategory);
          }}>
          <Picker.Item label="Personal" value={'Personal'} />
          <Picker.Item label="Work" value={'Work'} />
          <Picker.Item label="Others" value={'Others'} />
        </Picker>
      </View>
      <FlatList
        data={notes}
        renderItem={note => <Note {...note} setSelectedNote={setSelectedNote} />}
        keyExtractor={note => note.id}
      />
      <NoteEditor showNotes={showNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote}/>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalPicker: {},
});

export default App;
