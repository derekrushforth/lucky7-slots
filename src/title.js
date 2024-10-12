const colors = require("ansi-colors");

function animateTitleFrame(frame) {
  return frame.color(frame.text);
}

const title = `█   █ █ █▀▀ █▄▀ █▄█ ▀▀█
█▄▄ █▄█ █▄▄ █ █  █    █`;

const titleFrames = [
  { text: title, color: colors.white },
  { text: title, color: colors.green },
  { text: title, color: colors.yellow },
];

module.exports = {
  animateTitleFrame,
  titleFrames,
  title,
};
