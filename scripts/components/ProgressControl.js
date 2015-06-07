import React from 'react';
import {ProgressBar} from 'react-bootstrap';
//import ReactSlider from 'react-slider';
import {toVideoDuration} from '../utils/';
import Thumbnail from '../components/Thumbnail';
import BarMarker from '../components/BarMarker';
import ReactSlider from '../components/slider';

export default React.createClass({

    getInitialState: function() {

        return {
            progress: 0,
            seekTime: 0,
            rawSeekTime: 0,
            showTicket: 'hidden',
            showClippingDuration: 'hidden',
            ticketLeft: 0,
            clippingDuration: 0
        };
    },

    componentDidMount: function() {
        this.props.api.addEventListener('timeupdate', this._onTimeUpdate, false);
        this._updateBarState();
    },

    _updateBarState: function() {
        let bar = this.refs.seekbar.getDOMNode();
        this.setState({offsetLeft: bar.offsetLeft});
    },

    _onMouseSeek: function(event) {
      return ;
        let api = this.props.api,
            pos = Math.abs((this.refs.sliderStart.getDOMNode().getClientRects()[0].left - this.refs.sliderStart.getDOMNode().querySelectorAll('span')[0])) / this.props.vidWidth,
            ttt = pos * api.duration;

        this.setState( {seekTime: toVideoDuration(ttt),
                        rawSeekTime: ttt,
                        showTicket: 'visible',
                        ticketLeft: event.pageX });
    },

    _onTimeUpdate: function() {
        let api = this.props.api,
            progress = Math.floor((100 / api.duration) * api.currentTime);
        this.setState({ progress });
    },

    _onMouseOut: function() {
        this.setState( {showTicket: 'hidden'});
    },

    _seek: function(event) {
      return;
        let api = this.props.api,
            pos = ((event.clientX - event.target.getClientRects()[0].left) - this.props.offsetLeft) / this.props.vidWidth;
        api.currentTime = pos * api.duration;
    },

    _onChange: function (event) {

      var sliderStartSpanElement = this.refs.sliderStart.getDOMNode().querySelectorAll('span')[0];
      var sliderEndVal = this.state.sliderEndVal;
      var secondSliderMin = this.props.maxClipDuration/100 * sliderEndVal;

      var sliderStartVal = event.target.value;
      var api = this.props.api;
      var pos = (sliderStartVal* api.duration) /100;

      console.clear();
      console.log('****');
      console.log(sliderStartVal);
      console.log(pos);
      console.log(secondSliderMin);
      console.log(100* secondSliderMin/ api.duration-secondSliderMin);
      console.log((sliderStartVal* (api.duration-secondSliderMin)) /100);
      console.log('****');

      this.setState({seekTime: toVideoDuration(pos),rawSeekTime: pos});
      this.setState({progress : sliderStartVal});
      this.setState({sliderStartPos: pos });

      setTimeout(function(){
        this.setState({sliderStart: ((sliderStartSpanElement.getClientRects()[0].right) - (this.refs.sliderStart.getDOMNode().getClientRects()[0].left)) });
      }.bind(this),10);

      var limit = api.duration-this.state.sliderStartPos;
      var sliderEndLimit = 100*limit/this.props.maxClipDuration;
      this.setState({sliderEndLimit:sliderEndLimit});
      this.setState({sliderStartLimit: (api.duration-secondSliderMin)*100/api.duration});
      api.currentTime = pos;
      this.props.onUpdate(api.currentTime);

    },

    _onChangeEndSlider: function(event){
      var sliderEndVal = event.target.value;
      var api = this.props.api;
      var pos = Math.min(api.duration-this.state.sliderStartPos, (this.props.maxClipDuration * sliderEndVal/100));
      var sliderEndPosPercent = (100 * pos/this.props.maxClipDuration);
      this.setState({sliderEndPosPercent: sliderEndPosPercent});
      this.setState({sliderEndPos: pos });
      this.setState({sliderEndVal: sliderEndVal});
      this.setState({seekTimeEnd: toVideoDuration(pos), rawSeekTimeEnd: pos});
      this.setState({sliderStartLimit: ((api.duration-(this.props.maxClipDuration/100 * sliderEndVal))*100/api.duration)});
    },
    componentWillReceiveProps: function(nextProps) {
      this.props.thumbnail.src = nextProps.videoOptionsSrc;
    },

    render: function() {
        return (
            <div className='progress-controls' style={{position: 'relative', height: '20px' }}
                                onClick={this._seek}
                                onMouseOver={this._onMouseSeek}
                                onMouseMove={this._onMouseSeek}
                                onMouseOut={this._onMouseOut}
                                >

                <ProgressBar ref="seekbar"
                                now={this.state.progress}
                                style={{width: this.props.vidWidth + 'px'}}
                                />

                <div id="horizontal-0" style={{position: 'absolute',top: '0px',bottom: '0px',left: '0px', right: '0px' }} >
                  <ReactSlider limit={this.state.sliderStartLimit} min={0} max={100} range_type={'min'} ref="sliderStart" className='horizontal-slider' onChange={this._onChange}/>
                </div>

                <div style={{border: '1px solid #000', width:'200px', left: this.state.sliderStart + 'px', position: 'absolute'}}>
                  <div id="horizontal-1" >
                    <div>
                      <strong>{this.state.seekTime}</strong> - <strong>{this.state.seekTimeEnd}</strong>
                      <ReactSlider ref="sliderEnd" limit={this.state.sliderEndLimit} min={0} max={100} range_type={'min'} className='horizontal-slider' onChange={this._onChangeEndSlider}/>
                    </div>
                  </div>
                </div>

                <BarMarker timeMarks={this.props.thumbnail.timeMarks}
                            barWidth={this.props.vidWidth}
                            duration={this.props.duration}/>

                   <div style={{visibility: this.state.showTicket}} >
                      <strong>{this.state.rawSeekTime}</strong>
                      <br />
                      <div>
                        <Thumbnail style={{visibility: this.state.showTicket}} video={this.props.thumbnail}  seek={this.state.rawSeekTime} width="200px" />
                      </div>
                    </div>


            </div>

        );
    }
});
