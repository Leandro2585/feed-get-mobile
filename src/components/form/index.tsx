import { ArrowLeft } from 'phosphor-react-native'
import React from 'react'
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native'
import { captureScreen } from 'react-native-view-shot'
import { readAsStringAsync } from 'expo-file-system'
import { api } from '../../libs'
import { theme } from '../../theme'
import { FeedbackType, feedbackTypes } from '../../utils/feedbackTypes'
import { Button } from '../button'
import { ScreenshotButton } from '../screenshot-button'

import { styles } from './styles'

type Props = {
  feedbackType: FeedbackType
  onFeedbackCanceled: () => void
  onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = React.useState<boolean>(false)
  const [screenshot, setScreenshot] = React.useState<string | null>(null)
  const [comment, setComment] = React.useState<string | null>(null)
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const handleScreenshot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    }).then(uri => setScreenshot(uri)).catch(console.error)
  }

  const handleScreenshotRemove = () => {
    setScreenshot(null)
  }

  const handleSendFeedback = async () => {
    if(isSendingFeedback) return
    setIsSendingFeedback(true)
    const screenshotBase64 = screenshot && await readAsStringAsync(screenshot, { encoding: 'base64' })
    try {
      await api.post('/feedbacks', { tyype: feedbackType, screenshot: `data:image/png;base64, ${screenshotBase64}`, comment })
      onFeedbackSent()
    } catch (error) {
      console.log(error)
      setIsSendingFeedback(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft size={24} weight='bold' color={theme.colors.text_secondary}/>
        </TouchableOpacity>
        <View style={styles.title_container}>
          <Image source={feedbackTypeInfo.image} style={styles.image}/>
          <Text style={styles.title_text}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder='Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...'
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButton onTakeShot={handleScreenshot} onRemoveShot={handleScreenshotRemove} screenshot={screenshot}/>
        <Button isLoading={isSendingFeedback} onPress={handleSendFeedback}/>
      </View>
    </View>
  )
}