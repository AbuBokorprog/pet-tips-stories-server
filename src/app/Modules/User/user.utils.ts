import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: {
    email: string;
    username: string;
    role: string;
    profilePicture: string | undefined;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const userRoles = {
  ADMIN: 'admin',
  USER: 'user',
};
