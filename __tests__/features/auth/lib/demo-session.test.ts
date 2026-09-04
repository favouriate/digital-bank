import {
  clearDemoSession,
  DEMO_SESSION_KEY,
  hasDemoSession,
  setDemoSession,
} from "@/features/auth/lib/demo-session";

describe("demo session", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("starts empty", () => {
    expect(hasDemoSession()).toBe(false);
  });

  it("sets and clears the demo session flag", () => {
    setDemoSession();

    expect(window.sessionStorage.getItem(DEMO_SESSION_KEY)).toBe("1");
    expect(hasDemoSession()).toBe(true);

    clearDemoSession();

    expect(window.sessionStorage.getItem(DEMO_SESSION_KEY)).toBeNull();
    expect(hasDemoSession()).toBe(false);
  });
});
