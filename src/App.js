var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;

var ProductList = require('./ProductList');
var ProductCart = require('./ProductCart');
var ProductDetail = require('./ProductDetail');

/* no match function in case no route is matched */
var NoMatch = React.createClass({
  render: function() {
    return (
      <h2>No match for the route</h2>
    );
  }
});

/* Router definitation to redirect and document element specification where all reactjs elements will be drawn*/
ReactDOM.render(
  (
    <Router>
      <Route path="/products" component={ProductList} />
      <Route path="/cart" component={ProductCart} />
      <Route path="/product/:id" component={ProductDetail} />
      <Redirect from="/" to="/products" />
      <Route path="*" component={NoMatch} />
    </Router>
  ),
  document.getElementById('main')
);

