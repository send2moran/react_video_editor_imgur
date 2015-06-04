'use strict';

import React from 'react';

// preload='metadata'

export default React.createClass({
  componentWillReceiveProps: function(nextProps) {
    let videoPlayer = this.refs.videoPlayer.getDOMNode();
  },
    render: function() {
        return (
                <video ref="videoPlayer" src={this.props.src} type={this.props.type} width={this.props.width} id='video-player' preload='auto'/>
            );
    }
});
