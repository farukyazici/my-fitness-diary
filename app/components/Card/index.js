import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {quotes} from '../../data/quotes';
import {colors} from '../../theme/colors';
import {dimens} from '../../theme/dimens';

function getRandomQuote(quotes) {
  return quotes[0];
  // return quotes[Math.floor(Math.random() * (quotes.length - 1))];
}

const Card = ({children}) => {
  return (
    <View
      style={{
        padding: dimens.dim5,
        backgroundColor: colors.gray2,
        borderRadius: dimens.dim2,
        marginVertical: dimens.dim3,
      }}>
      {children}
    </View>
  );
};

export default Card;
