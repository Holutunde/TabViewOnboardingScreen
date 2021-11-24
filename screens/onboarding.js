import React, { useState } from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { MaterialIcons } from '@expo/vector-icons'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import * as Progress from 'react-native-progress'

import { blue, textPrimary, textSecondary } from '../constants/colors'
import Text, { BoldText } from '../components/Text'
import Button from '../components/Button'
import { ExpandingDot } from 'react-native-animated-dots'

const FirstTab = () => {
  return (
    <View style={styles.tab}>
      <BoldText style={styles.title}>Learn from experts</BoldText>
      <Text style={styles.description}>
        Build skills from top instructors from leading universities and
        industries
      </Text>
    </View>
  )
}

const SecondTab = () => {
  return (
    <View style={styles.tab}>
      <BoldText style={styles.title}>Pursue any goal</BoldText>
      <Text style={styles.description}>
        Master job-relevant skills and earn career credentials
      </Text>
    </View>
  )
}

const ThirdTab = () => {
  return (
    <View style={styles.tab}>
      <BoldText style={styles.title}>Start today</BoldText>
      <Text style={styles.description}>
        Choose from hundreds of free courses. Master job-relevant skills and
        earn career credentials. Choose from hundreds of free courses
      </Text>
    </View>
  )
}

const Onboarding = ({ navigation }) => {
  const SLIDER_DATA = [
    {
      key: '1',
      title: 'App showcase ✨',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      key: '2',
      title: 'Introduction screen 🎉',
      description:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
    },
  ]
  const scrollX = React.useRef(new Animated.Value(0)).current

  const keyExtractor = React.useCallback((_, index) => index.toString(), [])

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.description}</Text>
      </View>
    )
  }
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
  ])

  const scrollX = React.useRef(new Animated.Value(0)).current
  const scrollX = new Animated.Value(0)
  const renderScene = SceneMap({
    first: FirstTab,
    second: SecondTab,
    third: ThirdTab,
  })

  const changeIndex = (increment) => {
    const newIndex = index + increment
    setIndex(() => newIndex)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {index > 0 ? (
          <TouchableOpacity onPress={() => changeIndex(-1)}>
            <MaterialIcons
              name="keyboard-backspace"
              size={22}
              color={textPrimary}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {index < 2 && (
          <TouchableOpacity>
            <Text style={styles.description}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={() => null}
          swipeEnabled={false}
        />

        <FlatList
          data={SLIDER_DATA}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          pagingEnabled
          horizontal
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.footer}>
        <ExpandingDot
          data={SLIDER_DATA}
          expandingDotWidth={30}
          scrollX={scrollX}
          inActiveDotOpacity={0.6}
          dotStyle={{
            width: 10,
            height: 10,
            backgroundColor: '#347af0',
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          containerStyle={{
            top: 30,
          }}
        />
        {/* <Progress.CircleSnail
          progress={(index + 1) * 0.3}
          color={['red', 'green', 'blue']}
        />
        <Progress.Circle
          progress={(index + 1) * 0.3}
          size={60}
          indeterminate={true}
        />
        <Progress.Bar
          progress={(index + 1) * 0.3}
          color="red"
          borderColor="blue"
          unfilledColor="green"
          width={30}
          fill={false}
        /> */}
        {/* {index < 2 ? (
          <AnimatedCircularProgress
            size={83}
            width={5}
            fill={(index + 1) * 20}
            tintColor={blue}
            backgroundColor="red"
            lineCap="butt"
            duration={300}
            rotation={360}
          >
            {() => (
              <View style={styles.fabContainer}>
                <TouchableOpacity
                  onPress={() => changeIndex(1)}
                  style={styles.fab}
                >
                  <MaterialIcons
                    name="arrow-right-alt"
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            )}
          </AnimatedCircularProgress>
        ) : (
          <Button onPress={gotoLogin}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
              <MaterialIcons name="arrow-right-alt" size={22} color="#fff" />
            </View>
          </Button>
        )} */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 25,
  },
  description: {
    color: textSecondary,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  fabContainer: {
    flex: 1,
    padding: 1,
  },
  fab: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginRight: 10,
  },
})

export default Onboarding
