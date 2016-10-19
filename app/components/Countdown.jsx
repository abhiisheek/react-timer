var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

const STOPPED = 'stopped';
const STARTED = 'started';
const PAUSED = 'paused';

var Countdown = React.createClass({
    getInitialState: () => ({count: 0, countdownStatus: STOPPED}),
    handleSetCountdown: function(count) {
        this.setState({count, countdownStatus: STARTED});
    },
    componentDidUpdate: function(prevProps, prevState) {
      if(this.state.countdownStatus !== prevState.countdownStatus) {
        switch(this.state.countdownStatus) {
          case STARTED:
            this.startTimer();
            break;
          case STOPPED:
            this.setState({count: 0});
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
        var newCount = this.state.count - 1;
        this.setState({count: (newCount >= 0) ? newCount : 0});
        if(newCount === 0 || newCount < 0) {
          this.setState({countdownStatus: STOPPED});
        }
      }, 1000);
    },
    handleStatusChange: function(newStatus) {
      this.setState({countdownStatus: newStatus});
    },
    renderControlArea: function(countdownStatus) {
      if(countdownStatus !== STOPPED) {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      }
    },
    componentWillUnmount: function() {
      clearInterval(this.timer);
      this.timer = undefined;
    },
    render: function() {
        var {count, countdownStatus} = this.state;
        return (
            <div>
                <h1 className="page-title">Countdown App</h1>
                <Clock totalSeconds={count}/>
                {this.renderControlArea(countdownStatus)}
            </div>
        );
    }
});

module.exports = Countdown;
