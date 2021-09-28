import React, { useState, useEffect } from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Text, View, Pressable, Alert, Button } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { saveData, readData, clear } from '../helpers/helperFunc'

import dummyData from '../helpers/dummyData'

function AddOnFeatures(props) {
  const [data, setData] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    async function getData() {
      const data = await readData()
      if (data) {
        setData(data)
      } else {
        setData([])
      }
    }
    getData()
  }, [isFocused])

  // for development purposes only, DELETE this later
  function handleSet() {
    saveData(dummyData)
  }

  // for development purposes only, DELETE this later
  function handleClear() {
    Alert.alert(
      'Are you sure?',
      'Clicking yes will clear all of your contacts!',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            clear()
            Alert.alert('Your contact list was cleared')
          },
          style: 'ok'
        }
      ],
      {
        cancelable: true
      }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.label}>familiar</Text>
      </View>

      <View style={styles.innerContainer}>
        <Pressable onPress={() => handleClear()}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>Clear Data</Text>
          </View>
        </Pressable>
        {/* <Button title="Set" onPress={handleSet} /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBox: {
    marginTop: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
    backgroundColor: '#22CAFF'
  },
  label: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    marginBottom: 10
  },
  buttonView: {
    width: 200,
    backgroundColor: '#29E25D',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: '80%',
    color: 'grey'
  }
})

export default AddOnFeatures