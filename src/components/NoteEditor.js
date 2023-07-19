import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {createNote, deleteNote, updateNote} from '../services/Notes';

export default function NoteEditor({showNotes, selectedNote, setSelectedNote}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedNote.id) {
      fillModal();
      setModalVisible();
    }
  }, [selectedNote.id]);

  async function saveNote() {
    const note = {
      title: title,
      category: category,
      description: description,
    };
    if (selectedNote.id) {
      note.id = selectedNote.id;
      await updateNote(note);
    } else {
      await createNote(note);
    }
    await showNotes();
  }

  async function deleteSelectedNote() {
    await deleteNote(selectedNote.id);
    cleanModal();
    await showNotes();
  }

  async function fillModal() {
    setTitle(selectedNote.title);
    setCategory(selectedNote.category);
    setDescription(selectedNote.description);
  }

  async function cleanModal() {
    setTitle('');
    setCategory('Personal');
    setDescription('');
    setSelectedNote({});
    setModalVisible(false);
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centralizeModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Create Note</Text>
              <Text style={styles.modalSubTitle}>Title</Text>
              <TextInput
                style={styles.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={newText => setTitle(newText)}
                placeholder="write here your task title"
                value={title}
              />

              <View style={styles.modalPicker}>
                <Text style={styles.modalSubTitle}>Category</Text>
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

              <Text style={styles.modalSubTitle}>Description</Text>
              <TextInput
                style={styles.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={newDescription => setDescription(newDescription)}
                placeholder="write here your task"
                value={description}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonSave}
                  onPress={saveNote}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                {selectedNote.id ? (
                  <TouchableOpacity
                    style={styles.modalButtonDelete}
                    onPress={deleteSelectedNote}>
                    <Text style={styles.modalButtonText}>Delete</Text>
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                  style={styles.modalButtonCancel}
                  onPress={() => {
                    cleanModal();
                  }}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.addMemo}>
        <Text style={styles.addMemoText}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  centralizeModal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginTop: 8,
    marginHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 18,
  },
  modalInput: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#FF9A94',
  },
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#EEEEEE',
    marginBottom: 12,
  },
  modalSubTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonSave: {
    backgroundColor: '#2ea805',
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  modalButtonDelete: {
    backgroundColor: '#d62a18',
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#057fa8',
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
  },
  addMemo: {
    backgroundColor: '#54ba32',
    justifyContent: 'center',
    height: 64,
    width: 64,
    margin: 16,
    alignItems: 'center',
    borderRadius: 9999,
    position: 'absolute',
    bottom: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  addMemoText: {
    fontSize: 32,
    lineHeight: 40,
    color: '#FFFFFF',
  },
});
