const colors = require("ansi-colors");

const titleSpeed = 150;
const logoSpeed = 500; // New constant for logo animation speed

function animateTitleFrame(frame) {
  const [topLine, bottomLine] = frame.text.split("\n");
  return `${frame.topColor(topLine)}\n${frame.bottomColor(bottomLine)}`;
}

function animateLogoFrame(frameIndex) {
  return logoFrames[frameIndex];
}

const logo = `
/\\ /\\
 (${colors.green("7 7")})
 =(:^:)= 
,,,${colors.green("[ $ ]")},,,
`;

const logo2 = `
/\\ /\\
 (- -)
 =(:^:)= 
,,,${colors.white("[ $ ]")},,,
`;

const logo3 = `
/\\ /\\
 (${colors.green("7 7")})
 =(:^:)= 
,,,${colors.green("[ $ ]")},,'
`;

const logoFrames = [colors.gray(logo), colors.gray(logo2), colors.gray(logo3)];

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
  logoSpeed,
  animateTitleFrame,
  animateLogoFrame,
  titleFrames,
  logoFrames,
  title,
};
