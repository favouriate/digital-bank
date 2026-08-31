export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResult = {
  sent: true;
};

export class ForgotPasswordError extends Error {
  constructor(message = "Unable to send a reset link. Please try again.") {
    super(message);
    this.name = "ForgotPasswordError";
  }
}
