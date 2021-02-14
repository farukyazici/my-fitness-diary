import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {backgroundColor} from '../../components/Calendar/style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faTimesCircle,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import {options} from '../../data/options';
import {colors} from '../../theme/colors';
import {dimens} from '../../theme/dimens';

const Options = ({visible, onSelect, onClose, day, data}) => {
  const [selectedOption, setSelectedOption] = useState(data?.fulfillment);
  const [isCheat, setIsCheat] = useState(data?.isCheat);
  useEffect(() => {
    setSelectedOption(data?.fulfillment);
    setIsCheat(data?.isCheat);
  }, [data]);
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.semiTransparentBlack,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: colors.gray2,
            alignSelf: 'center',
            padding: dimens.dim5,
            width: '80%',
            borderRadius: dimens.dim2,
          }}>
          <TouchableOpacity onPress={onClose} style={{alignItems: 'flex-end'}}>
            <FontAwesomeIcon
              icon={faTimesCircle}
              color={colors.white1}
              size={24}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: dimens.dim5,
            }}>
            {dayjs(day).format("DD MMM 'YY")}
          </Text>
          {options
            ?.filter((o) => o.type === 'color')
            .map((o) => {
              return (
                <TouchableOpacity
                key={o.id}
                  onPress={() =>
                    setSelectedOption(
                      selectedOption === o.id ? undefined : o.id,
                    )
                  }
                  style={{
                    backgroundColor: colors.white1,
                    marginVertical: dimens.dim2,
                    borderRadius: dimens.dim2,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: dimens.dim4,
                      alignItems: 'center',
                      backgroundColor:
                        selectedOption === o.id ? colors.white1 : undefined,
                      borderWidth: dimens.dim2,
                      borderColor:
                        selectedOption === o.id ? o.color : colors.white1,
                      borderRadius: dimens.dim2,
                    }}>
                    <Text style={{color: o.color, fontWeight: 'bold', flex: 1}}>
                      {o.text}
                    </Text>
                    {selectedOption !== o.id ? (
                      <View
                        style={{
                          width: dimens.dim8,
                          height: dimens.dim8,
                          borderColor: o.color,
                          borderWidth: dimens.dim2,
                          borderRadius: dimens.dim7,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: dimens.dim8,
                          height: dimens.dim8,
                          backgroundColor: o.color,
                          borderRadius: dimens.dim7,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          color={colors.white1}
                          size={16}
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}

          <TouchableOpacity
            onPress={() => setIsCheat(!isCheat)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: dimens.dim5,
            }}>
            <View
              style={
                isCheat
                  ? {
                      width: dimens.dim7,
                      height: dimens.dim7,
                      backgroundColor: colors.warning,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: dimens.dim2,
                    }
                  : {
                      width: dimens.dim7,
                      height: dimens.dim7,
                      borderColor: colors.warning,
                      borderWidth: dimens.dim2,
                      borderRadius: dimens.dim2,
                    }
              }>
              {isCheat && (
                <FontAwesomeIcon
                  icon={faCheck}
                  color={colors.white1}
                  size={16}
                />
              )}
            </View>
            <Image
              style={{
                width: dimens.dim7,
                height: dimens.dim7,
                marginHorizontal: dimens.dim4,
              }}
              source={require('../../images/chocolade.png')}
            />
            <Text style={{color: colors.white1}}>Cheat meal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: colors.warning,
              padding: dimens.dim5,
              alignItems: 'center',
              borderRadius: dimens.dim2,
            }}
            onPress={() => {
              onSelect?.(selectedOption, isCheat);
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Options;
