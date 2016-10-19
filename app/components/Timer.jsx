var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

const STOPPED = 'stopped';
const STARTED = 'started';
const PAUSED = 'paused';

var Timer = React.createClass({
    getInitialState: () => ({count: 0, timerStatus: STOPPED}),
    handleStatusChange: function(newStatus) {
      this.setState({timerStatus: newStatus});
    },
    componentDidUpdate: function(prevProps, prevState) {
      if(this.state.timerStatus !== prevState.timerStatus) {
        switch(this.state.timerStatus) {
          case STARTED:
            this.startTimer();
            break;
          case STOPPED:
            this.setState({count: 0});
            clearInterval(this.timer);
            this.timer = undefined;
            break;
          case PAUSED:
            clearInterval(this.timer);
            this.timer = undefined;
            break;
        }
      }
    },
    startTimer: function() {
      this.timer = setInterval(() => {
        var newCount = this.state.count + 1;
        this.setState({count: newCount});
      }, 1000);
    },
    componentWillUnmount: function() {
      clearInterval(this.timer);
      this.timer = undefined;
    },
    render: function() {
        var {count, timerStatus} = this.state;
        return (
            <div>
                <h1 className="page-title">Timer</h1>
                <Clock totalSeconds={count}/>
                <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
            </div>
        );
    }
});

module.exports = Timer;
