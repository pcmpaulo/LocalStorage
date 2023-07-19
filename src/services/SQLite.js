import { openDatabase } from 'react-native-sqlite-storage';
function openConnection() {
  return openDatabase('database.db');
}

export const database = openConnection();
