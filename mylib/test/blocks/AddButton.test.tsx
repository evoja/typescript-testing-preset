/**
 * @jest-environment jsdom
 */

import { act } from 'react-dom/test-utils'
import {create} from 'react-test-renderer'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
expect.extend({ toMatchImageSnapshot });
import {render} from 'react-dom'
import AddButton from '@evoja/typescript-testing-preset--lib/blocks/AddButton'

test('button', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const button_elem = <AddButton a={10} b={20}/>
  act(() => {render(button_elem, container)});
  const button = container.querySelector('button');
  expect(button?.textContent).toBe('add(10, 20) -> 30');
  expect(button?.textContent).not.toBe('add(10, 20) -> 40');

  expect(button?.outerHTML).toMatchSnapshot();
  const rendered = create(button_elem);
  expect(rendered).toMatchSnapshot();
  expect(rendered.toJSON()).toMatchSnapshot();
  expect(rendered.toTree()).toMatchSnapshot();

  document.body.removeChild(container)
})
