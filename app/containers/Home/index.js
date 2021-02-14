import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AppState,
} from 'react-native';

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import {Calendar, CalendarList} from './../../components/Calendar';
import Options from './Options';
import Legend from '../../components/Legend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Motivation from '../../components/Motivation';
import {colors} from '../../theme/colors';
import Card from '../../components/Card';
import {dimens} from '../../theme/dimens';
import {quotes} from '../../data/quotes';
import Swiper from 'react-native-swiper';
import {month} from '../../components/Calendar/dateutils';
dayjs.extend(localeData);
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

console.log(dayjs.weekdays());

const cellWidth = (Dimensions.get('window').width - 32) / 7;

const months = [];
for (let i = 0; i < 1; i++) {
  months.push(i);
}

const Home = () => {
  const appState = useRef(AppState.currentState);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [daysInMonth, setDaysInMonth] = useState(dayjs().daysInMonth());
  const [myData, setMyData] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  let weekdays = dayjs.weekdays();
  weekdays.push(weekdays.shift());

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      setFirstTime(false);
      setQuoteIndex(Math.random());
    }

    appState.current = nextAppState;
    console.log('AppState', appState.current);
  };

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
    try {
      AsyncStorage.getItem('@first_time').then((response) => {
        if (!response) {
          setFirstTime(true);
        } else {
          setFirstTime(false);
          setQuoteIndex(Math.random());
        }
      });

      AsyncStorage.setItem('@first_time', 'false');
    } catch (e) {
      // error reading value
    }
  }, []);
  const weeks = [0, 1, 2, 3, 4];
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{padding: 16}}>
          <Text
            style={{
              color: colors.white1,
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: dimens.dim5,
            }}>
            MY FITNESS DIARY
          </Text>

          <Swiper showsButtons>
            {months.map((m, index) => {
              return <View>
              <Text style={{color: 'white', fontSize: 50}}>{m}</Text>
                  {/* <Card>
            <CalendarList
            horizontal

              options={myData}
              minDate={'2012-05-10'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day) => {
                setSelectedDay(day.dateString);
                setModalOpen(true);
              }}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={(day) => {
                console.log('selected day', day);
              }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'yyyy MM'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onVisibleMonthsChange={(month) => {
                setSelectedDay(month.dateString);
                console.log('month changed', month);
                setDaysInMonth(dayjs(month.timestamp).daysInMonth());
              }}
              // Hide month navigation arrows. Default = false
              hideArrows={true}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              // Do not show days of other months in month page. Default = false
              hideExtraDays={false}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={false}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={false}
              // Show week numbers to the left. Default = false
              showWeekNumbers={false}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={(subtractMonth) => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={(addMonth) => addMonth()}
              // Disable left arrow. Default = false
              disableArrowLeft={true}
              // Disable right arrow. Default = false
              disableArrowRight={true}
              // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
              disableAllTouchEventsForDisabledDays={true}
              // Replace default month and year title with custom one. the function receive a date as parameter.
              renderHeader={(date) => {
                return (
                  <View>
                    <Text style={{ fontWeight: 'bold', color: colors.white1 }}>{dayjs(date).format('MMMM YYYY')}</Text>
                  </View>
                );
              }}
              // Enable the option to swipe between months. Default = false
            />
          </Card> */}
                  <Card>
                    <Calendar
                      options={myData}
                      style={{
                        overflow: 'hidden',
                      }}
                      s
                      minDate={'2012-05-10'}
                      // Handler which gets executed on day press. Default = undefined
                      onDayPress={(day) => {
                        setSelectedDay(day.dateString);
                        setModalOpen(true);
                      }}
                      // Handler which gets executed on day long press. Default = undefined
                      onDayLongPress={(day) => {
                        console.log('selected day', day);
                      }}
                      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                      monthFormat={'yyyy MM'}
                      // Handler which gets executed when visible month changes in calendar. Default = undefined
                      onMonthChange={(month) => {
                        setSelectedDay(month.dateString);
                        console.log('month changed', month);
                        setDaysInMonth(dayjs(month.timestamp).daysInMonth());
                      }}
                      // Hide month navigation arrows. Default = false
                      hideArrows={true}
                      // Replace default arrows with custom ones (direction can be 'left' or 'right')
                      // Do not show days of other months in month page. Default = false
                      hideExtraDays={false}
                      // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                      // day from another month that is visible in calendar page. Default = false
                      disableMonthChange={false}
                      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                      firstDay={1}
                      // Hide day names. Default = false
                      hideDayNames={false}
                      // Show week numbers to the left. Default = false
                      showWeekNumbers={false}
                      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                      onPressArrowLeft={(subtractMonth) => subtractMonth()}
                      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                      onPressArrowRight={(addMonth) => addMonth()}
                      // Disable left arrow. Default = false
                      disableArrowLeft={true}
                      // Disable right arrow. Default = false
                      disableArrowRight={true}
                      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                      disableAllTouchEventsForDisabledDays={true}
                      // Replace default month and year title with custom one. the function receive a date as parameter.
                      renderHeader={(date) => {
                        return (
                          <View>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: colors.white1,
                              }}>
                              {dayjs(date).format('MMMM YYYY')}
                            </Text>
                          </View>
                        );
                      }}
                      // Enable the option to swipe between months. Default = false
                      enableSwipeMonths={false}
                    />
                  </Card>
                  <Card>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Text
                          style={{color: colors.white1, fontWeight: 'bold'}}>
                          Monthly Accomplishment
                        </Text>
                        <VictoryPie
                          width={Dimensions.get('window').width / 2 - 16}
                          height={Dimensions.get('window').width / 2 - 16}
                          innerRadius={64}
                          colorScale={[
                            colors.success,
                            colors.error,
                            colors.neutral,
                            colors.warning,
                            colors.white1,
                          ]}
                          data={[
                            {
                              label: ' ',
                              quarter: myData.filter(
                                (d) =>
                                  dayjs(d.time).format('MM YYYY') ===
                                    dayjs(selectedDay).format('MM YYYY') &&
                                  d.fulfillment === 'opt0',
                              )?.length,
                              earnings: myData.filter(
                                (d) =>
                                  dayjs(d.time).format('MM YYYY') ===
                                    dayjs(selectedDay).format('MM YYYY') &&
                                  d.fulfillment === 'opt0',
                              )?.length,
                            },
                            {
                              label: ' ',
                              quarter: myData.filter(
                                (d) =>
                                  dayjs(d.time).format('MM YYYY') ===
                                    dayjs(selectedDay).format('MM YYYY') &&
                                  d.fulfillment === 'opt1',
                              )?.length,
                              earnings: myData.filter(
                                (d) =>
                                  dayjs(d.time).format('MM YYYY') ===
                                    dayjs(selectedDay).format('MM YYYY') &&
                                  d.fulfillment === 'opt1',
                              )?.length,
                            },
                            {
                              label: ' ',
                              quarter: myData.filter(
                                (d) =>
                                  dayjs(d.time).format('MM YYYY') ===
                                    dayjs(selectedDay).format('MM YYYY') &&
                                  d.fulfillment === 'opt2',
                              )?.length,
                              earnings: myData.filter(
                                (d) =>
                                  dayjs(d.time).format('MM YYYY') ===
                                    dayjs(selectedDay).format('MM YYYY') &&
                                  d.fulfillment === 'opt2',
                              )?.length,
                            },
                            {
                              label: ' ',
                              quarter: myData.filter(
                                (d) =>
                                  dayjs(d.time).format('MM YYYY') ===
                                    dayjs(selectedDay).format('MM YYYY') &&
                                  d.fulfillment === 'opt3',
                              )?.length,
                              earnings: myData.filter(
                                (d) =>
                                  dayjs(d.time).format('MM YYYY') ===
                                    dayjs(selectedDay).format('MM YYYY') &&
                                  d.fulfillment === 'opt3',
                              )?.length,
                            },
                            {
                              label: ' ',
                              quarter:
                                daysInMonth -
                                myData.filter(
                                  (d) =>
                                    dayjs(d.time).format('MM YYYY') ===
                                      dayjs(selectedDay).format('MM YYYY') &&
                                    d.fulfillment?.includes('opt'),
                                )?.length,
                              earnings:
                                daysInMonth -
                                myData.filter(
                                  (d) =>
                                    dayjs(d.time).format('MM YYYY') ===
                                      dayjs(selectedDay).format('MM YYYY') &&
                                    d.fulfillment?.includes('opt'),
                                )?.length,
                            },
                          ]}
                          x="quarter"
                          y="earnings"
                        />
                      </View>
                      <Legend />
                    </View>
                  </Card>
                  <Card>
                    <Motivation firstTime={firstTime} quoteIndex={quoteIndex} />
                  </Card>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: colors.white1,
                      fontWeight: 'bold',
                      marginTop: dimens.dim4,
                    }}>
                    v.1.0.0
                  </Text>
                  <Text style={{textAlign: 'center', color: colors.white1}}>
                    Faruk Yazıcı
                  </Text>
                </View>
            })}

          </Swiper>
        </View>
      </SafeAreaView>
      <Options
        day={selectedDay}
        visible={modalOpen}
        data={myData.find((d) => d.time === selectedDay)}
        onSelect={(selectedOption, isCheat) => {
          setModalOpen(!modalOpen);
          console.log('selected day', JSON.stringify(selectedDay));
          console.log('selected option', selectedOption);
          const updatedData = myData.filter((d) => d.time !== selectedDay);
          updatedData.push({
            time: selectedDay,
            fulfillment: selectedOption,
            isCheat: isCheat,
          });
          setMyData(updatedData);
          AsyncStorage.setItem('@my_data', JSON.stringify(updatedData));
        }}
        onClose={() => {
          setModalOpen(!modalOpen);
        }}
      />
    </ScrollView>
  );
};

export default Home;
