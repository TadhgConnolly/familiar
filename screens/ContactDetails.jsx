import React from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Button, View, Text, Alert, Pressable,ScrollView } from "react-native";
import { saveData, readData, color } from '../helpers/helperFunc'
import moment from 'moment'

function ContactDetails (props) {
  const { name, number, frequency, lastCall } = props.route.params.contact
  const contact = { name, number, frequency, lastCall } // construct object, only used to send to Edit component

  // updates contact lastCalled property and redirects back to home
  async function handlePress () {
    const data = await readData()
    const newData = data.map((value) => {
      if (value.name === name) {
        const newValue = { ...value, lastCall: moment().format() }
        return newValue
      } else {
        return value
      }
    })
    saveData(newData)
    props.navigation.navigate('Home')
  }

  // dynamically changes the box color
  const difference = moment().diff(lastCall, 'days')
  const boxColor = {
    backgroundColor: color(difference, frequency)
  }

  // deletes contact, redirects Home
  async function handleDelete () {
    const data = await readData()
    const newData = data.filter((value) => {
      if (value.name !== name) {
        return value
      }
    })
    saveData(newData)
    props.navigation.navigate('Home')
  }

  // Note: For last called text, the date format is set in line
  return (
    <View style={styles.container}>
      <View style={[styles.topContainer, boxColor]}>
        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.h1}>{name}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.label}>Name: {name}</Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.label}>Number: {number}</Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.label}>Frequency: {frequency}</Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.label}>Last called: {moment(lastCall).format('DD/MM/YYYY')}</Text>

        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={handlePress}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.buttonText}>{`Call ${name}`}</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => props.navigation.navigate('Edit', { contact })}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  topContainer: {
    width: '100%',
    height: '35%',
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  innerContainer: {
    width: '80%',
    marginTop: 40,
    padding: 20
  },
  h1: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
    padding: 20
  },
  label: {
    width: '80%',
    fontSize: 20,
    marginBottom: 5
  },
  buttonView: {
    width: '100%',
    marginTop: 40,
    borderRadius: 35
  },
  button: {
    backgroundColor: '#5AF160',
    padding: 10,
    borderRadius: 35,
    marginBottom: 15
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  }
})

export default ContactDetails
