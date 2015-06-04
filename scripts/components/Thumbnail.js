'use strict';

import React from 'react';

export default React.createClass({

    componentWillReceiveProps: function(nextProps) {
        let api = this.refs.thumbnail.getDOMNode();
        api.currentTime = nextProps.seek;
    },

    render: function() {

        return (
            <video ref="thumbnail" width={this.props.width} preload='metadata' src={this.props.video.src} type={this.props.video.type}/>
        );
    }
});
