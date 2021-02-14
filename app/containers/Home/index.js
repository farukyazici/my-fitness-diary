import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import { colors } from '../../theme/colors';
import { dimens } from '../../theme/dimens';
import Month from './Month';

dayjs.extend(localeData);
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

console.log(dayjs.weekdays());

const months = [];
for (let i = -12; i <= 12; i += 1) {
  months.push(i);
}

const Home = () => {
  const [myData, setMyData] = useState([]);
  const [index, setIndex] = useState(12);
  const [a, b] = useState(1);

  useEffect(() => {
    try {
      AsyncStorage.getItem('@my_data').then((response) => {
        if (response) {
          const jsonValue = JSON.parse(response);
          setMyData(jsonValue);
        }
      });
    } catch (e) {
      // error reading value
    }
  }, []);
  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <SafeAreaView>
        <View>
          <Text
            style={{
              color: colors.white1,
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: dimens.dim5,
            }}
          >
            MY FITNESS DIARY
          </Text>
          <Swiper showsPagination={false} loop={false} index={12} onIndexChanged={(i) => console.log(i)}>
            {months.map((m) => <Month key={m} data={myData} setData={setMyData} month={dayjs().add(m, 'month').format('YYYY-MM')} />)}
          </Swiper>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
