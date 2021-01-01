import {add} from '@evoja/typescript-testing-preset--lib/tools/add'

test('test add', () => {
  expect(add(1, 2)).toBe(3)
})
