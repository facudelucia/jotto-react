import { mount, shallow } from 'enzyme';
import { findByTestAttr, storeFactory } from '../test/testUtils'
import App from './App';

jest.mock('./actions')
import { getSecretWord as mockGetSecretWord } from './actions';
import { Provider } from 'react-redux';

const setup = () => {
  // use mount because useEffect not called on 'shallow'
  const store = storeFactory()
  return mount(<Provider store={store}><App /></Provider>)
}

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent).toHaveLength(1)
});

describe('get secret word', () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear()
  })
  test('getSecretWord on app mount', () => {
    const wrapper = setup()
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1)
  })
  test('getSecretWord does not run on app update', () => {
    const wrapper = setup()
    mockGetSecretWord.mockClear()
    //using setProps because wrapper.update() doesn't trigger useEffect
    wrapper.setProps()
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0)
  })
})