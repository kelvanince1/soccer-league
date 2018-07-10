// Run in your command line using "node index.js"

var fs = require('fs');

// Synchronous call
// If there was a much greater number of data in the sample-input file, then I
// would consider switching this to a createReadStream or something like that to handle the data
// asynchronously.
let teams = fs.readFileSync(__dirname + '/sample-input.txt', 'utf8');

teams = teams.toString().split("\n");

function Checker() {
  // Define empty array and object to store data
  this.teamScoresObj = {};
  this.teamDataArr = [];

  // I use 0, 1 or 2 as magic numbers several times throughout the function. To
  // avoid magic numbers, I will define it as a const here.
  const ZERO = 0;
  const ONE = 1;
  const TWO = 2;

  for (i in teams) {
    teamDataArr.push(teams[i].split(','));
  };

  this.teamDataArr.pop();

  while(this.teamDataArr.length) {

    // While the array contains elements, take the first two entries.
    let one = this.teamDataArr[ZERO].shift();
    let two = this.teamDataArr[ZERO].shift();

    // Delete the unnecessary space at the beginning of the strings
    if (two[ZERO] === ' ') {
      two = two.substr(ONE);
    };

    let firstTeamSliced = one.slice(ZERO,-TWO);
    let secondTeamSliced = two.slice(ZERO,-TWO);

    // Take the name of the team from the first entry. In sample text, this would be 'Lions 3'
    // If they do not yet have a value, set it to 0 to begin with.
    // This will prevent the value returning NaN when used later
    if(!this.teamScoresObj[firstTeamSliced]) {
      this.teamScoresObj[firstTeamSliced] = ZERO;
    };

    // Follow the same practice for the second entry. In sample text, this would be 'Snakes 3'
    if(!this.teamScoresObj[secondTeamSliced]) {
      this.teamScoresObj[secondTeamSliced] = ZERO;
    };

    // Split each of the strings and parseInt the final element of each to handle the case
    // where a team scores double digit goals
    let firstSplitString = one.split(' ');
    firstSplitString = parseInt(firstSplitString.slice(-ONE));

    let secondSplitString = two.split(' ');
    secondSplitString = parseInt(secondSplitString.slice(-ONE));

    // Compare the final character in each entry, the teams score.
    if (firstSplitString === secondSplitString) {
      // If they are equal, it is a draw and incement each teams value by ONE
      this.teamScoresObj[firstTeamSliced]+=ONE;
      this.teamScoresObj[secondTeamSliced]+=ONE;
    } else if (firstSplitString > secondSplitString) {
      // If the home team wins, incement their value by 3
      this.teamScoresObj[firstTeamSliced]+=3;
    } else if (secondSplitString > firstSplitString) {
      // If the away team wins, increment their value by 3
      this.teamScoresObj[secondTeamSliced]+=3;
    };

    // Remove the first element of the array.
    // Since this function is recursive, while there are still values in the array,
    // at each iteration it will knock off the first one that has been processed and
    // move onto the second one.
    this.teamDataArr.shift();
  };

  // Begin sorting the object in order of teams with the highest points totals
  // Use an ES6 arrow function and the sort method to break down the values within
  // each key of the object and compare.
  let sort = Object.keys(this.teamScoresObj).sort();
  sort = sort.sort((a,b) => this.teamScoresObj[b] - this.teamScoresObj[a]);

  let multiplePoints = 'pts';
  let singlePoint = 'pt';

  let sorter = sort.map((iterator) => iterator + ', ' + this.teamScoresObj[iterator] + ((this.teamScoresObj[iterator] > ONE || teamScoresObj[iterator] === ZERO) ? multiplePoints : singlePoint));

  for (let i = ZERO; i < sort.length; i++) {
    let counter = i;
    let score = sorter[i].split(',')[ONE][ONE];
    let nextScore;
    if (sorter[i - ONE]) {
      nextScore = sorter[i - ONE].split(',')[ONE][ONE];
    };

    if (sorter[i][nextScore] === sorter[i][score]) {

      console.log(`${counter} ${sorter[i]}`);
    } else {
      console.log(`${i + ONE} ${sorter[i]}`);
    };
  };

  return;
  // Recurse
  Checker();
}

Checker();

module.exports = {teamScoresObj, Checker};
