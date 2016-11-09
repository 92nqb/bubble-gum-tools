// export function build(index, value) {
//   if (Number.isSafeInteger(index) && index >= 0) {
//     const arr = [];
//     arr[index] = value;
//     return arr;
//   }
//
//   return {
//     [index]: value
//   };
// }
//
// export default function buildIn(path, finalValue) {
//   const _path = [].concat(path);
//   const last = _path.pop();
//   const init = build(last, finalValue);
//   return _path.reduceRight((prev, keyPath) => build(keyPath, prev), init);
// }
