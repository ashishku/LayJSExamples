/**
 * Created by ashish on 30/12/15.
 */
define([
  'LAY',
  '../components/grid'
], function(LAY, grid) {
  return {
    props: {
      top: LAY.take('../../TopNav', 'bottom'),
      left: LAY.take('/', 'width').minus(LAY.take('/', 'data.containerWidth')).divide(2),
      width: LAY.take('/', 'data.containerWidth'),
    },
    Grid: {
      $load: function() {
        var self = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            self.data('rows', JSON.parse(xhttp.responseText));
          }
        };
        xhttp.open('GET', 'api/emps/all.json', true);
        xhttp.send();
      },
      data: {
        cols: [
          {key: 'id', label: 'Emp. Id', visible: true, order: 4},
          {key: 'name', label: 'Name', visible: true, order: 2},
          {key: 'email', label: 'Email ID', visible: true, order: 1},
          {key: 'ext', label: 'Extension', visible: true, order: 3}
        ],
        orderBy: 'ext',
        ascending: true,
        rows: [],
        rowClicked: function() {
          var id = this.level('').attr('row.id');

          location.hash = 'details/' + id;

          var dataLevel =  this.level('../../../../');
          dataLevel.data('selectedId', id);
          dataLevel.data('isListPage', false);
        }
      },
      $inherit: grid
    }

  };
});
