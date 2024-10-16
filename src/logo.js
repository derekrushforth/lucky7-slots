import colors from 'ansi-colors';

const logoSpeed = 150;

const logoAnimations = {
  // Stretching dollar bill
  default: [
    // Frame 1
    colors.gray(`
/\\ /\\
(- -)
=(:^:)=
,{{${colors.green('[$]')}}},
`),
    // Frame 2
    colors.gray(`
/\\ /\\
(${colors.green('7 7')})
=(:^:)=
,}}${colors.green('[  $  ]')}{{,
`),
    // Frame 3
    colors.gray(`
/\\ /\\
(${colors.green('7 7')})
=(:^:)=
,}}${colors.green('[  $  ]')}{{,
`),
    // Frame 4
    colors.gray(`
/\\ /\\
(${colors.green('7 7')})
=(:^:)=
,}}${colors.green('[  $  ]')}{{,
`),
    // Frame 5
    colors.gray(`
/\\ /\\
(${colors.green('7 7')})
=(:^:)=
,}}${colors.green('[  $  ]')}{{,
`),
    colors.gray(`
/\\ /\\
(- -)
=(:^:)=
,}}${colors.green('[ $ ]')}{{,
`),
  ],

  // Blink & pinky tap
  tap: [
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
,,,${colors.green('[ $ ]')}’’’
`),
    // Frame 1: Eyes open
    colors.gray(`
/\\ /\\
(${colors.green('7 7')})
=(:^:)=
,,,${colors.green('[ $ ]')},,,
`),
  ],

  // Blink & pinky tap
  eyes: [
    // Frame 1: Eyes open
    colors.gray(`
/\\ /\\
(${colors.green('7 7')})
=(:^:)=
,,,${colors.red('[ $ ]')},,,
`),
    // Frame 2: Eyes closed
    colors.gray(`
/\\ /\\
(× ×)
=(:^:)=
,,,${colors.green('[ $ ]')},,,
`),
    // Frame 3
    colors.gray(`
/\\ /\\
(o o)
=(:^:)=
,,,${colors.green('[ $ ]')},,,
`),
  ],
};

function animateLogoFrame(frameIndex, animationName = 'default') {
  const frames = logoAnimations[animationName] || logoAnimations.default;
  return frames[frameIndex % frames.length];
}

export { logoSpeed, animateLogoFrame, logoAnimations };
