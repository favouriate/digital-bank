import { mockUser } from "@/mocks/user";
import type { User } from "@/types/user";

export function getCurrentUser(): User {
  return mockUser;
}
