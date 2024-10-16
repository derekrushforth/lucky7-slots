import blessed from 'blessed';
import colors from 'ansi-colors';

export const slotChars = ['7', '×', 'o'];

export const instructionsContent =
  '[←][→] Change Bet   [Enter] Spin   [P] Payouts   [Q] Quit';

export const screen = blessed.screen({
  smartCSR: true,
  title: 'Lucky7',
});

export const mainBox = blessed.box({
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

export const contentBox = blessed.box({
  parent: mainBox,
  top: 'center',
  left: 'center',
  width: '100%',
  height: 23,
  align: 'center',
  valign: 'middle',
});

export const totalBox = blessed.box({
  parent: contentBox,
  top: 0,
  width: '100%',
  height: 25,
  content: '',
  align: 'center',
});

export const slotsBox = blessed.box({
  parent: contentBox,
  top: 11,
  width: '100%',
  height: 5,
  content: '',
  align: 'center',
});

export const messageBox = blessed.box({
  parent: contentBox,
  top: 16,
  width: '100%',
  height: 1,
  content: '',
  align: 'center',
});

export const betBox = blessed.box({
  parent: contentBox,
  top: 19,
  width: '100%',
  height: 1,
  content: '',
  align: 'center',
});

export const instructionsBox = blessed.box({
  parent: mainBox,
  bottom: 1,
  left: 'center',
  width: '100%',
  height: 1,
  content: colors.gray(instructionsContent),
  align: 'center',
});

export const payoutScreen = blessed.box({
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  hidden: true,
});

export const payoutBox = blessed.box({
  parent: payoutScreen,
  top: 'center',
  left: 'center',
  width: '100%',
  height: '100%',
  align: 'center',
  valign: 'middle',
});
