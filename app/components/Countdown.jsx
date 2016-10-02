var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

const STOPPED = 'stopped';
const STARTED = 'started';

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
        }
      }
    },
    startTimer: function() {
      this.timer = setInterval(() => {
        var newCount = this.state.count - 1;
        this.setState({count: (newCount >= 0) ? newCount : 0});
        if(newCount === 0 || newCount < 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    render: function() {
        var {count} = this.state;
        return (
            <div>
                <Clock totalSeconds={count}/>
                <CountdownForm onSetCountdown={this.handleSetCountdown}/>
            </div>
        );
    }
});

module.exports = Countdown;
