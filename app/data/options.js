import { colors } from "../theme/colors";

export const options = [
  {
    id: 'opt0',
    color: colors.success,
    text: 'Workout Done',
    type: 'color',
  },
  {
    id: 'opt1',
    color: colors.error,
    text: 'Skipped Workout',
    type: 'color',
  },
  {
    id: 'opt2',
    color: colors.neutral,
    text: 'Rest Day',
    type: 'color',
  },
  {
    id: 'opt3',
    color: colors.warning,
    text: 'Excuse Day',
    type: 'color',
  },
  {
    id: 'opt4',
    text: 'Cheat meal',
    type: 'icon',
    icon: require('../images/chocolade.png'),
  },
];
