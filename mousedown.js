function start() {
   var click_me_1 = document.getElementById('prevent-default-only');
   var click_me_2 = document.getElementById('prevent-default-and-focus');
   document.addEventListener('mousedown', function(event) {
      if (event.target.id === 'prevent-default-only' ||
          event.target.id === 'prevent-default-and-focus') {
         event.preventDefault();
      }
      if (event.target.id === 'prevent-default-and-focus') {
         var the_link = document.getElementById('link-focus');
         the_link.focus();
      }
   }, true);

   window.addEventListener('focus', function(event) {
      console.log('Focus is now on:', event.target);
   }, true);
}
