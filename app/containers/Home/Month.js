/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import { text } from '@fortawesome/fontawesome-svg-core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { Calendar } from '../../components/Calendar';
import Card from '../../components/Card';
import Legend from '../../components/Legend';
import Motivation from '../../components/Motivation';
import { colors } from '../../theme/colors';
import { dimens } from '../../theme/dimens';
import Options from './Options';

const Month = ({ data, setData, month }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [daysInMonth, setDaysInMonth] = useState(dayjs().daysInMonth());
  return (
    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
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
          <Text style={{ fontWeight: 'bold', color: colors.white1 }}>{dayjs(date).format('MMYYYY-MM')}</Text>
        </View>
      );
    }}
    // Enable the option to swipe between months. Default = false
  />
</Card> */}
      <Card>
        <Calendar
          options={data}
          style={{
            overflow: 'hidden',
          }}
          s
          current={month}
          minDate="2012-05-10"
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
          monthFormat="yyyy MM"
        // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(m) => {
            setSelectedDay(m.dateString);
            console.log('month changed', m);
            setDaysInMonth(dayjs(m.timestamp).daysInMonth());
          }}
          hideArrows
          hideExtraDays={false}
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers={false}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableArrowLeft
          disableArrowRight
          disableAllTouchEventsForDisabledDays
          renderHeader={(date) => (
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.white1,
                }}
              >
                {dayjs(date).format('MMMM YYYY')}
              </Text>
            </View>
          )}
        // Enable the option to swipe between months. Default = false
          enableSwipeMonths={false}
        />
      </Card>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={{ color: colors.white1, fontWeight: 'bold' }}
            >
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
                  quarter: data.filter(
                    (d) => dayjs(d.time).format('YYYY-MM')
                    === month
                    && d.fulfillment === 'opt0',
                  )?.length,
                  earnings: data.filter(
                    (d) => dayjs(d.time).format('YYYY-MM')
                    === month
                    && d.fulfillment === 'opt0',
                  )?.length,
                },
                {
                  label: ' ',
                  quarter: data.filter(
                    (d) => dayjs(d.time).format('YYYY-MM')
                    === month
                    && d.fulfillment === 'opt1',
                  )?.length,
                  earnings: data.filter(
                    (d) => dayjs(d.time).format('YYYY-MM')
                    === month
                    && d.fulfillment === 'opt1',
                  )?.length,
                },
                {
                  label: ' ',
                  quarter: data.filter(
                    (d) => dayjs(d.time).format('YYYY-MM')
                    === month
                    && d.fulfillment === 'opt2',
                  )?.length,
                  earnings: data.filter(
                    (d) => dayjs(d.time).format('YYYY-MM')
                    === month
                    && d.fulfillment === 'opt2',
                  )?.length,
                },
                {
                  label: ' ',
                  quarter: data.filter(
                    (d) => dayjs(d.time).format('YYYY-MM')
                    === month
                    && d.fulfillment === 'opt3',
                  )?.length,
                  earnings: data.filter(
                    (d) => dayjs(d.time).format('YYYY-MM')
                    === month
                    && d.fulfillment === 'opt3',
                  )?.length,
                },
                {
                  label: ' ',
                  quarter:
                  daysInMonth
                  - data.filter(
                    (d) => dayjs(d.time).format('YYYY-MM')
                      === month
                      && d.fulfillment?.includes('opt'),
                  )?.length,
                  earnings:
                  daysInMonth
                  - data.filter(
                    (d) => dayjs(d.time).format('YYYY-MM')
                      === month
                      && d.fulfillment?.includes('opt'),
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
        <Motivation />
      </Card>
      <Text
        style={{
          textAlign: 'center',
          color: colors.white1,
          fontWeight: 'bold',
          marginTop: dimens.dim4,
        }}
      >
        v.1.0.0
      </Text>
      <Text style={{ textAlign: 'center', color: colors.white1 }}>
        Faruk Yazıcı
      </Text>
      <Options
        day={selectedDay}
        visible={modalOpen}
        data={data.find((d) => d.time === selectedDay)}
        onSelect={(selectedOption, isCheat, text) => {
          setModalOpen(!modalOpen);
          console.log('selected day', JSON.stringify(selectedDay));
          console.log('selected option', selectedOption);
          const updatedData = data.filter((d) => d.time !== selectedDay);
          updatedData.push({
            time: selectedDay,
            fulfillment: selectedOption,
            note: text,
            isCheat,
          });
          setData(updatedData);
          AsyncStorage.setItem('@my_data', JSON.stringify(updatedData));
        }}
        onClose={() => {
          setModalOpen(!modalOpen);
        }}
      />
    </View>
  );
};

export default Month;
