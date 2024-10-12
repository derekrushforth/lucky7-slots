const blessed = require('blessed');
const colors = require('ansi-colors');
const Table = require('cli-table3');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const {
  slotChars,
  screen,
  mainBox,
  totalBox,
  slotsBox,
  betBox,
  messageBox,
  instructionsBox,
  payoutScreen,
  payoutBox,
  instructionsContent,
} = require('./ui');
const { titleSpeed, animateTitleFrame, titleFrames, title } = require('./title');
const { animateLogoFrame } = require('./logo');
const { formatDollarAmount } = require('./utils');

const argv = yargs(hideBin(process.argv)).option('manual', {
  alias: 'm',
  type: 'boolean',
  description: 'Enable manual stop mode',
}).argv;

let total = 100;
let bet = 1;
const slotSpeed = 150;
const slotTimeout = 2000;
const betOptions = [1, 10, 25, 50, 100, 1000];
let currentBetIndex = 0;
let isSpinning = false;
let spinInterval;
let titleAnimationInterval;
let currentTitleFrameIndex = 0;
let currentLogoFrameIndex = 0;

const slotSettings = {
  [slotChars[0]]: { multiplier: 20, label: slotChars[0].repeat(3) }, // 777
  [slotChars[1]]: { multiplier: 10, label: slotChars[1].repeat(3) }, // ×××
  [slotChars[2]]: { multiplier: 5, label: slotChars[2].repeat(3) }, // ooo
};

let slots = [
  [slotChars[2], slotChars[0], slotChars[1]],
  [slotChars[1], slotChars[0], slotChars[1]],
  [slotChars[2], slotChars[0], slotChars[2]],
];

screen.append(mainBox);

function getRandomChar() {
  return slotChars[Math.floor(Math.random() * slotChars.length)];
}

function updateUI(message = '') {
  totalBox.setContent(
    `${animateLogoFrame(currentLogoFrameIndex)}\n\n${animateTitleFrame(titleFrames[currentTitleFrameIndex])}\n\n${
      total < 5
        ? colors.red(formatDollarAmount(total))
        : colors.green(formatDollarAmount(total))
    }`
  );

  slotsBox.setContent(
    colors.gray(`[ ${slots[0][0]} | ${slots[1][0]} | ${slots[2][0]} ]\n`) +
      colors.white(`[ ${slots[0][1]} | ${slots[1][1]} | ${slots[2][1]} ]\n`) +
      colors.gray(`[ ${slots[0][2]} | ${slots[1][2]} | ${slots[2][2]} ]`)
  );

  betBox.setContent(
    betOptions
      .map((option, index) => {
        const isSelected = index === currentBetIndex;
        const indicator = isSelected ? colors.green('[*]') : colors.gray('[ ]');
        const optionColor = isSelected ? colors.green : colors.gray;
        return `${indicator} ${optionColor(formatDollarAmount(option))}`;
      })
      .join('  ')
  );

  // Update message content
  if (argv.manual && isSpinning) {
    messageBox.setContent(colors.gray('[Enter] Stop'));
  } else {
    messageBox.setContent(message);
  }

  // Update instructions
  instructionsBox.setContent(colors.gray(instructionsContent));

  screen.render();
}

/**
 *
 */
function spin() {
  isSpinning = true;
  total -= bet;

  // Spin the slots
  spinInterval = setInterval(() => {
    if (isSpinning) {
      slots = slots.map((column) => {
        // Move existing characters down
        column[2] = column[1];
        column[1] = column[0];
        // Generate new character for the top row
        column[0] = getRandomChar();
        return column;
      });
      updateUI();
    }
  }, slotSpeed);

  // Animate title and logo
  titleAnimationInterval = setInterval(() => {
    currentTitleFrameIndex = (currentTitleFrameIndex + 1) % titleFrames.length;
    currentLogoFrameIndex = (currentLogoFrameIndex + 1);
    updateUI();
  }, titleSpeed);

  if (argv.manual) {
    updateUI(colors.yellow('[Enter] Stop'));
  } else {
    setTimeout(stopSpinning, slotTimeout);
  }
}

function stopSpinning() {
  isSpinning = false;
  clearInterval(spinInterval);
  clearInterval(titleAnimationInterval);

  const message = checkWin(slots.map((column) => column[1]));
  currentTitleFrameIndex = 0;
  currentLogoFrameIndex = 0;
  updateUI(message);
  screen.lockKeys = false;
}

function checkWin(finalSlots) {
  if (finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2]) {
    const winChar = finalSlots[0];
    const winAmount = bet * slotSettings[winChar].multiplier;
    total += winAmount + bet;
    return colors.green(
      `You won ${formatDollarAmount(Math.floor(winAmount))}!`
    );
  } else {
    return colors.red('Try again');
  }
}

/**
 * Payout screen
 */
function togglePayoutScreen() {
  if (payoutScreen.hidden) {
    showPayoutScreen();
  } else {
    hidePayoutScreen();
  }
}

function showPayoutScreen() {
  const table = new Table({
    head: ['', ...betOptions.map((bet) => formatDollarAmount(bet))],
    style: {
      head: ['gray'],
      border: ['gray'],
    },
    colAligns: ['left', ...betOptions.map(() => 'right')],
  });

  // Sort slotSettings by multiplier in descending order
  const sortedSlotSettings = Object.entries(slotSettings).sort(
    (a, b) => b[1].multiplier - a[1].multiplier
  );

  for (const [char, settings] of sortedSlotSettings) {
    const payouts = betOptions.map((bet) =>
      formatDollarAmount(Math.floor(bet * settings.multiplier)).padStart(4)
    );
    table.push([colors.gray(settings.label), ...payouts]);
  }

  let content = `${colors.gray(logo)}\n\n${title}\n\n`;
  content += table.toString();
  content += '\n';

  payoutBox.setContent(content);

  const instructionsBox = blessed.box({
    parent: payoutScreen,
    bottom: 1,
    left: 'center',
    width: '100%',
    height: 1,
    content: colors.gray('[P] Back'),
    align: 'center',
  });

  mainBox.hide();
  payoutScreen.show();
  screen.render();
}

function hidePayoutScreen() {
  payoutScreen.hide();
  mainBox.show();
  screen.render();
}

/**
 * Prompt user for input
 */
function promptUser() {
  screen.lockKeys = false;

  screen.key(['left', 'right', 'enter', 'q', 'p'], (ch, key) => {
    switch (key.name) {
      case 'left':
        if (isSpinning) return;
        if (payoutScreen.hidden) {
          currentBetIndex =
            (currentBetIndex - 1 + betOptions.length) % betOptions.length;
          bet = betOptions[currentBetIndex];
          updateUI();
        }
        break;
      case 'right':
        if (isSpinning) return;
        if (payoutScreen.hidden) {
          currentBetIndex = (currentBetIndex + 1) % betOptions.length;
          bet = betOptions[currentBetIndex];
          updateUI();
        }
        break;
      case 'enter':
        if (!payoutScreen.hidden) return;

        if (isSpinning) {
          if (argv.manual) stopSpinning();
        } else {
          spin();
          if (!argv.manual) screen.lockKeys = true;
        }
        break;
      case 'q':
        exitGame();
        break;
      case 'p':
        if (isSpinning) return;
        togglePayoutScreen();
        break;
    }
  });
}

function exitGame() {
  screen.destroy();
  console.log(
    `Thanks for playing. Your final balance is ${formatDollarAmount(total)}`
  );
  process.exit(0);
}

screen.key(['escape', 'q', 'C-c'], exitGame);

process.on('exit', () => {
  screen.destroy();
});

function start() {
  updateUI();
  promptUser();
}

module.exports = {
  start,
};
