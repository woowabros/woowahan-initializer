# woowahan-initializer

Component initializer middleware for woowahanjs

#### requirements

* woowahanjs v0.3.0 higher

## Install

```
$ npm install --save-dev woowahan-initializer
```

## Setup

```javascript
import Woowahan from 'woowahan';
import Initializer from 'woowahan-initializer';

const app = new Woowahan();

app.set(Initializer);

app.use(Woowahan.Store.create({
  config: {
    env: 'development',
    cache: true
  }
}));
```

## Use


```javascript
import Woowahan from 'woowahan';

export default Woowahan.View.create('myView', {

  initConfig: {
    loadStore: ['config'],
    after() {
      console.log(this.getModel()); // { config }
    }
  },

  viewDidMount() {
    let { config } = this.getModel();
    
    console.log(config);
  }
});

```
