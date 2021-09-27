import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react-native'
import { Platform, Linking } from 'react-native'
import ContactDetails from '../../screens/ContactDetails'
import { renderWithNavigation } from '../../jest/test-utils'
import { saveData, readData, color } from '../../helpers/helperFunc'
import moment from 'moment'

jest.mock('../../helpers/helperFunc')
jest.mock('moment')

// mocks the call functionality
jest.mock('react-native/Libraries/Linking/Linking')

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const platform = {
    OS: 'android'
  }

  const select = jest.fn().mockImplementation((obj) => {
    const value = obj[platform.OS]
    return !value ? obj.default : value
  })

  platform.select = select

  return platform
})

afterAll(() => {
  jest.resetAllMocks()
})

afterEach(cleanup)

let name, number, frequency, lastCall

beforeAll(() => {
  name = 'admin'
  number = '123'
  frequency = '3'
  lastCall = '2019/08/22'
})

beforeEach(() => {
  Linking.openURL = jest.fn(() => Promise.resolve())
})

test('Should display the correct contact details e.g name, number', async () => {
  const mockNavigate = jest.fn()

  moment.mockImplementation((arg) => ({
    format: (value) => arg,
    diff: (value) => value
  }))

  const { getByText } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    { contact: { name, number, frequency, lastCall } }
  )

  const nameText = getByText(new RegExp('Name: ' + name))
  const numberText = getByText(new RegExp('Number: ' + number))
  const frequencyText = getByText(new RegExp('Frequency: ' + frequency))
  const lastCallText = getByText(new RegExp('Last called: ' + lastCall))

  expect(nameText).toBeTruthy()
  expect(numberText).toBeTruthy()
  expect(frequencyText).toBeTruthy()
  expect(lastCallText).toBeTruthy()
})

test('Should update lastCall when call button pressed', async () => {
  const mockNavigate = jest.fn()

  const { getByText } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    { contact: { name, number, frequency, lastCall } }
  )

  saveData.mockImplementation(() => Promise.resolve())
  readData.mockImplementation(() => Promise.resolve([]))

  await fireEvent.press(getByText('Call'))

  expect(saveData).toHaveBeenCalled()
  expect(readData).toHaveBeenCalled()
})

test('Should display the correct colour code for the background', async () => {
  const mockNavigate = jest.fn()

  color.mockImplementation(() => 'red')

  const { getByTestId } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    { contact: { name, number, frequency, lastCall } }
  )

  const indicatorBackground = getByTestId('indicator-background')
  expect(indicatorBackground.props.style[1].backgroundColor).toBe('red')
})

test('Should invoke the call method when call button is clicked on', async () => {
  const { getByText } = renderWithNavigation(<ContactDetails />, 'stack', {
    contact: { name, number, frequency, lastCall }
  })

  const callButton = getByText('Call')
  await fireEvent.press(callButton)
  expect(Linking.openURL).toHaveBeenCalledTimes(1)
})

test('Should pass the correct phone number format in ios', async () => {
  // set platform to ios
  Platform.OS = 'ios'

  const { getByText } = renderWithNavigation(<ContactDetails />, 'stack', {
    contact: { name, number, frequency, lastCall }
  })

  const callButton = getByText('Call')
  await fireEvent.press(callButton)
  expect(Linking.openURL).toHaveBeenCalledWith(`telprompt:${number}`)
})

test('Should pass the correct phone number format in android', async () => {
  // set platform to android
  Platform.OS = 'android'

  const { getByText } = renderWithNavigation(<ContactDetails />, 'stack', {
    contact: { name, number, frequency, lastCall }
  })

  const callButton = getByText('Call')
  await fireEvent.press(callButton)
  expect(Linking.openURL).toHaveBeenCalledWith(`tel:${number}`)
})
