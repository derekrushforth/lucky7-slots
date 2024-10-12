const blessed = require("blessed");
const colors = require("ansi-colors");

const slotChars = ["7", "×", "o"];

const instructionsContent =
  "[←][→] Change Bet   [Enter] Spin   [P] Payouts   [Q] Quit";

const screen = blessed.screen({
  smartCSR: true,
  title: "Lucky7",
});

const mainBox = blessed.box({
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

const contentBox = blessed.box({
  parent: mainBox,
  top: "center",
  left: "center",
  width: "50%",
  height: 23,
  align: "center",
  valign: "middle",
});

const totalBox = blessed.box({
  parent: contentBox,
  top: 0,
  width: "100%",
  height: 25,
  content: "",
  align: "center",
});

const slotsBox = blessed.box({
  parent: contentBox,
  top: 11,
  width: "100%",
  height: 5,
  content: "",
  align: "center",
});

const messageBox = blessed.box({
  parent: contentBox,
  top: 16,
  width: "100%",
  height: 1,
  content: "",
  align: "center",
});

const betBox = blessed.box({
  parent: contentBox,
  top: 19,
  width: "100%",
  height: 1,
  content: "",
  align: "center",
});

const instructionsBox = blessed.box({
  parent: mainBox,
  bottom: 1,
  left: "center",
  width: "100%",
  height: 1,
  content: colors.gray(instructionsContent),
  align: "center",
});

const payoutScreen = blessed.box({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  hidden: true,
});

const payoutBox = blessed.box({
  parent: payoutScreen,
  top: "center",
  left: "center",
  width: "80%",
  height: "80%",
  align: "center",
  valign: "middle",
});

module.exports = {
  slotChars,
  screen,
  mainBox,
  contentBox,
  totalBox,
  slotsBox,
  betBox,
  messageBox,
  instructionsBox,
  payoutScreen,
  payoutBox,
  instructionsContent,
};
