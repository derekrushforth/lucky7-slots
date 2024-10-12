const colors = require('ansi-colors');

const logoSpeed = 150;

const logoAnimations = {
  // Stretching dollar bill
  default: [
    // Frame 1: Normal state
    colors.gray(`
/\\ /\\
 (${colors.green('7 7')})
 =(:^:)= 
,}}${colors.green('[ $ ]')}{{,
`),
    // Frame 2: Eyes closed, dollar bill slightly stretched
    colors.gray(`
/\\ /\\
 (- -)
 =(:^:)= 
,}}${colors.green('[  $  ]')}{{,
`),
    // Frame 3: Eyes open, dollar bill fully stretched
    colors.gray(`
/\\ /\\
 (${colors.green('7 7')})
 =(:^:)= 
,,,${colors.green('[   $   ]')},,,
`),
  ],

  // Blink & pinky tap
  blinking: [
    // Frame 1: Eyes open
    colors.gray(`
/\\ /\\
 (${colors.green('7 7')})
 =(:^:)= 
,,,${colors.green('[ $ ]')},,,
`),
    // Frame 2: Eyes closed
    colors.gray(`
/\\ /\\
 (- -)
 =(:^:)= 
,,,${colors.green('[ $ ]')},,'
`),
  ]
};

function animateLogoFrame(frameIndex, animationName = 'default') {
  const frames = logoAnimations[animationName] || logoAnimations.default;
  return frames[frameIndex % frames.length];
}

module.exports = {
  logoSpeed,
  animateLogoFrame,
  logoAnimations,
};
