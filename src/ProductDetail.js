var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var ProductDetail = React.createClass({
  toggleCart: function () {
    $.ajax('/api/cart/toggle/' + this.state.id, {}).done(function(data) {
      if(data.nModified > 0) {
        this.state.added = !this.state.added;
        this.setState(this.state);
      }
    }.bind(this));
  },
  render: function() {
    var product = this.state;
    return (
      <div className="col-md-4 portfolio-item">
          <Link to={'/products'}>Back to products list</Link>
          <a>
              <img className="img-responsive" src={product.image} alt="Image not found."/>
          </a>
          <h3>
              <a>{product.name}</a>
          </h3>
          <div>{product.description}</div>
          <p>Price: {product.price}</p>
          {product.added == true ?  <button type="button" className="btn btn-danger" onClick={this.toggleCart}>Remove from Cart</button> : <button type="button" className="btn btn-success" onClick={this.toggleCart}>Add to Cart</button>}
      </div>
    )
  },

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    this.loadData();
  },

  loadData: function() {
    $.ajax('/api/product/' + this.props.params.id) .done(function(product) {
      this.setState(product);
    }.bind(this));
  }
});

module.exports = ProductDetail;
