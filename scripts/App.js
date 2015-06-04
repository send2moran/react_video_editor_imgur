'use strict';

import React from 'react';

// import {StateStreamMixin} from 'rx-react';
// import Rx from 'rx';

import videoOptions from './config';
import VideoPlayer from './components/VideoPlayer';
import ControlPanel from './components/ControlPanel';
import Thumbnail from './components/Thumbnail';

export default React.createClass({
  onUpdate: function(val){
    //this.setState({seek: val});
  },
    getInitialState: function() {
        return {
            vidWidth: 0,
            offsetLeft: 0,
            api: undefined,
            duration: 0,
            seek: 0,
            maxClipDuration:15
        };

    },

    _handleResize: function() {
        let master = this.refs.master.getDOMNode();
        this.setState({
            vidWidth: master.clientWidth,
            offsetLeft: master.offsetLeft,
        });
    },

    initPlayerApi: function() {
       let player = this.refs.player.getDOMNode();
       player.addEventListener('loadedmetadata', this.loadedMetaData);
       this.setState({ api: player });
    },

    loadedMetaData: function(event) {
      this.setState({duration: event.target.duration});
    },

    componentDidMount: function() {
        this._handleResize();
        this.initPlayerApi();
        window.addEventListener('resize', this._handleResize);
        this.setState({'videoOptionsSrc':videoOptions.src})
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this._handleResize);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log(nextProps);
    },

    videoSrcChange: function(newValue){
      this.setState({videoOptionsSrc: newValue});
    },

    render: function() {
      var valueLink = {
        value: this.state.videoOptionsSrc,
        requestChange: this.videoSrcChange
      };
      let cpan;
      console.log(this.state.duration);
      if (this.state.duration > 0) { //don't mount the seekbar until metadata are loaded
        cpan = <ControlPanel onUpdate={this.onUpdate} {...this.state} thumbnail={videoOptions} />;
      }

      return (
          <div className='row' ref='master' style={{ height:'400px', width:'600px' }}>
          <input type="text" style={{ height:'20px', width:'600px' }} valueLink={valueLink} />
            <VideoPlayer  ref='player'
                          width={this.state.vidWidth}
                          src={this.state.videoOptionsSrc}
                          type={videoOptions.type}
                          />

            {cpan}

          </div>
      );
    }
});
