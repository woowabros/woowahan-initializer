'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Initializer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VIEW_PROPERTY_NAME = 'initConfig';

function viewInitializer() {
  this.before = function (view) {
    if (VIEW_PROPERTY_NAME in view) {
      var store = view.getStates();

      if (store && 'loadStore' in view[VIEW_PROPERTY_NAME]) {
        view[VIEW_PROPERTY_NAME].loadStore.forEach(function (attr) {
          if (attr in store) {
            view.setModel(_defineProperty({}, attr, store[attr]));
          }
        });
      }
    }
  };
}

function Initializer(options) {
  options = Object.assign({ type: 'view' }, options);

  this.mwtype = options.type;

  switch (this.mwtype) {
    case 'view':
      viewInitializer.call(this);
      break;
  }
}

