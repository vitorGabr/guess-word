import type { StorageAdapter } from "../interfaces";

export class LocalStorageAdapter implements StorageAdapter {
    getItem(key: string) {
      return localStorage.getItem(key);
    }
  
    setItem(key: string, value: string) {
      localStorage.setItem(key, value);
    }
  
    removeItem(key: string) {
      localStorage.removeItem(key);
    }
  }
  