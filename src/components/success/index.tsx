import React from 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SuccessImg from '../../assets/success.png'
import { Copyright } from '../copyright'
import { styles } from './styles'

type Props = {
  onSendAnotherFeedback: () => void
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image source={SuccessImg} style={styles.image}/>
      <Text style={styles.title}>Agradecemos o feedback</Text>
      <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
        <Text style={styles.button_title}>Quero enviar outro</Text>
      </TouchableOpacity>
      <Copyright/>
    </View>
  )
}