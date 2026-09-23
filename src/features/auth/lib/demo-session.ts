export const DEMO_SESSION_KEY = "openpay.demo-session";

export function setDemoSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(DEMO_SESSION_KEY, "1");
}

export function clearDemoSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(DEMO_SESSION_KEY);
}

export function hasDemoSession() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(DEMO_SESSION_KEY) === "1";
}
