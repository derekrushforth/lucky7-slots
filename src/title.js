import colors from 'ansi-colors';

export const titleSpeed = 150;

export function animateTitleFrame(frame) {
  const [topLine, bottomLine] = frame.text.split('\n');
  return `${frame.topColor(topLine)}\n${frame.bottomColor(bottomLine)}`;
}

export const title = `█   █ █ █▀▀ █▄▀ █▄█ ▀▀█
█▄▄ █▄█ █▄▄ █ █  █    █`;

export const titleFrames = [
  { text: title, topColor: colors.white, bottomColor: colors.white },
  { text: title, topColor: colors.white, bottomColor: colors.green },
  { text: title, topColor: colors.green, bottomColor: colors.green },
  { text: title, topColor: colors.green, bottomColor: colors.white },
  { text: title, topColor: colors.white, bottomColor: colors.red },
  { text: title, topColor: colors.red, bottomColor: colors.red },
  { text: title, topColor: colors.red, bottomColor: colors.white },
];
