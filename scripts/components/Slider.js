import React from 'react';
import _ from 'lodash';


export default React.createClass({
    displayName: "Vidgif-InputRange",
    _handleSlide: function(a, b) {
        var c = this.props.onChange || _.noop;
        var e = this.props.limit || _.noop;
        if(b.value >= e){
          return false;
        }
        a.target.value = b.value;
        var d = c(a);
        return d
    },
    _handleSlideStart: function(a) {
        var b = this.props.onStart || _.noop;
        return $(this.refs["slider-container"].getDOMNode()).addClass("slid ui-parent-state-active"), b(a)
    },
    _handleSlideStop: function(a) {
        var b = this.props.onEnd || _.noop;
        return $(this.refs["slider-container"].getDOMNode()).removeClass("ui-parent-state-active"), b(a)
    },
    _renderjQueryUI: function() {
        var a = this.refs["slider-container"].getDOMNode(),
            b = document.createElement("div");
        $(a).html("").append(b), $(b).slider({
            min: this.props.min,
            max: this.props.max,
            value: this.props.value,
            step: this.props.step,
            orientation: this.props.orientation,
            slide: this._handleSlide,
            range: this.props.range_type
        }).on({
            slidestart: this._handleSlideStart,
            slidestop: this._handleSlideStop
        })
    },
    componentDidMount: function() {
        this._renderjQueryUI()
    },
    componentDidUpdate: function(a) {
        a.value !== this.props.value && $(this.refs["slider-container"].getDOMNode().childNodes[0]).slider("option", "value", this.props.value), a.min !== this.props.min && $(this.refs["slider-container"].getDOMNode().childNodes[0]).slider("option", "min", this.props.min), a.max !== this.props.max && $(this.refs["slider-container"].getDOMNode().childNodes[0]).slider("option", "max", this.props.max)
    },
    shouldComponentUpdate: function(a) {
        return this.props.value !== a.value || this.props.max !== a.max || this.props.min !== a.min
    },
    render: function() {
        return React.DOM.div({
            className: "slider-container",
            ref: "slider-container"
        }, React.DOM.div({
            ref: "background"
        }, ""))
    }
});
