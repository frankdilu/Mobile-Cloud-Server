/**
 * Sample React Native Static Server
 * https://github.com/futurepress/react-native-static-server
 * @flow
 */

import nodejs from 'nodejs-mobile-react-native';
import React, { useEffect } from 'react'
import { Text } from "react-native"



export default function App (){
  useEffect(() => {
    nodejs.start("main.js");
    nodejs.channel.addListener(
      "message",
      (msg) => {
        console.log(msg)
      },
      this
    );
  },[])
  return (
  <Text>!Welcome to Mobile Cloud Server!
    Server running
  </Text>
  )
}
