import {StyleSheet, Platform, Dimensions} from 'react-native';
import { colors } from '../../../../../theme/colors';
import { dimens } from '../../../../../theme/dimens';
import * as defaultStyle from '../../../style';

const STYLESHEET_ID = 'stylesheet.day.basic';

export default function styleConstructor(theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    base: {
      alignItems: 'center',
      backgroundColor: colors.white1,
      margin: dimens.dim1,
      width: ((Dimensions.get('window').width - dimens.dim8 - dimens.dim8) / 7) - dimens.dim2,
      height: (Dimensions.get('window').width - 32) / 6 - 4,
      justifyContent: 'center',
      borderRadius: dimens.dim1,
    },
    text: {
      color: 'white',
      fontSize: appStyle.textDayFontSize,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: 'bold',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      textTransform: 'uppercase',
      ...appStyle.textDayStyle
    },
    alignedText: {
    },
    selected: {
    },
    today: {
    },
    todayText: {
      color: appStyle.todayTextColor
    },
    selectedText: {
      color: appStyle.selectedDayTextColor
    },
    disabledText: {
      color: colors.gray2
    },
    dot: {
      borderRadius: 2,
      opacity: 0,
      ...appStyle.dotStyle
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: appStyle.dotColor
    },
    selectedDot: {
      backgroundColor: appStyle.selectedDotColor
    },
    disabledDot: {
      backgroundColor: appStyle.disabledDotColor || appStyle.dotColor
    },
    todayDot: {
      backgroundColor: appStyle.todayDotColor || appStyle.dotColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
