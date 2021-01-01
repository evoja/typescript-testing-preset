// In real life I would use local relative path './add' in this import
// but I want to demonstrate feature of my presed in using of full package name.
import {add} from '@evoja/typescript-testing-preset--lib/tools/add'

export function add2(a:number):number {
  return add(a, 2)
}
