import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import ConfirmPinView from './ConfirmPinView'
import {
  HomeNavigationProp,
  HomeStackParamList,
} from '../features/home/homeTypes'
import { useAppStorage } from '../storage/AppStorageProvider'

type Route = RouteProp<HomeStackParamList, 'ConfirmPin'>

const ConfirmPinScreen = () => {
  const route = useRoute<Route>()
  const navigation = useNavigation<HomeNavigationProp>()
  const { params } = route
  const { t } = useTranslation()
  const { pin } = useAppStorage()

  const pinSuccess = useCallback(async () => {
    switch (params.action) {
      case 'payment':
        navigation.replace('PaymentScreen')
        break
    }
  }, [navigation, params.action])

  const title = useMemo(() => {
    switch (params.action) {
      default:
      case 'payment':
        return t('auth.title')
    }
  }, [params.action, t])

  const subtitle = useMemo(() => {
    switch (params.action) {
      default:
      case 'payment':
        return t('auth.enterCurrent')
    }
  }, [params.action, t])

  if (!pin || !pin.value) return null

  return (
    <ConfirmPinView
      originalPin={pin.value}
      title={title}
      subtitle={subtitle}
      pinSuccess={pinSuccess}
      onCancel={navigation.goBack}
    />
  )
}

export default ConfirmPinScreen
