Hanoi Tower
By Kevin Merritt

Hanoi Tower was produced using ATOM, Google Dev Tools, Javascript, Jquery, CSS, and HTML. 

Draggable function code found via Andrew Whitaker's & Taufik Nurrohman answer on Stack Overflow. Hacked it into an indecipherable mess. Found here [http://goo.gl/qY2Rwh]

Images were found from Creative Commons / Source Forge. Wiki Commons can be found here: https://commons.wikimedia.org/wiki/Main_Page
SourceForge: http://sourceforge.net/

APPROACH:
The approach for this game was to develop a wireframes skeleton and conceptualize all the logical elements piece by piece. Once a firm understanding of the separate mechanism was planned coding began. Then, in most cases, a discarding of all the previous wireframes and machinations and starting from scratch.

ISSUES FACED:
Z-Index was different from column to column. So upon drag the grabbed piece would slide behind the other columns.
SOLUTION: Z indexes were assigned in the stacking context of each column div. I simply appended the moved piece to the body div therefore removing it from the recessed z-index. Help for this was provided via the JQUERY / JAVASCRIPT subreddits. Which ended up being a huge mistake because then I got distracted and was on reddit for hours.

TIME: There is simply not enough coffee or hours in the day.

WINS:
Implementing a dragging / snapping function (.offset)
A somewhat irrelevant modal.
Functions in functions in functions. Interwoven so poorly that no one can decipher my code or logic; therefore proprietary.

PRESENTATION:

FEATURES:
Fucking works man.
Draggable Function.
Snapping Function.
Error Function for displaced discs.
Handles multiple discs / difficulty levels.
Constructor used for storing disc amounts.
Sweet Victory Modal.
Set up very function oriented. Can easily adjust for different images, difficulty, etc.

FUTURE:
Implement a user interface to pick the discs. 
Cheat Prevention.
Reset Function. Mine is marginally bugged.
Clean up the code....A LOT.



