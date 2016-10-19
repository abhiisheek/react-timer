var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var Countdown = require('Countdown');

describe('Countdown', () => {
  it('Should exist', () => {
    expect(Countdown).toExist();
  });

  describe('handleSetCountdown', () => {
    it('Should set state to started and countdown', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(10);

      expect(countdown.state.count).toBe(10);
      expect(countdown.state.countdownStatus).toBe('started');

      setTimeout(()=>{
        expect(countdown.state.count).toBe(9);
        done();
      },1001);
    });
  });

  it('Should never set count to negative', (done) => {
    var countdown = TestUtils.renderIntoDocument(<Countdown/>);
    countdown.handleSetCountdown(1);

    expect(countdown.state.count).toBe(1);
    expect(countdown.state.countdownStatus).toBe('started');

    setTimeout(()=>{
      expect(countdown.state.count).toBe(0);
      done();
    },3001);
  });

  it('Should pause countdown on PAUSED status', (done) => {
    var countdown = TestUtils.renderIntoDocument(<Countdown/>);
    countdown.handleSetCountdown(3);
    countdown.handleStatusChange('paused');
    setTimeout(()=>{
      expect(countdown.state.count).toBe(3);
      expect(countdown.state.countdownStatus).toBe('paused');
      done();
    }, 1001)
  });

  it('Should stop countdown on STOPPED status', (done) => {
    var countdown = TestUtils.renderIntoDocument(<Countdown/>);
    countdown.handleSetCountdown(3);
    countdown.handleStatusChange('stopped');
    setTimeout(()=>{
      expect(countdown.state.count).toBe(0);
      expect(countdown.state.countdownStatus).toBe('stopped');
      done();
    }, 1001)
  });
});
