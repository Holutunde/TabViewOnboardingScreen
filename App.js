import React from 'react'

import { StyleSheet, Text, View } from 'react-native'
import Onboarding from './screens/onboarding'

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
