/**
 * @jest-environment node
 */

import {add2} from '@evoja/typescript-testing-preset--lib/tools/sum-util'

test('add2', () => {
  expect(add2(100)).toBe(102)
})
