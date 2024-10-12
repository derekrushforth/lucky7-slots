const colors = require("ansi-colors");

const titleSpeed = 150;

function animateTitleFrame(frame) {
  const [topLine, bottomLine] = frame.text.split("\n");
  return `${frame.topColor(topLine)}\n${frame.bottomColor(bottomLine)}`;
}

const title = `█   █ █ █▀▀ █▄▀ █▄█ ▀▀█
█▄▄ █▄█ █▄▄ █ █  █    █`;
const title2 = `█   █ █ █▀▀ █▄▀ █▄█ ▀▀█
█▄▄ █▄█ █▄▄ █ █  █    █`;

const titleFrames = [
  { text: title, topColor: colors.white, bottomColor: colors.white },
  { text: title2, topColor: colors.white, bottomColor: colors.green },
  { text: title, topColor: colors.green, bottomColor: colors.green },
  { text: title2, topColor: colors.green, bottomColor: colors.white },
];

module.exports = {
  titleSpeed,
  animateTitleFrame,
  titleFrames,
  title,
};
