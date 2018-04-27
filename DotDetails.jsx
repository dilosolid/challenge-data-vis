var React = require('react');
var createReactClass = require('create-react-class');

var showStyle = {
    display:'inline'
};

var hideStyle = {
    display:'none'
};

module.exports = createReactClass({render(){      
        return <div style={ this.props.showDetails ? showStyle : hideStyle}>
                <div>i: {this.props.index}</div>
                <div>species: {this.props.species}</div>
                <div>petalWidth: {this.props.petalWidth}</div>
                <div>petalLength: {this.props.petalLength}</div>
                <div>sepalWidth: {this.props.sepalWidth}</div>
                <div>sepalLength {this.props.sepalLength}</div>
               </div>
    }
})
