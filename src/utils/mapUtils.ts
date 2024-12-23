export const calculateNewPosition = (
  currentPosition: [number, number],
  movement: { x: number; y: number }
): [number, number] => [
  currentPosition[0] + movement.y * 0.001,
  currentPosition[1] + movement.x * 0.001
];

export const determineDirection = (x: number, y: number): string => {
  if (x > 0) return 'Moving Right';
  if (x < 0) return 'Moving Left';
  if (y > 0) return 'Moving Down';
  if (y < 0) return 'Moving Up';
  return 'Idle';
};