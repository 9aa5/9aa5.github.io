function setSelection(div_id) {
   setTimeout(function () {
      setSelectionNow(div_id);
   }, 3000);
}

function setSelectionNow(div_id) {
   var sel = window.getSelection(),
      div_elem = document.getElementById(div_id),
      text_node = div_elem.childNodes[0],
      range = document.createRange();

   sel.removeAllRanges();
   range.setStart(text_node, 2);
   range.setEnd(text_node, 10);
   sel.addRange(range);
}

function setFocus(id) {
   setTimeout(function () {
      setFocusNow(id);
   }, 3000);
}

function setFocusNow(id) {
   var elem = document.getElementById(id);
   elem.focus();
}

function onload() {
   setInterval(function () {
      console.log('Active element is:', document.activeElement);
   }, 5000);
   document.addEventListener('focus', function(evt) {
      console.log('On Focus event on', evt.target);
   }, true);
   document.addEventListener('blur', function(evt) {
      console.log('On blur event on', evt.target);
   }, true);
}
