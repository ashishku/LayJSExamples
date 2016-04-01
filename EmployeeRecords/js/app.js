/**
 * Created by ashish on 29/12/15.
 */
define([
  'LAY',
  'pages/list',
  'pages/details'
], function(LAY, list, details) {
  return {
    data: {
      containerWidth: LAY.take('/', 'width').multiply(.85)
    },
    TopNav: {
      props: {
        width: LAY.take('/', 'width'),
        height: 45,
      },
      Brand: {
        props: {
          centerX: 0,
          shiftY: 5,
          text: 'Lay Grid Example',
          textWeight: 'bold',
          textSize: '1.3em',
          textShadows: [{x: 3, y: 3, blur: 4, color: LAY.color('SlateGray')}]
        }
      }
    },
    Container: {
      $load: function() {
        var self = this;
        var hash = location.hash;
        if(!hash) {
          hash = location.hash = 'list';
        }
        var match = /^#?details\/([0-9]+)/.exec(hash)
        if(match) {
          self.data('isListPage', false);
          self.data('selectedId', match[1]);
        }
      },
      data: {
        isListPage: true,
        selectedId: -1
      },
      ListPage: {
        exist: LAY.take('../', 'data.isListPage'),
        $inherit: list
      },
      DetailsPage: {
        exist: LAY.take('../', 'data.isListPage').not(),
        $inherit: details
      }
    }
  };
});
