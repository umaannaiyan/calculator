
  // Shortcut to get elements
  var el = function(element) {
    if (element.charAt(0) === "#") { 
      return document.querySelector(element); 
    }

    return document.querySelectorAll(element); 
  };

  // Variables
  var viewer = el("#viewer"),       // Calculator screen where result is displayed
    equals = el("#equals"),         // Equal button
    nums = el(".num"),              // List of numbers
    ops = el(".key--operator"),               // List of operators
    theNum = "",                    // Current number
    oldNum = "",                    // First number
    resultNum,                      // Result
    operator;                       

//   When: Number is clicked. Get the current number selected
  var setNum = function() {
    if (resultNum) { // If a result was displayed, reset number
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else { // Otherwise, add digit to previous number (this is a string!)
      theNum += this.getAttribute("data-num");
    }
    viewer.innerHTML = theNum; // Display current number
  };

  // When: Operator is clicked. Pass number to oldNum and save operator
  var moveNum = function() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");
    equals.setAttribute("data-result", ""); // Reset result in attr
  };

  //  Calculating result when pressed equal
  var displayNum = function() {

    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // mathematical operations
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;

      case "times":
        resultNum = oldNum * theNum;
        break;

      case "divided by":
        resultNum = oldNum / theNum;
        break;

        // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = theNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { 
        resultNum = "Err";
      } else { // If result is infinity, set off by dividing by zero
        resultNum = "infinity";
        }
    }

    // final result
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Now reset oldNum 
    oldNum = 0;
    theNum = resultNum;

  };

  //  Clearing everything
  var clearAll = function() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  // Adding click event to numbers
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // Adding click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Adding click event to equal sign
  equals.onclick = displayNum;

  // Adding click event to clear button
  el("#clear").onclick = clearAll;


  
