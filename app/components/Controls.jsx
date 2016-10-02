var React = require('react');

const STOPPED = 'stopped';
const STARTED = 'started';
const PAUSED = 'paused';

var Controls = React.createClass({
  propTypes: {
    countdownStatus: React.PropTypes.string.isRequired,
    onStatusChange: React.PropTypes.func.isRequired
  },
  onStatusChange: function(newStatus) {
    return () => (this.props.onStatusChange(newStatus))
  },
  renderStartStopButton: function(countdownStatus) {
    if(countdownStatus === STARTED) {
      return <button className="button secondary" onClick={this.onStatusChange(PAUSED)}>Pause</button>
    } else if (countdownStatus === PAUSED) {
      return <button className="button primary" onClick={this.onStatusChange(STARTED)}>Start</button>
    }
  },
  render: function() {
    var {countdownStatus} = this.props;
    return (
      <div className="controls">
        {this.renderStartStopButton(countdownStatus)}
        <button className="button alert hollow" onClick={this.onStatusChange(STOPPED)}>Clear</button>
      </div>
    );
  }
});

module.exports = Controls;
