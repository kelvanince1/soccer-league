// Run in your command line using "node index.js"

var fs = require('fs');

// The readFileSync method is a synchronous call retrieving the text file data.
// If there was a much greater number of data in the sample-input file, then I
// would consider switching this to a createReadStream or something like that to handle the returned results
// asynchronously.
let teams = fs.readFileSync(__dirname + '/sample-input.txt', 'utf8');

// Split the results returned and convert them into a set of strings.
teams = teams.toString().split("\n");

function Checker() {
  // Define an empty array and object to later store data
  this.teamScoresObj = {};
  this.teamDataArr = [];

  // Rather than using 0, 1 or 2 as magic numbers several times throughout the function,
  // I will define them as a constants here.
  const ZERO = 0;
  const ONE = 1;
  const TWO = 2;

  // For each element in the object, split it from the other elements, making it unique
  // with the split method
  for (i in teams) {
    teamDataArr.push(teams[i].split(','));
  };

  // Unnecesary piece of data at the end of the array can be removed
  this.teamDataArr.pop();

  while(this.teamDataArr.length) {
    // While the array contains elements, take the first two entries.
    let firstTeam = this.teamDataArr[ZERO].shift();
    let secondTeam = this.teamDataArr[ZERO].shift();

    // Delete the unnecessary space at the beginning of the strings
    if (secondTeam[ZERO] === ' ') {
      secondTeam = secondTeam.substr(ONE);
    };

    let firstTeamSliced = firstTeam.slice(ZERO,-TWO);
    let secondTeamSliced = secondTeam.slice(ZERO,-TWO);

    // Take the name and score of the team from the first entry. In the sample text file, this would be 'Lions 3'
    // The value will be used as the teams points total
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
    let firstSplitString = firstTeam.split(' ');
    firstSplitString = parseInt(firstSplitString.slice(-ONE));

    let secondSplitString = secondTeam.split(' ');
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

  // Begin sorting the object in order of teams alphabetically.
  // Then, further sort it from there going by the teams with the highest points total
  let sortedResults = Object.keys(this.teamScoresObj).sort();
  sortedResults = sortedResults.sort((a,b) => this.teamScoresObj[b] - this.teamScoresObj[a]);

  let multiplePoints = 'pts';
  let singlePoint = 'pt';

  // Map the list of teams now sorted by points total and alphabetically in the event of a tied points total,
  // and concatenate the results to allow the data to be made available to the console.
  let finalStandings = sortedResults.map((team) => team.trim() + ', ' + this.teamScoresObj[team] + ((this.teamScoresObj[team] > ONE || teamScoresObj[team] === ZERO) ? multiplePoints : singlePoint));

  for (let i = ZERO; i < sortedResults.length; i++) {
    let counter = i;
    // Split the teams points total from the rest of the data. The intention is to compare it to the previous teams
    // points total and identify if they are tied for their league position or if they are ahead.
    let score = finalStandings[i].split(',')[ONE][ONE];
    let nextScore;
    // Find the next score in the previous team in the table and compare their points total with the current
    // team at the current iteration.
    // Their ranking will be equal if their points are equal.
    if (finalStandings[i - ONE]) {
      nextScore = finalStandings[i - ONE].split(',')[ONE][ONE];
    };

    if (finalStandings[i][nextScore] === finalStandings[i][score]) {

      console.log(`${counter} ${finalStandings[i]}`);
    } else {
      console.log(`${i + ONE} ${finalStandings[i]}`);
    };
  };

  return;
  // Recurse
  Checker();
}

Checker();

module.exports = {teamScoresObj, Checker};
