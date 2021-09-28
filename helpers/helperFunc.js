import AsyncStorage from '@react-native-async-storage/async-storage'

export const STORAGE_KEY = 'STORAGE_KEY'

// this fetches data from local storage
export async function readData () {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    return jsonValue !== null ? JSON.parse(jsonValue) : null
  } catch (e) {
    alert('failed to fetch the data from storage')
  }
}

// this adds data to local storage
export async function saveData (Data) {
  try {
    const jsonValue = JSON.stringify(Data)
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
  } catch (e) {
    alert('failed to save data to the storage')
  }
}

// this clears the local data!
export async function clear () {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.log(e)
  }
}

// returns a color based on the difference of 2 dates and the frequency
export function color (difference, frequency) {
  if (difference < frequency) {
    return '#5AF160'
  } else if (difference <= frequency * 2) {
    return '#FF971D'
  } else {
    return '#E00000'
  }
}

// takes in a form object, returns custom error string
export function formCheck (form) {
  const { name, number, frequency } = form

  let err = ''
  if (typeof name !== 'string' || name === '') {
    err += 'Name'
  } else if (nameCheck(name)) {
    err += 'Name already in use'
  }
  if (isNaN(Number(number)) || number === '') {
    err === ''
      ? err += 'Number'
      : err += ', Number'
  }
  if (isNaN(Number(frequency)) || frequency === '') {
    err === ''
      ? err += 'Frequency'
      : err += ', Frequency'
  }
  return err
}

// returns true if name is already in local storage
async function nameCheck (name) {
  const data = await readData()
  let checker = false
  data.forEach(contact => {
    if (contact.name === name) {
      checker = true
    }
  })
  return checker
}
