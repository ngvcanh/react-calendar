const hasSpace = /\s/;
const hasSeparator = /(_|-|\.|:)/;
const hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;
const separatorSplitter = /[\W_]+(.|$)/g;
const camelSplitter = /(.)([A-Z]+)/g

export function unseparate(str: string){
  return str.replace(separatorSplitter, (_, n) => n ? ' ' + n : '');
}

export function uncamelize(str: string){
  return str.replace(camelSplitter, (_, p, u) => p + ' ' + u.toLowerCase().split('').join(' '));
}

export function toNoCase(str: string){
  if (hasSpace.test(str)) return str.toLowerCase()
  if (hasSeparator.test(str)) return (unseparate(str) || str).toLowerCase()
  if (hasCamel.test(str)) return uncamelize(str).toLowerCase()
  return str.toLowerCase()
}

// Source Github: https://github.com/ianstormtaylor/to-no-case
// Source npm: https://www.npmjs.com/package/to-no-case

export function toSpaceCase(str: string){
  return toNoCase(str).replace(/[\W_]+(.|$)/g, (_, m) => m ? ' ' + m : '').trim();
}

// Source Github: https://github.com/ianstormtaylor/to-space-case
// Source npm: https://www.npmjs.com/package/to-space-case
// Source npm .d.ts: https://www.npmjs.com/package/@types/to-space-case

export default function toCamelCase(str: string){
  return toSpaceCase(str).replace(/\s(\w)/g, (_, l) => l.toUpperCase());
}

// Source Github: https://github.com/ianstormtaylor/to-camel-case
// Source npm: https://www.npmjs.com/package/to-camel-case
// Source npm .d.ts: https://www.npmjs.com/package/@types/to-camel-case