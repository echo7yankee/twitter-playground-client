import jwt from 'jsonwebtoken';

export const userIdFromToken = () => {
  //token
  const token = localStorage.FBIdToken;
  let userId;
  if (token) {
    userId = jwt.decode(token).params.id;
  }
  return userId;
}
