function EchoPrevention() {
   var allowed_list = ['focus'],
      prevention_node_list = {},
      self = this;
   // Examples:
   // {
   //    uid1: [['focus', timer_id], ['other_event', timer_id]],
   //    uid2: [['focus', timer_id]]
   // }

   function getEventList(node) {
      var uid = getNodeID(node);
      if (!uid) {
         console.log('JF: Node has no ID!!'); //maybe document.body?
         return null;
      }
      if (!prevention_node_list[uid]) {
         prevention_node_list[uid] = [];
      }
      return prevention_node_list[uid];
   }

   function indexOf(evt_list, evt_name) {
      if (!evt_list) {
         return -1;
      }
      var found = evt_list.findIndex(function (evt_info) {
         if (evt_info[0] === evt_name) {
            return true;
         }
         return false;
      });
      return found;
   }

   function expirePrevention(node, evt_name) {
      var evt_list = getEventList(node),
         evt_index = indexOf(evt_list, evt_name);
      if (evt_index === -1) {
         return;
      }
      evt_info = evt_list[evt_index];
      clearTimeout(evt_info[1]);
      evt_info[1] = null;
      evt_list.splice(evt_index, 1);
   }

   self.start_prevention = function (node, evt_name) {
      var evt_index, evt_list;
      // assert(allowed_list.includes(evt_name));
      evt_list = getEventList(node);
      evt_index = indexOf(evt_list, evt_name);
      if (evt_index !== -1) {
         evt_info = evt_list[evt_index];
         clearTimeout(evt_info[1]);
         evt_info[1] = null;
      } else {
         evt_info = [evt_name, null];
         evt_list.push(evt_info);
      }
      evt_info[1] = setTimeout(function () {
         expirePrevention(node, evt_name);
      }, 100);
   };

   self.cancel_prevention = function (node, evt_name) {
      // Use timeout so that operation that triggers event asynchronously can
      // also use the pattern of start_prevention, operation, cancel_prevention.
      // assert(allowed_list.includes(evt_name));
      setTimeout(function () {
         expirePrevention(node, evt_name);
      }, 0);
   };

   self.has_prevention = function (node, evt_name) {
      // assert(allowed_list.includes(evt_name));
      evt_list = getEventList(node);
      evt_index = indexOf(evt_list, evt_name);
      if (evt_index == -1) {
         return false;
      }
      return true;
   };
}

function getNodeID(node) {
   return node.uid;
}

function assert(value) {
   if (!value) {
      console.log('assert failed.');
   }
}
function start() {
var node1 = { uid: 12 };
var echo_prevention = new EchoPrevention();
echo_prevention.start_prevention(node1, 'focus');
console.log('Result:' + echo_prevention.has_prevention(node1, 'focus'));
echo_prevention.cancel_prevention(node1, 'focus');
setTimeout(function () {
   console.log('Result:' + echo_prevention.has_prevention(node1, 'focus'));
}, 100);
}
