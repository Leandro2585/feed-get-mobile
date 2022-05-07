import { Camera, Trash } from 'phosphor-react-native'
import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { theme } from '../../theme'

import { styles } from './styles'

type Props = {
  screenshot: string | null
  onTakeShot: () => void
  onRemoveShot: () => void
}

export function ScreenshotButton({ screenshot, onRemoveShot, onTakeShot }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={screenshot ? onRemoveShot : onTakeShot}>
      {screenshot 
      ? (
          <View>
            <Image style={styles.image} source={{ uri: screenshot }}/>
            <Trash size={22} color={theme.colors.text_secondary} weight='fill' style={styles.remove_icon}/>
          </View>
        )
      : <Camera size={22} color={theme.colors.text_secondary} weight='fill'/>}
    </TouchableOpacity>
  )
}