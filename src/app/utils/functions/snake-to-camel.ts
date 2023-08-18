export function snakeToCamel(str: string): string {
  return str.toLowerCase().replace(/([-_][a-z])/g, (group: string) =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );
}

export function transformObjectToCamel(obj: any): any {
  const resultObj: any = {};

  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    Object.keys(obj).forEach((i: string) => {
      resultObj[snakeToCamel(i)] = transformObjectToCamel(obj[i]);
    });
  } else if (Array.isArray(obj)) {
    return obj.map((i: string) => {
      return transformObjectToCamel(i);
    });
  } else {
    return obj;
  }

  return resultObj;
}
