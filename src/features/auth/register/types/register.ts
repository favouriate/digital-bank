export type RegisterCredentials = {
  email: string;
  password: string;
  acceptedTerms: boolean;
};

export type RegisterResult = {
  userId: string;
};

export class RegisterError extends Error {
  constructor(message = "Unable to create your account. Please try again.") {
    super(message);
    this.name = "RegisterError";
  }
}
