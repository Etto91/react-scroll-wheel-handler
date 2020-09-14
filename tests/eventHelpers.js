function createClientXY(x, y) {
  return { clientX: x, clientY: y };
}

export function createStartTouchEventObject({ x = 0, y = 0 }) {
  return { changedTouches: [createClientXY(x, y)] };
}

export function createMoveTouchEventObject({ x = 0, y = 0 }) {
  return { changedTouches: [createClientXY(x, y)] };
}
