/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.pieceCounter = function (boardArray) {
  var counter = 0;
  for (var i = 0; i < boardArray.length; i++) {
    for (var j = 0; j < boardArray.length; j++) {
      if (boardArray[i][j] === 1) {
        counter++;
      }
    }
  }
  return counter;
};

window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var grid = new Board({'n': n});

  var solutionFinder = function (rowIndex, board) {
    // iterate through columns
    // toggle Piece
    // then check if conflict with piece
    // if statement -- (!hasAnyRooksConflict) - recurse
    // if conflict
    // toggle piece
    // if row & column index at n-1 & has no conflicts
    // solution.push(board.rows())

    for (var c = 0; c < board.attributes.n; c++) {
      // debugger;
      if (rowIndex === n || c === n) {
        if (!board.hasAnyRooksConflicts()) {
          solution =  solution.concat(board.rows());
          return;
        }      
      }
      board.togglePiece(rowIndex, c);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(rowIndex, c);
      } else {
        solutionFinder(rowIndex + 1, board);
      }
    }
  };

  solutionFinder(0, grid);
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution) );
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // debugger;
  var solutionCount = 0; //fixme
  var grid = new Board({'n': n});

  var solutionFinder = function (rowIndex, board) {
    // iterate through columns
    // toggle Piece
    // then check if conflict with piece
    // if statement -- (!hasAnyRooksConflict) - recurse
    // if conflict
    // toggle piece
    // if row & column index at n-1 & has no conflicts
    // solution.push(board.rows())
    // var solutionCount = 0;
    // if (rowIndex > board.attributes.n) {
      // debugger;
    // };
    if ( pieceCounter(board.rows()) === n) {
      solutionCount++;
      return;
    }

    for (var c = 0; c < board.attributes.n; c++) {
      // debugger;
      // // if (rowIndex === n || c === n) {
      //   // if (!board.hasAnyRooksConflicts()) {
      //     console.log('im here')

      //     return;
      //   // }      
      // }
      board.togglePiece(rowIndex, c);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(rowIndex, c);
      } else {
        solutionFinder(rowIndex + 1, board);
        board.togglePiece(rowIndex, c);
      }
    }
    // return solutionCount;
  };
  solutionFinder(0, grid);


  

  // console.log('Number of solutions for ' + n + ' rooks:', solution);
  // return (n * countNRooksSolutions(n - 1));
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme

  var grid = new Board({'n': n});

  var solutionFinder = function (rowIndex, board) {
    // iterate through columns
    // toggle Piece
    // then check if conflict with piece
    // if statement -- (!hasAnyRooksConflict) - recurse
    // if conflict
    // toggle piece
    // if row & column index at n-1 & has no conflicts
    // solution.push(board.rows())

    for (var c = 0; c < board.attributes.n; c++) {
      // debugger;
      if (rowIndex === n || c === n) {
        if (!board.hasAnyQueensConflicts()) {
          solution =  solution.concat(board.rows());
          return;
        }      
      }
      board.togglePiece(rowIndex, c);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(rowIndex, c);
      } else {
        solutionFinder(rowIndex + 1, board);
      }
    }
  };

  solutionFinder(0, grid);

  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
