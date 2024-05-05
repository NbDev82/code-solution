function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
}

function generateFunctionName(problemName) {
  const sanitizedProblemName = problemName.replace(/\s/g, '');
  const firstCharLowercase = sanitizedProblemName.charAt(0).toLowerCase();
  return `${firstCharLowercase}${sanitizedProblemName.slice(1)}`;
}

export { normalizeName, generateFunctionName };
