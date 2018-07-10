const objs = require('./index');
const checker = objs.Checker;
const teamScoresObj = objs.teamScoresObj;

test('checker function exists', () => {
  expect(typeof checker).toEqual('function');
});

test('Expect Tarantulas to equal 6', () => {
  expect(teamScoresObj.Tarantulas).toEqual(6);
});

test('Expect Snakes to equal 1', () => {
  expect(teamScoresObj.Snakes).toEqual(1);
});

test('Expect logic to return equal values when teams draw', () => {
  const arr = [
    [ 'Lions 3', ' Snakes 3' ]
  ];
  let one = arr[0].shift();
  let two = arr[0].shift();

  expect(one.slice(-1)).toEqual(two.slice(-1));
});

test('Expect logic to return home win when left value is greater', () => {
  const arr = [
    [ 'Tarantulas 1', ' FC Awesome 0' ],
  ];
  let one = arr[0].shift();
  let two = arr[0].shift();

  expect(parseInt(one.slice(-1))).toBeGreaterThan(parseInt(two.slice(-1)));
});

test('Expect logic to return away win when value on right is greater', () => {
  const arr = [
    [ 'Tarantulas 1', 'Snakes 4' ],
  ];
  let one = arr[0].shift();
  let two = arr[0].shift();

  expect(parseInt(one.slice(-1))).toBeLessThan(parseInt(two.slice(-1)));
});
