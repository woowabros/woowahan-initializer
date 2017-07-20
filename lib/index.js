const VIEW_PROPERTY_NAME = 'initConfig';

function viewInitializer() {
  this.before = function (view) {
    if (VIEW_PROPERTY_NAME in view) {
      const store = view.getStates();

      if (store && 'loadStore' in view[VIEW_PROPERTY_NAME]) {
        view[VIEW_PROPERTY_NAME].loadStore.forEach(attr => {
          if (attr in store) {
            view.setModel({ [attr]: store[attr] });
          }
        });
      }
    }
  }
}

export default function Initializer(options) {
  options = Object.assign({ type: 'view' }, options);

  this.mwtype = options.type;

  switch(this.mwtype) {
    case 'view': viewInitializer.call(this);
      break;
  }
}
