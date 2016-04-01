/**
 * Created by ashish on 30/12/15.
 */
define([
  'LAY'
], function(LAY) {
  return {
    _Label: {
      props: {
        centerY: 0,
        width: 200,
        textWeight: 'bold',
        textAlign: 'right'
      }
    },
    _Value: {
      props: {
        left: LAY.take('../Label', 'right').add(25),
        width: LAY.take('../../', 'width').minus(LAY.take('../Label', 'width'))
      }
    },
    _Input: {
      data: {
        focus: false
      },
      props: {
        textPaddingLeft: 12,
        textPaddingRight: 12,
        textPaddingTop: 6,
        textPaddingBottom: 6,
        cornerRadius: 4,
        backgroundColor: LAY.color('white'),
        border: {
          style: 'solid',
          width: 1,
          color: LAY.rgb(204, 204, 204)
        }
      },
      states: {
        focus: {
          onlyif: LAY.take('', 'data.focus'),
          props: {
            border: {
              color: LAY.rgb(102, 175, 233)
            }
          }
        }
      },
      when: {
        focus: function() {
          this.data('focus', true);
        },
        blur: function() {
          this.data('focus', false);
        }
      }
    },
    _Button: {
      $inherit: '../_Input',
      data: {
        hover: false
      },
      states: {
        hover: {
          onlyif: LAY.take('', 'data.hover'),
          props: {
            backgroundColor: LAY.rgb(230, 230, 230)
          }
        }
      },
      when: {
        mouseenter: function() {
          this.data('hover', true);
        },
        mouseleave: function() {
          this.data('hover', false);
        }
      }
    },
    _PrimaryButton: {
      $inherit: '../_Button',
      props: {
        textColor: LAY.color('white'),
        backgroundColor: LAY.rgb(51, 122, 183),
        border: {
          color: LAY.rgb(76, 109, 164)
        }
      },
      states: {
        hover: {
          onlyif: LAY.take('', 'data.hover'),
          props: {
            backgroundColor: LAY.rgb(40, 96, 144)
          }
        }
      },
    },

    $load: function() {
      var self = this;
      var id = self.level('../').attr('data.selectedId');
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          self.data('emp', JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open('GET', 'api/emps/'+ id + '.json', true);
      xhttp.send();
    },

    data: {
      emp: {}
    },

    props: {
      top: LAY.take('../../TopNav', 'bottom').add(25),
      left: LAY.take('/', 'width').minus(LAY.take('/', 'data.containerWidth')).divide(2),
      width: LAY.take('/', 'data.containerWidth'),
    },

    Id: {
      Label: {
        $inherit: '../../_Label',
        props: {
          text: 'ID:',
        }
      },
      Value: {
        $inherit: ['../../_Value'],
        props: {
          text: LAY.take(function(emp) {
            return (emp && emp.id) ? emp.id : '';
          }).fn(LAY.take('../../', 'data.emp'))
        }
      }
    },

    Name: {
      props: {
        top: LAY.take('../Id', 'bottom').add(15)
      },
      Label: {
        $inherit: '../../_Label',
        props: {
          text: 'Name:',
        }
      },
      Value: {
        $inherit: ['../../_Input', '../../_Value'],
        $type: 'input:line',
        props: {
          input: LAY.take(function(emp) {
            return (emp && emp.name) ? emp.name : '';
          }).fn(LAY.take('../../', 'data.emp'))
        }
      }
    },

    Email: {
      props: {
        top: LAY.take('../Name', 'bottom').add(15)
      },
      Label: {
        $inherit: '../../_Label',
        props: {
          text: 'Email Id:'
        }
      },
      Value: {
        $inherit: ['../../_Input', '../../_Value'],
        $type: 'input:line',
        props: {
          input: LAY.take(function(emp) {
            return (emp && emp.email) ? emp.email : '';
          }).fn(LAY.take('../../', 'data.emp')),
        }
      }
    },
    Ext: {
      props: {
        top: LAY.take('../Email', 'bottom').add(15)
      },
      Label: {
        $inherit: '../../_Label',
        props: {
          text: 'Extension:',
        }
      },
      Value: {
        $inherit: ['../../_Input', '../../_Value'],
        $type: 'input:line',
        props: {
          input: LAY.take(function(emp) {
            return (emp && emp.ext) ? emp.ext : '';
          }).fn(LAY.take('../../', 'data.emp')),
        }
      }
    },
    Action: {
      props: {
        left: LAY.take('../Ext/Value', 'left'),
        top: LAY.take('../Ext', 'bottom').add(15)
      },
      Cancel: {
        $inherit: ['../../_Button'],
        props: {
          text: 'Cancel'
        },
        when: {
          click: function() {
            goback.call(this);
          }
        }
      },
      Save: {
        $inherit: ['../../_PrimaryButton'],
        props: {
          text: 'Save',
          left: LAY.take('../Cancel', 'right').add(25),
        },
        when: {
          click: function() {
            // Don't have a way to save in JSON as of now...
            // So go back
            // :(
            // Which is not working
            // :( :(
            goback.call(this);
          }
        }

      }
    }
  };

  function goback() {
    var dataLevel =  this.level('../../../');
    dataLevel.data('isListPage', true);
    dataLevel.data('selectedId', -1);

    location.hash = 'list';
  }
});
