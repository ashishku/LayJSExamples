/**
 * Created by ashish on 29/12/15.
 */
define([
  'LAY'
], function(LAY) {
  return {
    data: {
      filteredCols: LAY.take('', 'data.cols').filterEq('visible', true),
      filteredColsCount: LAY.take('', 'data.filteredCols').length(),
      colWidth: LAY.take('../', 'width').divide(LAY.take('', 'data.filteredColsCount'))
    },
    Header: {
      HeadRow: {
        many: {
          rows: LAY.take('../../', 'data.filteredCols'),
          formation: 'horizontal',
          sort: [{ key: 'order', ascending: true }]
        },
        props: {
          width: LAY.take(function() {
            return this.level('').many().parent().parent().attr('data.colWidth');
          }).fn(),
          text: LAY.take('', 'row.label'),
          textWeight: 'bold'
        }
      }
    },
    Body: {
      props: {
        top: LAY.take('../Header', 'bottom')
      },
      Row: {
        many: {
          rows: LAY.take('../../', 'data.rows'),
          formation: 'vertical',
          sort: [{
            key: LAY.take('../../', 'data.orderBy'),
            ascending: LAY.take('../../', 'data.ascending')
          }]
        },
        Cell: {
          many: {
            rows: LAY.take('../../../', 'data.filteredCols'),
            formation: 'horizontal',
            sort: [{ key: 'order', ascending: true }]
          },
          props: {
            width: LAY.take('../../../', 'data.colWidth'),
            text: LAY.take(function (col) {
              var row = this.level('../');
              return row.attr('row.' + col);
            }).fn(LAY.take('', 'row.key'))
          }
        },
        when: {
          click: [LAY.take('../../', 'data.rowClicked')],
        }
      }
    }
  };
});
