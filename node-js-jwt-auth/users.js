// helpers functions to manage users

const users = [];
// 3 params: id/name/room
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase(); 
  room = room.trim().toLowerCase();

  //check if there is already an existing user
  const existingUser = users.find((user) => user.room === room && user.name === name);
  console.log(name)
  console.log(room)


  if (!name || !room) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken.' };

  // object user 
  const user = { id, name, room };
  users.push(user);
  console.log("Add user; users :")
  console.log(users)
  return { user };
}
// find a user with a specific id
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
}
// to get a user with his id
const getUser = (id) => users.find((user) => user.id === id);

// to get all the users in the room, use the filter function 
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// function that returns all the users
const getUsers = () => users;

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getUsers };