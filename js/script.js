/*
Author: Kerry O'Neill
Email: kerry_oneill@student.uml.edu
Class: 91.61 GUI Programming I
*/

//this is the beginning of my jquery validation plugin
// i referenced this video quite a bit, and it helped me understand the basic structure of the validation plugin
//video: https://www.youtube.com/watch?v=xNSQ3i-BWMo
//I also watched the other 4 videos, but im just linking one
$(document).ready(function () {//start of function
  $("form").submit(function(v) {
    v.preventDefault();//validation first
    input_and_table();//call table and input function
  }).validate({
    rules: {
      "min_col": {
        required: true,//it must be a number
        number: true,//it must be a number
        range: [-50, 50]//range can only be from -50 to 50
      },
      "max_col": {
        required: true,//it must be a number
        number: true,//it must be a number
        range: [-50, 50]//range can only be from -50 to 50
      },
      "min_row": {
        required: true,//it must be a number
        number: true,//it must be a number
        range: [-50, 50]//range can only be from -50 to 50
      },
      "max_row": {
        required: true,//it must be a number
        number: true,//it must be a number
        range: [-50, 50]//range can only be from -50 to 50
      }
    },
    messages: {
      min_col: {
        required: "Error. Please enter a minimum column value. Must be an integer.",//error message for required input
        number: "Error. Please enter in a number",//error message for number, dont even need it but failsafe
        range: "Error. Please enter an integer between -50 to 50."//error message for range
      },
      max_col: {
        required: "Error. Please enter a maximum column value. Must be an integer.",//error message for required input
        number: "Error. Please enter in a number",//error message for number, dont even need it but failsafe
        range: "Error. Please enter an integer between -50 to 50.",//error message for range

      },
      min_row: {
        required: "Error. Please enter a minimum row value. Must be an integer.",//error message for required input
        number: "Error. Please enter in a number",//error message for number, dont even need it but failsafe
        range: "Error. Please enter an integer between -50 to 50."//error message for range
      },
      max_row: {
        required: "Error. Please enter a maximum row value. Must be an integer.",//error message for required input
        number: "Error. Please enter in a number",//error message for number, dont even need it but failsafe
        range: "Error. Please enter an integer between -50 to 50."//error message for range
      },
    },
  });
});

//function in which has checks AND the table. i originally had the make_table function separate but i had too many issues.
function input_and_table() {
  // defines variables for input values, i used https://www.w3schools.com/jsref/jsref_parseint.asp to help me with input of variables
  var min_col = parseInt(document.getElementById("min_col").value);
  var max_col = parseInt(document.getElementById("max_col").value);
  var min_row = parseInt(document.getElementById("min_row").value);
  var max_row = parseInt(document.getElementById("max_row").value);

  //defines warnings and warning warning_message
  var warning=document.getElementById("warning");
  var warning_message = "";

  //if user puts in larger value to max col, swaps them. i could not figure out a good way to do it in validation so i just did it here.
  if(min_col > max_col) {
    let temp = min_col;
    min_col = max_col;
    max_col = temp;
  }

  //if user puts in larger value to max row, swaps them. i could not figure out a good way to do it in validation so i just did it here.
  if(min_row > max_row) {
    let temp = min_row;
    min_row = max_row;
    max_row = temp;
  }

  //i had an issue where i would click submit a few times and the table would generate values in which were out of the range
  if(min_col < -50 || max_col > 50 || min_row < -50|| max_row > 50){
    return 0;
  }
  var temp1, temp2;
  var mult_table = "";

  // first for loop which goes through the rows
  for (temp1 = min_row - 1; temp1 <= max_row; temp1++) {
    mult_table = mult_table + "<tr>"; //for each temp1++, add a space

    //this is to make sure there is a blank space and so the row/col axises show up
    if (temp1 == min_row - 1) {
      mult_table = mult_table + "<td>☺️</td>";// <td></td> creates empty space

      //second for loop which goes through columns if the condiiton above is true
      for (temp2 = min_col; temp2 <= max_col; temp2++) {
        mult_table = mult_table + "<td>" + temp2 + "</td>";//adds a space, temp2 value, then goes onto next
      }
    }

    //  if you dont need to check the min_row-1
    else {
      mult_table = mult_table + "<td>" + temp1 + "</td>";
      //secpmd for loop for min col
      for (temp2 = min_col; temp2 <= max_col; temp2++) {
        mult_table = mult_table + "<td>" + temp1 * temp2 + "</td>";//this does the multiplying of the table. this is after the row/col axis has been created
      }
    }

    mult_table = mult_table + "</tr>";//ends the table
  }

  // sends the table to HTML file to be outputted
  document.getElementById("mult_table").innerHTML = mult_table;
}
