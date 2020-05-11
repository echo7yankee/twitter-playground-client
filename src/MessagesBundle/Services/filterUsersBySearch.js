export const filterUsersBySearch = (users, search) => {
  const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(search));
  return filteredUsers;
}
