/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
  Image, KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faTimesCircle,
  faCheck,
  faEdit,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { backgroundColor } from '../../components/Calendar/style';
import { options } from '../../data/options';
import { colors } from '../../theme/colors';
import { dimens } from '../../theme/dimens';

const Options = ({
  visible, onSelect, onClose: onCloseProp, day, data,
}) => {
  const [selectedOption, setSelectedOption] = useState(data?.fulfillment);
  const [isCheat, setIsCheat] = useState(data?.isCheat);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState('');
  const onClose = () => {
    setEditing(false);
    onCloseProp();
  };
  useEffect(() => {
    setSelectedOption(data?.fulfillment);
    setIsCheat(data?.isCheat);
    setText(data?.note);
  }, [data]);
  return (
    <Modal visible={visible} transparent>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          backgroundColor: colors.semiTransparentBlack,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!editing
          ? (
            <View
              style={{
                backgroundColor: colors.gray2,
                alignSelf: 'center',
                padding: dimens.dim5,
                width: '80%',
                borderRadius: dimens.dim2,
              }}
            >
              <TouchableOpacity onPress={onClose} style={{ alignItems: 'flex-end' }}>
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
                }}
              >
                {dayjs(day).format("DD MMM 'YY")}
              </Text>
              {options
                ?.filter((o) => o.type === 'color')
                .map((o) => (
                  <TouchableOpacity
                    key={o.id}
                    onPress={() => setSelectedOption(
                      selectedOption === o.id ? undefined : o.id,
                    )}
                    style={{
                      backgroundColor: colors.white1,
                      marginVertical: dimens.dim2,
                      borderRadius: dimens.dim2,
                    }}
                  >
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
                      }}
                    >
                      <Text style={{ color: o.color, fontWeight: 'bold', flex: 1 }}>
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
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            color={colors.white1}
                            size={16}
                          />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}

              <TouchableOpacity
                onPress={() => setIsCheat(!isCheat)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: dimens.dim5,
                }}
              >
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
              }
                >
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
                <Text style={{ color: colors.white1 }}>Cheat meal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: colors.gray1,
                  padding: dimens.dim5,
                  alignItems: 'center',
                  borderRadius: dimens.dim2,
                  marginBottom: dimens.dim5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setEditing(true);
                }}
              >
                {text?.length > 0 ? (
                  <>
                    <Text style={{
                      fontWeight: 'bold',
                      color: colors.white1,
                      flex: 1,
                      marginRight: dimens.dim5,
                      textAlign: 'center',
                    }}
                    >
                      {text}
                    </Text>
                    <FontAwesomeIcon icon={faEdit} color={colors.white1} />

                  </>
) : (
  <>
    <Text style={{ color: 'white', fontWeight: 'bold', marginRight: dimens.dim5 }}>TAKE A NOTE</Text>
    <FontAwesomeIcon icon={faEdit} color={colors.white1} />
  </>
              )}
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
              onSelect?.(selectedOption, isCheat, text);
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>SAVE</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{
              backgroundColor: colors.gray2,
              alignSelf: 'center',
              padding: dimens.dim5,
              width: '80%',
              borderRadius: dimens.dim2,
            }}
            >
              <TouchableOpacity onPress={onClose} style={{ alignItems: 'flex-end' }}>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  color={colors.white1}
                  size={24}
                />
              </TouchableOpacity>
              <View style={{
                backgroundColor: colors.white1,
                padding: dimens.dim5,
                paddingTop: 12,
                borderRadius: dimens.dim2,
                marginTop: dimens.dim5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              >
                <TextInput
                  style={{
                    flex: 1,
                  }}
                  multiline
                  value={text}
                  onChangeText={(t) => setText(t)}
                />
                <TouchableOpacity onPress={() => {
                  setText('');
                }}
                >
                  <FontAwesomeIcon icon={faTimes} color={colors.gray1} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  width: '100%',
                  padding: dimens.dim5,
                  alignItems: 'center',
                  borderRadius: dimens.dim2,
                  marginTop: dimens.dim5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setText('');
                  setEditing(false);
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', marginRight: dimens.dim5 }}>DELETE NOTE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: colors.gray1,
                  padding: dimens.dim5,
                  alignItems: 'center',
                  borderRadius: dimens.dim2,
                  marginTop: dimens.dim3,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setEditing(false);
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', marginRight: dimens.dim5 }}>SAVE NOTE</Text>
              </TouchableOpacity>
            </View>
          )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default Options;
