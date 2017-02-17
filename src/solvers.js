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

  var solutionFinder = function (board) {
    if ( pieceCounter(board.rows()) === n) {
      solution = board.rows();
      return;
    }

    for ( var r = 0; r < board.attributes.n; r++) {
      for ( var c = 0; c < board.attributes.n; c++) {
        if (board.attributes[r][c] === 0) {
          board.togglePiece(r, c);
          if (board.hasAnyRooksConflicts()) {
            board.togglePiece(r, c);
          } else {
            solutionFinder(board);
            // board.togglePiece(r, c);
          }
        }
      }
    }
  };

  solutionFinder(grid);
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution) );
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // debugger;
  // var solutionCount = 0; //fixme
  // var grid = new Board({'n': n});

  // var solutionFinder = function (board) {
  //   if ( pieceCounter(board.rows()) === n) {
  //     // debugger;
  //     // console.log('im here');
  //     solutionCount++;
  //     return;
  //   }

  //   for ( var r = 0; r < board.attributes.n; r++) {
  //     for ( var c = 0; c < board.attributes.n; c++) {
  //       if (board.attributes[r][c] === 0) {
  //         board.togglePiece(r, c);
  //         if (board.hasAnyRooksConflicts()) {
  //           board.togglePiece(r, c);
  //         } else {
  //           solutionFinder(board);
  //           board.togglePiece(r, c);
  //         }
  //       }
  //     }
  //   }
  // };
  // solutionFinder(grid);


  if ( n === 0 ){
    return 1;
  }

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return (n * countNRooksSolutions(n - 1));
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme




  var grid = new Board({'n': n});

  var solutionFinder = function (board) {
    if ( pieceCounter(board.rows()) === n) {
      debugger;
      solution = board.rows();
      return;
    }

    for ( var r = 0; r < board.attributes.n; r++) {
      for ( var c = 0; c < board.attributes.n; c++) {
        if (board.attributes[r][c] === 0) {
          board.togglePiece(r, c);
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(r, c);
          } else {
            solutionFinder(board);
            // board.togglePiece(r, c);
          }
        }
      }
    }
  };

  solutionFinder(grid);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
