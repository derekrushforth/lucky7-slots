const blessed = require("blessed");
const colors = require("ansi-colors");
const Table = require("cli-table3");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const {
  title,
  screen,
  mainBox,
  totalBox,
  slotsBox,
  betBox,
  messageBox,
  instructionsBox,
  payoutScreen,
  instructionsContent
} = require("./ui");

const argv = yargs(hideBin(process.argv)).option("manual", {
  alias: "m",
  type: "boolean",
  description: "Enable manual stop mode",
}).argv;

const slotChars = ["7", "×", "o"];

const slotSettings = {
  [slotChars[0]]: { multiplier: 20, label: slotChars[0].repeat(3) }, // 777
  [slotChars[1]]: { multiplier: 10, label: slotChars[1].repeat(3) }, // ×××
  [slotChars[2]]: { multiplier: 5, label: slotChars[2].repeat(3) }, // ooo
};

let total = 100;
let bet = 5;
let slots = [
  [slotChars[2], slotChars[0], slotChars[1]],
  [slotChars[1], slotChars[0], slotChars[1]],
  [slotChars[2], slotChars[0], slotChars[2]],
];

screen.append(mainBox);

function getRandomChar() {
  return slotChars[Math.floor(Math.random() * slotChars.length)];
}

let currentBetIndex = 0;
const betOptions = [5, 10, 25];
let isSpinning = false;

function updateUI(message = "") {
  const betSelectionDisplay = betOptions
    .map((option, index) => {
      const isSelected = index === currentBetIndex;
      const indicator = isSelected ? colors.green("[*]") : colors.gray("[ ]");
      const optionColor = isSelected ? colors.green : colors.gray;
      return `${indicator} ${optionColor("$" + option)}`;
    })
    .join("  ");

  totalBox.setContent(
    `${title}\n\n${
      total < 5
        ? colors.red("$" + total.toFixed(2))
        : colors.green("$" + total.toFixed(2))
    }`
  );

  slotsBox.setContent(
    colors.gray(`[ ${slots[0][0]} | ${slots[1][0]} | ${slots[2][0]} ]\n`) +
      colors.white(`[ ${slots[0][1]} | ${slots[1][1]} | ${slots[2][1]} ]\n`) +
      colors.gray(`[ ${slots[0][2]} | ${slots[1][2]} | ${slots[2][2]} ]`)
  );

  betBox.setContent(betSelectionDisplay);
  messageBox.setContent(colors.bold(message));

  // Update instructions
  instructionsBox.setContent(colors.gray(instructionsContent));

  screen.render();
}

let spinInterval;

/**
 *
 */
function spin() {
  isSpinning = true;
  total -= bet;

  spinInterval = setInterval(() => {
    if (isSpinning) {
      slots = slots.map(() => [
        getRandomChar(),
        getRandomChar(),
        getRandomChar(),
      ]);
      updateUI();
    }
  }, 100);

  if (!argv.manual) setTimeout(stopSpinning, 2000);
}

function stopSpinning() {
  isSpinning = false;
  clearInterval(spinInterval);

  const message = checkWin(slots.map((column) => column[1]));
  updateUI(message);
  screen.lockKeys = false;
}

function checkWin(finalSlots) {
  if (finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2]) {
    const winChar = finalSlots[0];
    const winAmount = bet * slotSettings[winChar].multiplier;
    total += winAmount + bet;
    return colors.green(
      `You win ${colors.yellow("$" + winAmount.toFixed(2))}!`
    );
  } else {
    return colors.red("Try again!");
  }
}

function togglePayoutScreen() {
  if (payoutScreen.hidden) {
    showPayoutScreen();
  } else {
    hidePayoutScreen();
  }
}
function showPayoutScreen() {
  const table = new Table({
    head: ["", "$5", "$10", "$25"],
    style: {
      head: ["cyan"],
      border: ["gray"],
    },
    colAligns: ["left", "right", "right", "right"],
  });

  // Sort slotSettings by multiplier in descending order
  const sortedSlotSettings = Object.entries(slotSettings).sort(
    (a, b) => b[1].multiplier - a[1].multiplier
  );

  for (const [char, settings] of sortedSlotSettings) {
    const payouts = betOptions.map(
      (bet) =>
        `$${Math.floor(bet * settings.multiplier)
          .toString()
          .padStart(3)}`
    );
    table.push([settings.label, ...payouts]);
  }

  const payoutBox = blessed.box({
    parent: payoutScreen,
    top: "center",
    left: "center",
    width: "80%",
    height: "80%",
    align: "center",
    valign: "middle",
  });

  let content = `${title}\n\n`;
  content += table.toString();

  payoutBox.setContent(content);

  const instructionsBox = blessed.box({
    parent: payoutScreen,
    bottom: 1,
    left: "center",
    width: "100%",
    height: 1,
    content: colors.gray("[P] Back"),
    align: "center",
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

function promptUser() {
  screen.lockKeys = false;
  screen.key(["left", "right", "enter", "q", "p"], (ch, key) => {
    switch (key.name) {
      case "left":
        if (isSpinning) return;
        if (payoutScreen.hidden) {
          currentBetIndex =
            (currentBetIndex - 1 + betOptions.length) % betOptions.length;
          bet = betOptions[currentBetIndex];
          updateUI();
        }
        break;
      case "right":
        if (isSpinning) return;
        if (payoutScreen.hidden) {
          currentBetIndex = (currentBetIndex + 1) % betOptions.length;
          bet = betOptions[currentBetIndex];
          updateUI();
        }
        break;
      case "enter":
        if (!payoutScreen.hidden) return;

        if (isSpinning) {
          if (argv.manual) stopSpinning();
        } else {
          spin();
          if (!argv.manual) screen.lockKeys = true;
        }

        break;
      case "q":
        exitGame();
        break;
      case "p":
        if (isSpinning) return;
        togglePayoutScreen();
        break;
    }
  });
}

function exitGame() {
  screen.destroy();
  console.log(`Thanks for playing. Your final balance is $${total.toFixed(2)}`);
  process.exit(0);
}

screen.key(["escape", "q", "C-c"], exitGame);

process.on("exit", () => {
  screen.destroy();
});

function start() {
  updateUI();
  promptUser();
}

module.exports = {
  start,
};
