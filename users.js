const users = [];

function joinUser(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

function deleteUser(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = {
  joinUser,
  getCurrentUser,
  deleteUser,
  };
