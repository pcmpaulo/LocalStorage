import {database} from './SQLite';

export function createTable() {
  database.transaction(transaction => {
    transaction.executeSql(
      'CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, description TEXT);',
    );
  });
}

export async function createNote(note) {
  /// We need to create a promise manually for this transaction
  return new Promise(resolve => {
    database.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO Notes (title, category, description) VALUES (?, ?, ?);',
        [note.title, note.category, note.description],
        (transaction, resultSet) => {
          resolve('Note has been created!');
        },
      );
    });
  });
}

export async function listNote(filter) {
  /// We need to create a promise manually for this transaction
  let query = 'SELECT * FROM Notes';
  if (filter !== 'All') {
    query += ' WHERE category == "' + filter + '"';
  }
  query += ';';
  console.log(query);
  return new Promise(resolve => {
    database.transaction(transaction => {
      transaction.executeSql(query, [], (transaction, resultSet) => {
        resolve(resultSet.rows.raw());
      });
    });
  });
}

export async function updateNote(note) {
  /// We need to create a promise manually for this transaction
  return new Promise(resolve => {
    database.transaction(transaction => {
      transaction.executeSql(
        'UPDATE Notes SET title = ?, category = ?, description = ? WHERE id = ?;',
        [note.title, note.category, note.description, note.id],
        (transaction, resultSet) => {
          resolve('Note has been updated!');
        },
      );
    });
  });
}

export async function deleteNote(note_id) {
  /// We need to create a promise manually for this transaction
  return new Promise(resolve => {
    database.transaction(transaction => {
      transaction.executeSql(
        'DELETE FROM Notes WHERE id = ?;',
        [note_id],
        (transaction, resultSet) => {
          resolve('Note has been deleted!');
        },
      );
    });
  });
}
