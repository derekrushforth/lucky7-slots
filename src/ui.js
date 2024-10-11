const blessed = require("blessed");
const colors = require("ansi-colors");
const Table = require("cli-table3");

const title = `█   █ █ █▀▀ █▄▀ █▄█ ▀▀█
█▄▄ █▄█ █▄▄ █ █  █    █`;

const instructionsContent =
  "[←][→] Change Bet   [Enter] Spin   [P] Payouts   [Q] Quit";

const screen = blessed.screen({
  smartCSR: true,
  title: "Slots",
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
  height: 16,
  align: "center",
  valign: "middle",
});

const totalBox = blessed.box({
  parent: contentBox,
  top: 0,
  width: "100%",
  height: 4,
  content: "",
  align: "center",
});

const slotsBox = blessed.box({
  parent: contentBox,
  top: 6,
  width: "100%",
  height: 5,
  content: "",
  align: "center",
});

const betBox = blessed.box({
  parent: contentBox,
  top: 12,
  width: "100%",
  height: 1,
  content: "",
  align: "center",
});

const messageBox = blessed.box({
  parent: contentBox,
  top: 10,
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

// Export all components at the end of the file
module.exports = {
  title,
  screen,
  mainBox,
  contentBox,
  totalBox,
  slotsBox,
  betBox,
  messageBox,
  instructionsBox,
  payoutScreen,
  instructionsContent
};
