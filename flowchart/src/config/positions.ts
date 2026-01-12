export type Position = { x: number; y: number };
export type PositionsMap = { [key: string]: Position };

// Desktop positions - wide layout for large screens
export const positions: PositionsMap = {
  // Vertical setup flow on the left
  '1': { x: 20, y: 20 },
  '2': { x: 80, y: 130 },
  '3': { x: 60, y: 250 },
  // Loop
  '4': { x: 40, y: 420 },
  '5': { x: 450, y: 300 },
  '6': { x: 750, y: 450 },
  '7': { x: 470, y: 520 },
  '8': { x: 200, y: 620 },
  '9': { x: 40, y: 720 },
  // Exit
  '10': { x: 350, y: 880 },
};

// Mobile positions - compact vertical layout for narrow screens
// Max x around 200px, reduced vertical spacing
export const mobilePositions: PositionsMap = {
  // Setup phase - centered column
  '1': { x: 60, y: 10 },
  '2': { x: 60, y: 90 },
  '3': { x: 60, y: 170 },
  // Loop - two column layout to fit narrow screens
  '4': { x: 20, y: 260 },
  '5': { x: 120, y: 340 },
  '6': { x: 20, y: 420 },
  '7': { x: 120, y: 500 },
  '8': { x: 20, y: 580 },
  '9': { x: 120, y: 660 },
  // Exit - centered
  '10': { x: 70, y: 760 },
};

// Note positions for desktop
export const notePositions: PositionsMap = {
  'note-1': { x: 340, y: 100 },
  'note-2': { x: 480, y: 620 },
};

// Note positions for mobile - stacked below main flow
export const mobileNotePositions: PositionsMap = {
  'note-1': { x: 20, y: 850 },
  'note-2': { x: 20, y: 980 },
};
