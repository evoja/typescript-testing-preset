/**
 * @jest-environment jsdom
 */

import { act } from 'react-dom/test-utils'
import {create} from 'react-test-renderer'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
expect.extend({ toMatchImageSnapshot });
import {render} from 'react-dom'
import SumButton from '@evoja/typescript-testing-preset--lib/blocks/SumButton'

test('button', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const button_elem = <SumButton a={10} b={20}/>
  act(() => {render(button_elem, container)});
  const button = container.querySelector('button');
  expect(button?.textContent).toBe('sum(10, 20) -> 30');
  expect(button?.textContent).not.toBe('sum(10, 20) -> 40');

  expect(button?.outerHTML).toMatchSnapshot();
  const rendered = create(button_elem);
  expect(rendered).toMatchSnapshot();
  expect(rendered.toJSON()).toMatchSnapshot();
  expect(rendered.toTree()).toMatchSnapshot();

  document.body.removeChild(container)
})
