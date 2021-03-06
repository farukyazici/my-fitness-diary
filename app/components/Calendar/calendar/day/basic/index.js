import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  TouchableOpacity, Text, View, Image, Dimensions,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faTimesCircle,
  faCheck,
  faStickyNote,
} from '@fortawesome/free-solid-svg-icons';
import { shouldUpdate } from '../../../component-updater';
import styleConstructor from './style';
import Marking from '../marking';
import { options } from '../../../../../data/options';
import { colors } from '../../../../../theme/colors';

export default class BasicDay extends Component {
  static displayName = 'IGNORE';

  static propTypes = {
    state: PropTypes.oneOf(['disabled', 'today', '']), // TODO: deprecate
    /** The marking object */
    marking: PropTypes.any,
    /** Date marking style [simple/period/multi-dot/multi-period]. Default = 'simple' */
    markingType: PropTypes.oneOf(_.values(Marking.markingTypes)),
    /** Theme object */
    theme: PropTypes.object,
    /** onPress callback */
    onPress: PropTypes.func,
    /** onLongPress callback */
    onLongPress: PropTypes.func,
    /** The date to return from press callbacks */
    date: PropTypes.object,
    /** Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates */
    disableAllTouchEventsForDisabledDays: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.style = styleConstructor(props.theme);
  }

  shouldComponentUpdate(nextProps) {
    return shouldUpdate(this.props, nextProps, [
      'children',
      'state',
      'markingType',
      'marking',
      'onPress',
      'onLongPress',
      'date',
      'option',
      'options',
    ]);
  }

  onPress = () => {
    _.invoke(this.props, 'onPress', this.props.date);
  };

  onLongPress = () => {
    _.invoke(this.props, 'onLongPress', this.props.date);
  };

  get marking() {
    let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true,
      };
    }
    return marking;
  }

  shouldDisableTouchEvent() {
    const { disableAllTouchEventsForDisabledDays } = this.props;
    const { disableTouchEvent } = this.marking;
    let disableTouch = false;

    if (typeof disableTouchEvent === 'boolean') {
      disableTouch = disableTouchEvent;
    } else if (
      typeof disableAllTouchEventsForDisabledDays === 'boolean'
      && this.isDisabled()
    ) {
      disableTouch = disableAllTouchEventsForDisabledDays;
    }
    return disableTouch;
  }

  isDisabled() {
    return typeof this.marking.disabled !== 'undefined'
      ? this.marking.disabled
      : this.props.state === 'disabled';
  }

  isToday() {
    return this.props.state === 'today';
  }

  isMultiDot() {
    return this.props.markingType === Marking.markingTypes.multiDot;
  }

  isMultiPeriod() {
    return this.props.markingType === Marking.markingTypes.multiPeriod;
  }

  isCustom() {
    return this.props.markingType === Marking.markingTypes.custom;
  }

  getContainerStyle() {
    const { customStyles, selected, selectedColor } = this.props.marking;
    const style = [
      this.style.base,
      {
        backgroundColor: options.find(
          (o) => o.id === this.props.option?.fulfillment,
        )?.color || colors.gray1,
      },
    ];

    if (selected) {
      style.push(this.style.selected);
      if (selectedColor) {
        style.push({ backgroundColor: selectedColor });
      }
    } else if (this.isToday()) {
      style.push(this.style.today);
    }

    // Custom marking type
    if (this.isCustom() && customStyles && customStyles.container) {
      if (customStyles.container.borderRadius === undefined) {
        customStyles.container.borderRadius = 16;
      }
      style.push(customStyles.container);
    }

    return style;
  }

  getTextStyle() {
    const { customStyles, selected, selectedTextColor } = this.props.marking;
    const style = [this.style.text];

    if (selected) {
      style.push(this.style.selectedText);
      if (selectedTextColor) {
        style.push({ color: selectedTextColor });
      }
    } else if (this.isDisabled()) {
      style.push(this.style.disabledText);
    } else if (this.isToday()) {
      style.push(this.style.todayText);
    }

    // Custom marking type
    if (this.isCustom() && customStyles && customStyles.text) {
      style.push(customStyles.text);
    }

    return style;
  }

  renderMarking() {
    const { theme, markingType } = this.props;
    const {
      selected, marked, dotColor, dots, periods,
    } = this.marking;

    return (
      <Marking
        type={markingType}
        theme={theme}
        marked={this.isMultiDot() ? true : marked}
        selected={selected}
        disabled={this.isDisabled()}
        today={this.isToday()}
        dotColor={dotColor}
        dots={dots}
        periods={periods}
      />
    );
  }

  renderText() {
    return (
      <View style={{}}>
        <Text allowFontScaling={false} style={this.getTextStyle()}>
          {String(this.props.children)}
        </Text>
      </View>
    );
  }

  renderContent() {
    return (
      <>
        {this.renderText()}
        {this.renderMarking()}
      </>
    );
  }

  renderContainer() {
    const { activeOpacity } = this.marking;

    return (
      <TouchableOpacity
        testID={this.props.testID}
        style={this.getContainerStyle()}
        disabled={this.shouldDisableTouchEvent()}
        activeOpacity={activeOpacity}
        onPress={!this.shouldDisableTouchEvent() ? this.onPress : undefined}
        onLongPress={
          !this.shouldDisableTouchEvent() ? this.onLongPress : undefined
        }
        accessible
        accessibilityRole={this.isDisabled() ? undefined : 'button'}
        accessibilityLabel={this.props.accessibilityLabel}
      >
        {this.isMultiPeriod() ? this.renderText() : this.renderContent()}
        {this.props.option?.isCheat && (
          <Image
            source={require('../../../../../images/chocolade.png')}
            style={{
              width: 16, height: 16, position: 'absolute', right: 2, top: 2,
            }}
          />
        )}
        {this.props.option?.note?.length > 0 && <FontAwesomeIcon
          icon={faStickyNote}
          color={colors.white1}
          size={12}
          style={{ position: 'absolute', left: 2, bottom: 2 }}
        />}
      </TouchableOpacity>
    );
  }

  renderPeriodsContainer() {
    return (
      <View style={this.style.container}>
        {this.renderContainer()}
        {this.renderMarking()}
      </View>
    );
  }

  render() {
    return this.isMultiPeriod()
      ? this.renderPeriodsContainer()
      : this.renderContainer();
  }
}
