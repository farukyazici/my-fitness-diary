import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';

const STYLESHEET_ID = 'stylesheet.calendar-list.main';

export default function getStyle(theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    placeholder: {
      backgroundColor: appStyle.calendarBackground,
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderText: {
      fontWeight: '200',
      color: appStyle.dayTextColor,
    },
    calendar: {},
    staticHeader: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      backgroundColor: appStyle.calendarBackground,
    },
    ...(theme[STYLESHEET_ID] || {}),
  });
}
