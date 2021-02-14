import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import { options } from '../../data/options';
import {colors} from '../../theme/colors';
import {dimens} from '../../theme/dimens';

const Legend = ({visible, onSelect}) => {
  return (
    <View transparent>
      {options.map((l) => {
        return (
          <View key={l.id} style={{flexDirection: 'row', alignItems: 'center', padding: dimens.dim2}}>
            {l.type === 'color' ? (
              <View
                style={{
                  backgroundColor: l.color,
                  width: dimens.dim7,
                  height: dimens.dim7,
                }}
              />
            ) : (
              <Image
                style={{width: dimens.dim7, height: dimens.dim7}}
                source={require('../../images/chocolade.png')}
              />
            )}
            <Text style={{color: colors.white1, marginLeft: dimens.dim4}}>{l.text}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Legend;
