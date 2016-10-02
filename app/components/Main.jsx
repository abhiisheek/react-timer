var React = require('react');
var Nav = require('Nav');

var Main = ({children}) => {
    return (
        <div>
            <Nav/>
            <div className="row">
              <div className="column small-centered medium-6 large-4">
                  {children}
              </div>
            </div>
        </div>
    );
}

module.exports = Main;
