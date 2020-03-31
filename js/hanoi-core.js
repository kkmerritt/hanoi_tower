//NOTE - Hanoi Tower Javascript / Jquery Page
//NOTE - Base Pixel (given your disc size) is for top margin 430px. No More than 11x Disc at 30px width.
//NOTE - Discs are 280px x 30px

// INITIALIZE VARIABLES
playHanoi();

function playHanoi() {
  var numOfDiscs = 3;
  var discWidth = 280;   // Sets an Initial disc width. 280 Matches the Columns.
  var column1 = numOfDiscs;  //Set number of discs per column
  var column2 = 0;
  var column3 = 0;
  topDiscs = [numOfDiscs, 0, 0]; // array with top disc id's in corresponding columns
  discHold = [];         // Array of the disc DIVs with their dimensions, namaes, and positions.
  var margintop = 430;   // This is the Position Setting Variable. If div dimensions change, this will set the inital placement.


  for (var i = 1; i < numOfDiscs+1; i ++) {  //Creates discs, place in discHold array
    var tempDisc =('<div class="colPos1 disc" id="' + i + '">');
    discHold[i] = new discConstructor(tempDisc, margintop, discWidth)
    margintop = margintop - 30;
    discWidth = discWidth * .85;
  }// END INITIALIZE VARIABLES

  $(document).ready(function() {
    $('#play').on("click", function(e){
      setTimeout(placeDiscs, 5);
      setTimeout(findDraggable, 10);
    }); //end playclick
  });//end document ready


  // NOTE: Simple Functions!


  function findDraggable(){  //If columns have discs enter into makeDraggable function.

    if (column1 > 0) { makeDraggable(column1, 'colPos1');} else {topDiscs[0] = 0;}
    if (column2 > 0) { makeDraggable(column2, 'colPos2');} else {topDiscs[1] = 0;}
    if (column3 > 0) { makeDraggable(column3, 'colPos3');} else {topDiscs[2] = 0;}

    function makeDraggable(x, columnX){ //nested function to turn the top disc of the column into draggable.
      highID = null;
      var tempDiv = null;
      for (var i = 1; i < numOfDiscs+1; i++){  //FIXME: this isn't working exactly right...i don't think.
      tempDiv = $('#' + i + '.' + columnX)
      if (highID < parseInt(tempDiv.attr("id"))) { //Find the highest numbered div (smallest disc)
        highID = parseInt(tempDiv.attr("id"));
      }
    }
    $('#' + highID).addClass('drag');  //make smallest div [highest index] in column draggable.
    if (columnX == 'colPos1'){topDiscs[0] = highID;}
    if (columnX == 'colPos2'){topDiscs[1] = highID;}
    if (columnX == 'colPos3'){topDiscs[2] = highID;}
  }; // end makeDraggable
} // end findDraggable


function discConstructor(divString, margintop, discWidth) {  //basic constructor. receives a div in string form and a y coordinate.
  this.divString = divString;
  this.margintop = margintop;
  this.discWidth = discWidth;
};

function placeDiscs(){
  for (var i = 1; i < numOfDiscs+1; i ++){
    $('.col1').append(discHold[i].divString);
    $("#"+i).css("top", discHold[i].margintop);
    $("#"+i).css("background-size", discHold[i].discWidth);
  };
};

function moveCheck(){
  var x = parseInt($(".snapclass").attr("id"));

  if ($(".snapclass").hasClass("colPos1")){
    if (x < topDiscs[0]){
      $('.snapclass').css("top", 0);
      $('.snapclass').css("left", 0);}
    }
    if ($(".snapclass").hasClass("colPos2")){
      if (x < topDiscs[1]){
        $('.snapclass').css("top", 0);
        $('.snapclass').css("left", 0);}
      }
      if ($(".snapclass").hasClass("colPos3")){
        if (x < topDiscs[2]){
          $('.snapclass').css("top", 0);
          $('.snapclass').css("left", 0); }
        }
      }// END of moveCheck Function!

      function winCheck(){
        if (column3 == numOfDiscs){
          var modal = $('.modal');
          modal.addClass('.active')
          modal.animate({"top": "280px"}, 800) }
          $('.modal').on("click", function(){
            $(".disc").remove();
            $('.modal').animate({"top": "-440px"}, 800)
            $(".modal").removeClass('.active');
            // resetGame();
          })
        }


        function resetGame(){  //NOTE: not currently in use.
          numOfDiscs = null;
          $('.disc').remove();
          column1 = null; column2 = null; column3 = null, columnX = null;
          var discWidth = null;
          topDiscs = [null];
          discHold = [null];
          var margintop = null;


          playHanoi();
        }

        // NOTE: END Simple Functions!

        // NOTE: This is a middle note to make the spacing seem more dramatic. Drama!

        // NOTE: Complex Functions!

        function snapDisc(movingDisc,x,y){  // function to check pageY, pageX coordinates and if close to a column snap the disc to it.
          var snapper = null;
          var columnX = 0;
          if (x > 50 && x < 250 && y > 150 && y < 500){snapper = 1; column1 = column1 + 1; $(movingDisc).addClass("colPos1");
          columnX = 460 - (column1 * 30);}
          else if (x > 350 && x < 550 && y > 150 && y < 500){snapper = 2; column2 = column2 + 1; $(movingDisc).addClass("colPos2");
          columnX = 460 - (column2 * 30);}
          else if (x > 650 && x < 850 && y > 150 && y < 500){snapper = 3; column3 = column3 + 1; $(movingDisc).addClass("colPos3");
          columnX = 460 - (column3 * 30);}
          else {}

          if (snapper === 1){
            $('.col1').append($('.snapclass'));
            $('.snapclass').css("top", columnX)
            $('.snapclass').css("left", "0px");

          }
          else if (snapper === 2){
            $('.col2').append($('.snapclass'));
            $('.snapclass').css("top", columnX);
            $('.snapclass').css("left", "0px");
          }

          else if (snapper === 3){
            $('.col3').append($('.snapclass'));
            $('.snapclass').css("top", columnX);
            $('.snapclass').css("left", "0px");
          }
          else {
            $('.snapclass').css("top", y - $('.snapclass').outerHeight()/2);
            $('.snapclass').css("left", x - $('.snapclass').outerWidth()/2);
          }
          $('.snapclass').addClass('drag');  //
          winCheck();
        } // end of snapDisc Function


        // The DRAGGER, Function to grab and move .drag discs
        $(document).ready(function() {
          var $dragging = null;
          $('body').on("mousedown", ".drag", function(e) {
            $(this).addClass('draggable').appendTo('body');
            var disc_width = $('.draggable').outerWidth(),
            disc_height = $('.draggable').outerHeight();
            $('body').on("mousemove", function(e) {
              if ($dragging) {
                $dragging.offset({
                  top: e.pageY - disc_height / 2,
                  left: e.pageX - disc_width / 2
                });
              }
            });
            $dragging = $(e.target);
          }).on("mouseup", ".draggable", function(e) {
            $dragging = null;

            if ($(this).hasClass("colPos1")){ column1 = column1 - 1;$(this).removeClass('colPos1');}
            if ($(this).hasClass("colPos2")){ column2 = column2 - 1;$(this).removeClass('colPos2');}
            if ($(this).hasClass("colPos3")){ column3 = column3 - 1;$(this).removeClass('colPos3');}

            $(this).addClass('snapclass');
            $(this).removeClass('draggable');
            snapDisc(this,e.pageX, e.pageY);  //call the.........SNAPPER.
            findDraggable();
            moveCheck();
            $('.snapclass').removeClass('snapclass');
            winCheck();
          });
        });
        // END of the DRAGGER - See Readme for Code Credits

        // NOTE: END Complex Functions!
      }
