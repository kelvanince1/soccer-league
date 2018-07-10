Soccer league rankings on the command line.

Written in JavaScript, the code logs the ranking and points total for soccer teams to the console after their results have been tallied.

-- To run the file simply clone the project, open the directory in the command line and run "npm install".
Jest is the only dependency I have installed, however, so if you have Jest installed globally on your machine
you may not need to install the dependencies within this project.

-- If you do install the dependencies, you can run the test file included in this application with the command
"npm run test".
If you have jest installed globally, then you might be able to achieve the same results by ignoring npm install
and running the same command.

-- The command will run the test.js file, testing a variety of the code.

-- The projects code is otherwise written in the index.js file, so running "node index.js" in the command line
will run the file and log the expected output to the console.


SOLUTION SELF FEEDBACK
-- I am not as satisfied with this solution as I could be. I believe I could have abstracted certain code snippets much better, avoiding some of the longer/nastier if/else statements.
Nonetheless, it is a pretty decent use of recursion. As more data is added, it would only require minimal additions to handle the extra load.

-- My solution does a lot manipulating and mutating of the data that was fed back from the file reader. I'm not particularly pleased with that. If this project needed to use dynamic user data which was constantly being updated, then I would have spent more time writing abstracted objects to handle that data and passing down copies, mutating from there.
