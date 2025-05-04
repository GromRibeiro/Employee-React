import { Employee } from "./types";

const STORAGE_KEY = "employee";

export function saveEmployeeStorage(employee: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employee));
}

export function loadingEmployeeStorage(): Employee[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}
