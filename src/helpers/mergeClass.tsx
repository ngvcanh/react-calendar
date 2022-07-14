import clsx, { ClassValue } from 'clsx';
import { CSS_NAMESPACE } from './constant';

export default function mergeClass(className: string, ...classes: Array<ClassValue>){
  return clsx(
    { [ [ CSS_NAMESPACE, className ].join('-') ]: !!className },
    ...classes
  );
}