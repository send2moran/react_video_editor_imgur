'use strict';

import React from 'react';

import ProgressControl from '../components/ProgressControl';

export default React.createClass({
  componentWillReceiveProps: function(nextProps) {
    this.props.videoOptionsSrc = nextProps.videoOptionsSrc;
  },
  onUpdate:  function(val){
    this.props.onUpdate(val);
  },
    render: function() {
        return (
           <ProgressControl onUpdate={this.onUpdate} {...this.props} style={{width: this.props.vidWidth + 'px'}} />
        );
    }
});
