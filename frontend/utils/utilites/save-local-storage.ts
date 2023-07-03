import ls from 'localstorage-slim';

ls.config.encrypt = true;
ls.config.secret = 97;

export const saveLocalStorage = (key: string, value: any) => {
  ls.set(key, value);
};

export const getLocalStorage = (key: string): any => ls.get(key) || '';
