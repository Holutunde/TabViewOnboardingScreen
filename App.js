import React from 'react'
import Onboarding from './screens/onboarding'
import { StyleSheet, Text, View } from 'react-native'

const App = () => {
  return <Onboarding />
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
