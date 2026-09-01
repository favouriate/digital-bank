export const THEME_STORAGE_KEY = "openpay.theme";
export const THEME_CHANGE_EVENT = "openpay.theme-change";

export type ThemePreference = "light" | "dark" | "system";

export function parseThemePreference(value: string | null): ThemePreference {
  if (value === "light" || value === "dark" || value === "system") {
    return value;
  }

  return "system";
}

export function prefersDarkScheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyTheme(preference: ThemePreference) {
  const dark =
    preference === "dark" ||
    (preference === "system" && prefersDarkScheme());

  document.documentElement.classList.toggle("dark", dark);
}

export const THEME_BOOT_SCRIPT = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="light"||s==="dark"||s==="system"?s:"system";var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
