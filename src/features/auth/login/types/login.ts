export type LoginCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResult = {
  userId: string;
};

export class LoginError extends Error {
  constructor(message = "Incorrect email or password") {
    super(message);
    this.name = "LoginError";
  }
}
