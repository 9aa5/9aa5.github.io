var property_list = ['deltaMode', 'deltaX', 'deltaY', 'wheelDeltaX',
   'wheelDeltaY', 'cancelable', 'bubbles', 'screenX', 'screenY',
   'clientX', 'clientY', 'offsetX', 'offsetY', 'pageX', 'pageY',
   'offsetY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'detail',
   'wheelDelta', 'wheelDeltaX', 'wheelDeltaY'];
var cur = 0;

function showKeyEvent(event) {
   var outputText = event.type + ':',
      propName,
      colors = ['red', 'blue', 'yellow'];

   cur += 1;
   for (propName in event) {
     if (!event.hasOwnProperty(propName) && property_list.indexOf(propName) !== -1) {
       outputText += propName + ':' + event[propName] + ', ';
     }
   }

   outputDiv = document.createElement('DIV');
   outputDiv.textContent = outputText;
   document.getElementById('output').appendChild(outputDiv);
   if (event.target.id === 'd1' || event.target.id === 'd3') {
      event.target.style.backgroundColor = colors[cur % 3];
      event.preventDefault();
      console.log('event.defaultPrevented:', event.defaultPrevented);
   } else if (event.target.id === 'd2' || event.target.id === 'd4') {
      event.target.style.backgroundColor = colors[cur % 3];
      setTimeout(function() {
         console.log('event.defaultPrevented:', event.defaultPrevented);
      }, 200);
      return false;
   }
}


function start() {
   // inputMonitor = new InputMonitor();
   // inputMonitor.start();
/*
   window.addEventListener('wheel', function(event) {
      showKeyEvent(event);
   }, true);
   window.addEventListener('mousewheel', function(event) {
      showKeyEvent(event);
   }, true);
*/
   var d1 = document.getElementById('d1');
   var d2 = document.getElementById('d2');
   var d3 = document.getElementById('d3');
   var d4 = document.getElementById('d4');
   d1.addEventListener('mousewheel', function(event) {
      showKeyEvent(event);
   }, true);
   d2.addEventListener('mousewheel', function(event) {
      showKeyEvent(event);
   }, true);
   d3.onwheel = showKeyEvent;
   d4.onwheel = showKeyEvent;
   document.addEventListener('scroll', function(event) {
      showKeyEvent(event);
   }, true);
/*
   document.addEventListener('wheel', function(event) {
      return showKeyEvent(event);
   }, true);
   document.addEventListener('mousewheel', function(event) {
      return showKeyEvent(event);
   }, true);
   document.addEventListener('DOMMouseScroll', function(event) {
      return showKeyEvent(event);
   }, true);
   document.onwheel = showKeyEvent;
*/
}

function inject(nodeId) {
   var node =  document.getElementById(nodeId);
   var evtInfo = {
      deltaX:0,
      deltaY:100,
      deltaMode:0,
      bubbles:true,
      cancelable:true
   };
   var evt = new WheelEvent('wheel', evtInfo);
   var result = !node.dispatchEvent(evt);
   console.log('default prevented as in call result:', result,
               'default_prevented as in event obj:', evt.defaultPrevented); 
}
