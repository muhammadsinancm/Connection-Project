import Dexie from 'dexie';

export const db = new Dexie('MyAppDB');

db.version(1).stores({
  todos: '++id, _id, emailForUser, date, done, recivedUserToken, sendingUserToken, userText, roomID',
  users: '++id, name, email',
});