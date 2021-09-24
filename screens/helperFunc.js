import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'STORAGE_KEY'

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
    alert('Data successfully saved')
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