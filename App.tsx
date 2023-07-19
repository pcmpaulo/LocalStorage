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
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    createTable();
    showNotes();
  }, [filter]);

  async function showNotes() {
    const response = await listNote(filter);
    setNotes(response);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalPicker}>
        <Picker
          selectedValue={filter}
          onValueChange={newFilter => {
            setFilter(newFilter);
          }}>
          <Picker.Item label="All" value={'All'} />
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
  modalPicker: {
    padding: 10,
    borderTopWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default App;
