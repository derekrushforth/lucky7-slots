const blessed = require('blessed');
const { titleSpeed, animateTitleFrame, titleFrames } = require('./title');
const { animateLogoFrame } = require('./logo');

// Create a new screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'Animation Test',
});

// Create a box for displaying animations
const animationBox = blessed.box({
  top: 'center',
  left: 'center',
  width: '100%',
  height: '100%',
  align: 'center',
  valign: 'middle',
});

screen.append(animationBox);

let currentTitleFrameIndex = 0;
let currentLogoFrameIndex = 0;

function updateAnimation() {
  const content = `
${animateLogoFrame(currentLogoFrameIndex)}

${animateTitleFrame(titleFrames[currentTitleFrameIndex])}


${animateLogoFrame(currentLogoFrameIndex, 'blinking')}

${animateTitleFrame(titleFrames[currentTitleFrameIndex])}

  `;

  animationBox.setContent(content);
  screen.render();
}

// Animate title and logo
const animationInterval = setInterval(() => {
  currentTitleFrameIndex = (currentTitleFrameIndex + 1) % titleFrames.length;
  currentLogoFrameIndex = currentLogoFrameIndex + 1;
  updateAnimation();
}, titleSpeed);

// Handle user input
screen.key(['escape', 'q', 'C-c'], () => {
  clearInterval(animationInterval);
  screen.destroy();
  process.exit(0);
});

updateAnimation();

screen.render();
