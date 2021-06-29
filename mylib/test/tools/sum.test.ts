import {sum} from '@evoja/typescript-testing-preset--lib/tools/sum'

test('sum', () => {
  expect(sum(1, 2)).toBe(3)
})
