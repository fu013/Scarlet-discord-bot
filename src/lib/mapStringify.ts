const mapStringify = (map: any) => {
  let mapAsString = "{\n";
  map.forEach((value: any, key: any) => {
    mapAsString += `  "${key}": "${value}",\n`;
  });
  mapAsString += "}";
  return mapAsString;
};

export { mapStringify };
