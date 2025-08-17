export const getAll = (store: IDBObjectStore) => {
  return new Promise<object[]>((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error as Error);
    };
  });
};

export const getIndexNameFromKeys = (keys: string[]) => keys.sort().join('-');
