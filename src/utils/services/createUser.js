export const createUser = () => ({
  fName: '',
  lName: '',
  username: '',
  website: '',
  bio: '',
  age: {
    day: '',
    month: '',
    year: ''
  },
  location: '',
  social: {
    following: [],
    followingCount: '',
    followers: [],
    followersCount: '',
    usersToMessage: [],
  }
})
