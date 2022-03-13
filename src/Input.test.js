import React from 'react';
import { shallow } from 'enzyme'
import Input from './Input'
import { findByTestAttr, checkProps } from '../test/testUtils'


const defaultProps = {}

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<Input {...setupProps} />)
}

describe('renders without error', () => {
    let wrapper

    beforeEach(() => {
        wrapper = setup({})
    })

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-input')
        expect(component.length).toBe(1)
    })
})