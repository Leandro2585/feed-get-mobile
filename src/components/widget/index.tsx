import React from 'react'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet'

import { styles } from './styles'
import { Options } from '../options'
import { theme } from '../../theme'
import { Form } from '../form'
import { FeedbackType } from '../../utils/feedbackTypes'
import { Success } from '../success'

export function Widget() {
  const bottomSheetRef = React.useRef<BottomSheet>(null)
  const [feedbackType, setFeedbackType] = React.useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = React.useState<boolean>(false)
  const handleOpen = () => {
    bottomSheetRef.current?.expand()
  }

  const handleRestartFeedback = () => {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  const handleFeedbackSent = () => {
    setFeedbackSent(true)
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} weight='bold'/>
      </TouchableOpacity>
      <BottomSheet 
        ref={bottomSheetRef} 
        snapPoints={[1, 280]} 
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent 
          ? <Success onSendAnotherFeedback={handleRestartFeedback}/>
          : <>
              { feedbackType 
                ? <Form 
                    feedbackType={feedbackType} 
                    onFeedbackCanceled={handleRestartFeedback} 
                    onFeedbackSent={handleFeedbackSent}
                  /> 
                : <Options onFeedbackTypeChanged={setFeedbackType}/> }
            </>
        }
      </BottomSheet>
    </>
  )
}

// export default gestureHandlerRootHOC(Widget)