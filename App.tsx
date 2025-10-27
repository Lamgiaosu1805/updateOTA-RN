import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useUpdateVersion } from './useUpdateVersion'

export default function App() {
  const {data} = useUpdateVersion();
  console.log(data)
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      <TouchableOpacity onPress={() => {
      }}>
        <Text>Lâm Ngon zai</Text>
      </TouchableOpacity>
      {/* <View style={styles.progress}> */}
          <View
            
          />
          <Text>{`percent: ` + data.state.progress}</Text>
        </View>
    // </View>
  )
}

const styles = StyleSheet.create({
   progress: {
    height: 10,
    width: '80%',
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 1,
    overflow: 'hidden',
  },
  process: {
    height: 10,
    backgroundColor: 'blue',
  },
})