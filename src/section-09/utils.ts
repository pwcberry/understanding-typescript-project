function isBlank(s: string): boolean {
  const v = s.trim();
  return v.length === 0;
}

function isNumberValue(s: string): boolean {
  const v = s.includes(".") ? parseFloat(s) : parseInt(s, 10);
  return !isNaN(v);
}

function generateId(prefix: string) {
  const timestamp = Date.now().toString(16);
  return `${prefix}-${timestamp}`;
}

export { generateId, isBlank, isNumberValue };
