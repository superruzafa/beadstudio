export function readonly(object, name, value) {
  Object.defineProperty(object, name, {
    enumerable: true,
    configurable: false,
    writable: false,
    value
  });
}
