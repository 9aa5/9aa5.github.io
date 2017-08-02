var inputMonitor;
var longText = 'the quick brown fox jumps over the lazy dog.';
var curIndex = 0;
function showCurrentValue(node) {
   var cur_text = document.getElementById('cur_text'),
      cur_value, sel;
   if (node.value) {
      cur_value = node.value;

   } else {
      cur_value = 'NO VALUE';
   }
   sel = '(' + node.selectionStart + ', ' + node.selectionEnd + ')';

   cur_text.innerHTML = '<div>' + cur_value + '</div><div>' + sel + '</div>';
}

function InputMonitor() {
   var i,
       iframeEle,
       els,
       keyevents = ['keydown', 'keyup', 'keypress', 'input', 'compositionstart',
                    'compositionend', 'compositionupdate', 'paste', 'change', 'select',
                    'mousedown', 'mouseup', 'mouseenter', 'click', 'selectionchange',
                    'input', 'textInput', 'textinput', 'paste', 'contextmenu'],
       installedHandler = {},
       currentlyInCapturePhase = false,
       wasUsingCapturePhase = false,
       outputText, outputDiv, outputPane;

   function showKeyEvent(eventFrame, event) {
      var moreInfo = '', inputTestNode;
      if (event.type === 'keypress' || event.type === 'keydown' ||
          event.type === 'keyup') {
         showCurrentValue(event.target);
         console.log('event=' + event.type +
                     ' key=' + event.key +
                     ' keyCode=' + event.keyCode +
                     ' charCode=' + event.charCode +
                     ' alt=' + event.altKey +
                     ' ctrl=' + event.ctrlKey +
                     ' meta=' + event.metaKey +
                     ' shift=' + event.shiftKey);
      }
      if (event.type === 'keydown' || event.type === 'keyup') {
         showCurrentValue(event.target);
         moreInfo = event.keyCode;
         inputTestNode = document.getElementById('a3');
         if (event.target === inputTestNode) {
            console.log('Keydown inside the special input field, scrollLeft=', inputTestNode.scrollLeft);
            curIndex += 1;
            inputTestNode.value = longText.substring(0, curIndex);
            setCaretPos(inputTestNode, curIndex);
            // inputTestNode.scrollLeft = curIndex * 10;
            event.preventDefault();
         }
      } else if (event.type === 'compositionstart'
                 || event.type === 'compositionend'
                 || event.type === 'compositionupdate') {
         moreInfo = "'" + event.data + "'";
      } else if (event.type === 'input') {
         moreInfo = "N/A";
         console.log('event=input');
      } else if (event.type === 'textInput') {
         console.log('event=textInput, method=' + event.inputMethod);
         moreInfo = "'" + event.data + "', input method:" + event.inputMethod;
      } else if (event.type === 'textinput') {
         console.log('event=textinput, method=' + event.inputMethod);
         if (event.inputMethod === event.DOM_INPUT_METHOD_IME || event.inputMethod === event.DOM_INPUT_METHOD_HANDWRITING) {
            // Inserting text into our display div will also cause textinput in IE.
            moreInfo = "'" + event.data + "', input method:" + event.inputMethod;
         } else {
            return;
         }
      } else if (event.type === 'keypress') {
         moreInfo = event.charCode;
      } else if (event.type === 'mousedown' || event.type === 'mouseup') {
         moreInfo = 'b' + event.button + ', ';
         moreInfo += event.target.nodeName;
      } else if (event.type === 'click') {
         moreInfo = event.target.nodeName;
      } else if (event.type === 'paste') {
         console.log('event=paste');
         moreInfo += ': name:'+ event.target.nodeName;
         moreInfo +=  ':type:' + event.clipboardData.types;
         moreInfo += ':content:' + event.clipboardData.getData('text/plain');

         // event.preventDefault();
         
      } else if (event.type === 'clipboard') {
         moreInfo += ': name:'+ event.target.nodeName;
         moreInfo +=  ':type:' + event.clipboardData.types;
         moreInfo += ':content:' + event.clipboardData.getData('text/plain');

         // event.preventDefault();
         
      }
      if (document.getElementById('showevents').checked) {
         if (event.currentTarget === event.target) {
            outputText = '*';
         } else {
            outputText = '';
         }
         outputText += 
            eventFrame + event.currentTarget.nodeName +
            ":" + event.type + ':';

         outputText +=  moreInfo;

         outputDiv = document.createElement('DIV');
         outputDiv.textContent = outputText;
         outputPane = document.getElementById('output');
         if (outputPane.childNodes.length > 25) {
            outputPane.removeChild(outputPane.childNodes[0]);
         }
         outputPane.appendChild(outputDiv);
      }

      if (document.getElementById('stopprop').checked) {
         event.stopPropagation();
      }
      if (document.getElementById('preventdefault').checked) {
         event.preventDefault();
      }
      if (document.getElementById('preventdefault_keypress').checked &&
          event.type === 'keypress') {
         event.preventDefault();
      }
   }

   function addEventListenersForTarget(target, msgPrefix) {
      var handler = function(event) {
         showKeyEvent(msgPrefix, event);
      };
      keyevents.map(function(keyevent) {
         target.addEventListener(keyevent, handler, currentlyInCapturePhase);
         installedHandler[keyevent] = handler;
      });
      var inputElements = document.getElementsByTagName("INPUT");
      for (i = 0; i < inputElements.length; i++) {
         inputElements[i].addEventListener('change', handler, currentlyInCapturePhase);
      }
   }

   function removeEventListenersForTarget(target) {
      keyevents.map(function(keyevent) {
         target.removeEventListener(keyevent, installedHandler[keyevent],
                                    wasUsingCapturePhase);
      });
   }

   this.start = function() {
      addEventListenersForTarget(document, '[main]');
   };
   this.useCapturePhase = function(useCapture) {
      currentlyInCapturePhase = useCapture;
      removeEventListenersForTarget(document);
      addEventListenersForTarget(document, '[main]');
      wasUsingCapturePhase = useCapture;
   };
      
}

function gettext() {
   var text1 = document.getElementById('a1').value;
   var text2 = document.getElementById('a2').value;
   console.log('Text1 is ' + text1);
   console.log('Text2 is ' + text2);
   var div1 = document.getElementById('a1_result');
   div1.innerHTML = text1;
   var div2 = document.getElementById('a2_result');
   div2.innerHTML = text2;
}

function clearlog() {
   document.getElementById("output").innerHTML = '';
}

function setTextString() {
      var node = document.getElementById('a3');
      setTimeout(function() {
         node.value = "This is long Random Data";
      }, 3000);
}

function placeCaretPos(node, pos) {
   var inputTestNode = document.getElementById('a1');
   setCaretPos(inputTestNode, 4);
}

function setCaretPos(node, pos) {
   var usingMethod = 0,
       range, temp;
   switch (usingMethod) {
   case 0:
      console.log('using set selection range.', pos);
      node.focus();
      setTimeout(function() {
         node.selectionStart = pos;
         node.selectionEnd = pos;
      }, 2000);
      break;

   case 1:
      console.log('using window selection range.');
      range = window.getSelection().getRangeAt(0);
      range.setStart(node, 0);
      range.setEnd(node, 0);
      node.focus();
      //range.select();
      break;

   case 2:
      console.log('using text range.');
      node.focus();
      range = node.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
      node.focus();
      break;
   case 3:
       var coordinates = getCaretCoordinates(node, node.selectionEnd);
       var width = node.clientWidth;
       if (width > coordinates.left) {
          return;
       } else {
          node.scrollLeft = coordinates.left - width + 5;
       }

   default:
      break;
   } 
}

function changeEventStage() {
   var useCapture = false;
   if (document.getElementById('usecapture').checked) {
      useCapture = true;
   }
   inputMonitor.useCapturePhase(useCapture);
}

function clearSelection()
{
   var sel = window.getSelection();
   sel.removeAllRanges();
}
function intercept() {
   (function(removeAllRanges) {
      Selection.prototype.removeAllRanges = function() {
         console.log('RemoveAllRanges called.');
         return removeAllRanges.apply(this, arguments);
      };
   })(Selection.prototype.removeAllRanges);
}

function toStringOverride() {
   (function(toString) {
      Node.prototype.toString = function() {
         var ret;
         try {
            ret = toString.apply(this, arguments);
         } catch (e) {
            ret = this.nodeName;
         }
         return ret;
      };
   })(Node.prototype.toString);
}

function injectText() {
   var a2 = document.getElementById('a2');
   a2.focus();
   document.execCommand('insertText', false, '*** TextInsertion ***');
}


function start() {
   // intercept();
/*
   var parent_div = document.getElementById('parent-div');
   var child_div = document.getElementById('child-div');
   parent_div.addEventListener('mousedown', function(event) {
      console.log('Parent get mousedown.');
   }, true);
   child_div.addEventListener('mousedown', function(event) {
      console.log('child get mousedown.');
   }, true);
*/

   inputMonitor = new InputMonitor();
   inputMonitor.start();
   window.addEventListener('focus', function(event) {
      console.log('Focus is now on:', event.target);
   }, true);
   document.addEventListener('change', function(event) {
      console.log('Text changed:', event.target);
   }, true);
   document.addEventListener('mouseenter', function(event) {
      console.log('mouseenter msg', event.target);
   }, true);
   document.addEventListener('mouseover', function(event) {
      console.log('mouseover msg', event.target);
   }, true);
   document.getElementById('ce1').onpaste = function(event) {
      // console.log('event:', event);
      console.log('clipboard', window.clipboardData);
   }
   document.body.onpaste = function(event) {
      // console.log('event:', event);
      console.log('clipboard', window.clipboardData);
   }
   document.body.oncopy = function(event) {
      // console.log('event:', event);
      console.log('clipboard', window.clipboardData);
   }
}
