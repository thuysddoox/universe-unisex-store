import { SafeAny } from '@interfaces';

export enum StorageKeys {
  TOKEN = 'token',
  USER_INFO = 'userInfo',
}

export const storageRemove = (key: StorageKeys) => {
  localStorage.removeItem(key);
};

export const storageClear = () => {
  localStorage.clear();
};

export const localStorageGet = <T = SafeAny>(key: StorageKeys): T => {
  return JSON.parse(localStorage.getItem(key) || '{}');
};

export const localStorageSet = (key: StorageKeys, value: SafeAny) => {
  localStorage.setItem(key, JSON.stringify(value));
};
