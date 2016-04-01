/**
 * Created by ashish on 29/12/15.
 */

requirejs.config({
  baseUrl: 'js/',
  paths: {
    LAY: '../bower_components/LAY/LAY',
    api: '../api'
  },
  shim: {
    LAY: {
      exports: 'LAY'
    }
  }
});

require([
  'LAY',
  'app'
],function   (LAY, app) {
  LAY.run(app);
});
