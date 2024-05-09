function normalizeName(name) {
  if (!name) return '';
  else
    return name
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
      });
}

function generateFunctionName(problemName) {
  //Loại bỏ các khoảng trắng dư thừa và khoảng trắng ở đầu và cuối chuỗi
  const sanitizedProblemName = problemName.replace(/\s+/g, ' ').trim();
  
  const words = sanitizedProblemName.split(' ');
  const firstWordLowercase = words[0].charAt(0).toLowerCase() + words[0].slice(1);
  const restWords = words
    .slice(1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  return `${firstWordLowercase}${restWords}`;
}

function generateDefaultValue(dataType) {
  switch (dataType) {
    case 'int':
    case 'long':
      return 0;
    case 'int[]':
    case 'long[]':
      return [0];
    case 'float':
    case 'double':
      return 0.0;
    case 'float[]':
    case 'double[]':
      return [0.0];
    case 'char':
    case 'String':
      return '';
    case 'char[]':
    case 'String[]':
      return [''];
    case 'boolean':
      return false;
    case 'boolean[]':
      return [false];
    default:
      return null;
  }
}

export { normalizeName, generateFunctionName, generateDefaultValue };
