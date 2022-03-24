import React, { useState } from 'react';
import { shallow, mount } from 'enzyme'
import Input from './Input'
import { findByTestAttr } from '../test/testUtils'
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';



const setup = ({ language, secretWord, success }) => {

    language = language || 'en';
    secretWord = secretWord || 'party';
    success = success || false;

    return mount(
        <languageContext.Provider value={language}>
            <successContext.SuccessProvider value={[success, jest.fn()]}>
                <guessedWordsContext.GuessedWordsProvider>
                    <Input secretWord={secretWord} />
                </guessedWordsContext.GuessedWordsProvider>
            </successContext.SuccessProvider>
        </languageContext.Provider>
    );
}

describe('render', () => {

    describe('success is false', () => {
        let wrapper
        beforeEach(() => {
            wrapper = setup({ success: false })
        })
        test('renders without error', () => {
            const inputComponent = findByTestAttr(wrapper, 'component-input')
            expect(inputComponent.length).toBe(1)
        })
        test('input box shows', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box')
            expect(inputBox.exists()).toBe(true)
        })
        test('submit button shows', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button')
            expect(submitButton.exists()).toBe(true)
        })
    })

    describe('success is true', () => {
        let wrapper
        beforeEach(() => {
            wrapper = setup({ success: true })
        })
        test('renders without error', () => {
            const inputComponent = findByTestAttr(wrapper, 'component-input')
            expect(inputComponent.length).toBe(1)
        })
        test('input box does not show', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box')
            expect(inputBox.exists()).toBe(false)
        })
        test('submit button does not show', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button')
            expect(submitButton.exists()).toBe(false)
        })
    })

})


describe('state controlled input field', () => {
    let mockSetCurrentGuess = jest.fn()
    let wrapper
    let originalUseState
    beforeEach(() => {
        mockSetCurrentGuess.mockClear()
        originalUseState = React.useState
        React.useState = jest.fn(() => ['', mockSetCurrentGuess])
        wrapper = setup({})
    })
    afterEach(() => {
        React.useState = originalUseState
    })
    test('state updates with value of input box upon change', () => {

        const inputBox = findByTestAttr(wrapper, 'input-box')

        const mockEvent = { target: { value: 'train' } }
        inputBox.simulate('change', mockEvent)

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
    })

    test('the field is cleared upon submit button click', () => {

        const submitButton = findByTestAttr(wrapper, 'submit-button')

        submitButton.simulate('click', { preventDefault() { } })

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
    })

})

describe('languagePicker', () => {
    test('correctly renders submit string in english', () => {
        const wrapper = setup({ language: "en" });
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('Submit');
    });
    test('correctly renders congrats string in emoji', () => {
        const wrapper = setup({ language: "emoji" });
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('🚀');
    });
});