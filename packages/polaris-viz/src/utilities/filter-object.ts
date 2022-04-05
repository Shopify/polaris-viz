export function filterObject(object) {
  return Object.entries(object)
    .filter(([_, value]) => value != null)
    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
}
