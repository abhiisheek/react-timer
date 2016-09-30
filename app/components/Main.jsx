var React = require('react');
var Nav = require('Nav');

var Main = ({children}) => {
    return (
        <div>
            <Nav/>
            <div>
                {children}
            </div>
        </div>
    );
}

module.exports = Main;
