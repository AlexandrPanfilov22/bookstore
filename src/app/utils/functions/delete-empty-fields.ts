export function deleteEmptyFields<T>(obj: Partial<T>): Partial<T> {
  if (obj) {
    const newObj: Partial<T> = JSON.parse(JSON.stringify(obj)) as Partial<T>;

    for (const key of Object.keys(newObj as object)) {
      if (!newObj[key as keyof typeof newObj]) {
        delete newObj[key as keyof typeof newObj];
      }
    }

    return newObj;
  }

  return obj;
}
