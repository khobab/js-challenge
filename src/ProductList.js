var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var ProductItem = React.createClass({
  toggleCart: function () {
    $.ajax('/api/cart/toggle/' + this.props.product.id, {}).done(function(data) {
      if(data.nModified > 0) {
        this.props.product.added = !this.props.product.added;
        this.setState({});
      }
    }.bind(this));
  },
  render : function() {
    console.log("Rendering ProductItem:", this.props.product);
    var product = this.props.product;
    return (
      <div className="col-md-4 portfolio-item">
          <a>
              <img className="img-responsive" src={product.image} alt="Image not found."/>
          </a>
          <h3>
              <Link to={'/product/' + product.id}>Back to products list{product.name}</Link>
          </h3>
          <p>Price: {product.price}</p>
          {product.added == true ?  <button type="button" className="btn btn-danger" onClick={this.toggleCart}>Remove from Cart</button> : <button type="button" className="btn btn-success" onClick={this.toggleCart}>Add to Cart</button>}
      </div>
    )
  }
});

var ProductRow = React.createClass({
  render : function() {
    var productRow 
    var productItems = this.props.products.map(function(product) {
      return <ProductItem product={product} />
    });
    return (
        <div className="row">
          {productItems}
        </div>
    )
  }
});

var ProductList = React.createClass({
  getInitialState: function() {
    return {products: []};
  },
  render: function() {
    var camulative = [];
    var products = this.state.products || [];
    var productsLength = products.length;
    for(var i = 0; i < products.length; i=i+3) {
      var innerProducts = [];
      if(i  < productsLength) {
        innerProducts.push(products[i]);
      }

      if((i+1)  < productsLength) {
        innerProducts.push(products[i+1]);
      }

      if((i+2)  < productsLength) {
        innerProducts.push(products[i+2]);
      }
      camulative.push(innerProducts);
    } 

    var productRows = camulative.map(function(product) {
      return <ProductRow products={product} />
    });

    return (
      <div className="container">
        {productRows}
      </div>
    )
  },

  componentDidMount: function() {
    console.log("ProductList: componentDidMount");
    this.loadData();
  },

  loadData: function() {
    $.ajax('/api/products', {}).done(function(data) {
      this.setState({products: data});
    }.bind(this));
  }
});

module.exports = ProductList;