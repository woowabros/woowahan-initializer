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

      if ('initModel' in view[VIEW_PROPERTY_NAME]) {
        Object.keys(view[VIEW_PROPERTY_NAME].initModel).forEach(function (attr, idx, model) {
          view.setModel(_defineProperty({}, attr, model[attr]));
        });
      }

      if (store && 'loadStore' in view[VIEW_PROPERTY_NAME]) {
        view[VIEW_PROPERTY_NAME].loadStore.forEach(function (attr) {
          if (attr in store) {
            view.setModel(_defineProperty({}, attr, store[attr]));
          }
        });
      }

      if ('after' in view[VIEW_PROPERTY_NAME]) {
        if (typeof view[VIEW_PROPERTY_NAME].after === 'function') {
          view[VIEW_PROPERTY_NAME].after.call(view);
        }
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

