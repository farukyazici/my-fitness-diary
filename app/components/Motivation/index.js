import React from 'react';
import {
  Text, View,
} from 'react-native';
import { quotes } from '../../data/quotes';
import { colors } from '../../theme/colors';
import { dimens } from '../../theme/dimens';

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * (quotes.length - 1))];

  // return quotes[Math.floor(Math.random() * (quotes.length - 1))];
}

const Motivation = () => (
  <View style={{}}>
    <Text style={{
      fontSize: 80, color: colors.white1, position: 'absolute', left: -10, top: -10,
    }}
    >
      {' '}
      “
    </Text>
    <Text style={{
      fontSize: 28, color: colors.white1, paddingHorizontal: dimens.dim9, paddingVertical: dimens.dim8,
    }}
    >
      {getRandomQuote()}
    </Text>
    <Text style={{
      fontSize: 80, color: colors.white1, position: 'absolute', right: -10, bottom: -40,
    }}
    >
      {' '}
      ”
    </Text>
  </View>
);

export default Motivation;
