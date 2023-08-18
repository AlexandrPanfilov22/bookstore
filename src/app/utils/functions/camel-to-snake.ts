export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
}

export function transformObjectToSnake(obj: any): any {
  const resultObj: any = {};

  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    Object.keys(obj).forEach((i: string) => {

      return resultObj[camelToSnake(i)] = transformObjectToSnake(obj[i]);
    });
  } else if (Array.isArray(obj)) {
    return obj.map((i: any) => {
      return transformObjectToSnake(i);
    });
  } else {
    return obj;
  }

  return resultObj;
}
