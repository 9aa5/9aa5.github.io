var inputMonitor;
function InputMonitor() {
   var i,
       iframeEle,
       els,
       scrollEvents = ['scroll'],
       installedHandler = {};

   function showScrollEvent(event) {
      var moreInfo;
      if (event.type === 'scroll') {
         moreInfo = event.target.nodeName;
         var el =  document.body;
         console.log('JJF: Scroll event target:', event.target.nodeName +
                     'x=' + el.scrollLeft + '; y='
                     + el.scrollTop);
      }
      /*
      document.getElementById("output").innerHTML +=
         'scroll:' + event.currentTarget.nodeName;
      document.getElementById("output").innerHTML += '<br>';
      */
      // scroll event preventDefault has no effect, scroll happens
      // anyway.
      //event.preventDefault();
   }

   function addEventListenersForTarget(target) {
      var handler = function(event) {
         showScrollEvent(event);
      };
      scrollEvents.map(function(scrollEvent) {
         // If the capture if false, then child element's scroll
         // won't be captured.
         target.addEventListener(scrollEvent, handler, true);
         installedHandler[scrollEvent] = handler;
      });
   }


   this.start = function() {
      addEventListenersForTarget(window);
      // addEventListenersForTarget(document.getElementById('scroll-div'), '[div]');
   };
}

function setscroll() {
   var el = document.body;
   console.log('JF: set to 200');
   el.scrollTop = 200;
   setTimeout(function() {
   console.log('JF: set to 400');
      el.scrollTop = 400;
      setTimeout(function() {
         console.log('JF: set to 600');
         el.scrollTop = 600;
         setTimeout(function() {
            console.log('JF: set to 2000');
            el.scrollTop = 2000;
         }, 0);
      }, 0);
   }, 0);
}
function start() {
   inputMonitor = new InputMonitor();
   inputMonitor.start();
}
