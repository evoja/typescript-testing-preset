// In real life I would use local relative path './add' in this import
// but I want to demonstrate feature of my presed in using of full package name.
import {sum} from '@evoja/typescript-testing-preset--lib/tools/sum'

export function add2(a:number):number {
  return sum(a, 2)
}
