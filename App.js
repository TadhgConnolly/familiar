import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Navigation from './routes/Navigation'
import Home from './screens/Home'

export default function App () {
  return (
    <View style={styles.container}>
      <Navigation/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center'
    justifyContent: 'center'
  }
})
