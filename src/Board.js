// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      var row = this.attributes[rowIndex];

      var count = row.reduce(function (memo, val) {
        return memo + val;
      }, 0);

      return count > 1 ? true : false;
       // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      for (var row in this.attributes) {
        if (Array.isArray(this.attributes[row]) === true) {
          if (this.hasRowConflictAt(row)) {
            return true;
          } 
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // check count of colIndex
        // if count is greater than 1
          // true
          // else false
      var count = 0;
      for (var row in this.attributes) { 
        if (Array.isArray(this.attributes[row])) { 
          var value = this.attributes[row][colIndex];
          count += value;
        }
      }

      return count > 1 ? true : false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var index = 0;
      while (index < this.attributes.n) {
        if ( this.hasColConflictAt(index) ) {
          return true;
        }
        index++;
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // debugger;
      var column = majorDiagonalColumnIndexAtFirstRow;
      var chessRow = 0;

      var count = 0;

      while (chessRow < this.attributes.n && column < this.attributes.n) {
        // if ( column >= 0) {
        if (column < 0) {
          column++;
          chessRow++;
        } else {
          var value = this.attributes[chessRow][column];
          count += value;
          column ++;
          chessRow ++; 
        }
      }
      return count > 1;

      // var size = this.get('n');
      // var count = 0;
      // var rowIdx = 0;
      // var colIdx = majorDiagonalColumnIndexAtFirstRow;

      // for ( ; rowIdx < size && colIdx < size; rowIdx++, colIdx++ ) {
      //   if ( colIdx >= 0 ) {
      //     var row = this.get(rowIdx);
      //     count += row[colIdx];
      //   }
      // }

      // return count > 1;

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var obj = this.attributes;
      
      for (var i = 1 - obj.n; i < obj.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i) ) {
          return true;
        }
      }

      return false; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var chessRow = 0;
      var column = minorDiagonalColumnIndexAtFirstRow;

      var count = 0;

      while (chessRow < this.attributes.n && column >= 0) {

        if (column >= this.attributes.n) {
          column --;
          chessRow++;
        } else {
    
          var value = this.attributes[chessRow][column];

          count += value;
          column --;
          chessRow += 1;
        }
      }
      return count > 1;  // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var obj = this.attributes;

      for (var i = (obj.n * 2) - 1; i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i) ) {
          return true;
        }
      }

      return false; // fixme
    }
    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
