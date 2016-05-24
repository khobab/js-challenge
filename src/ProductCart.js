var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var rr = require('react-router')
var Link = rr.Link;

var ProductCartItem = React.createClass({
  removeFromCart: function () {
    $.ajax('/api/cart/toggle/' + this.props.product.id, {}).done(function(data) {
      if(data.nModified > 0) {
        $(document).trigger("ReactComponent:ProductCart:removeElementFromCart",{product : this.props.product});
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
          <button type="button" className="btn btn-danger" onClick={this.removeFromCart}>Remove from Cart</button>
      </div>
    )
  }
});

var ProductCartRow = React.createClass({
  render : function() {
    var productRow 
    var productItems = this.props.products.map(function(product) {
      return <ProductCartItem product={product} />
    });
    return (
        <div className="row">
          {productItems}
        </div>
    )
  }
});

var ProductCart = React.createClass({
  getInitialState: function() {
    return {products: []};
  },
  emptyCart: function(ev) {
    $.ajax('/api/cart/clear', {}).done(function(data) {
      this.props.history.push('/');
    }.bind(this));
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
      return <ProductCartRow products={product} />
    });

    if(productRows.length < 1) {
      productRows.push(<div>There are no products in the cart.<Link to="/products">Back to products list</Link></div>);
    } else {
       productRows.unshift(
        <div className="cart-options">
          <Link to="/products">Back to products list</Link><br/>
          <button type="button" className="btn btn-danger" onClick={this.emptyCart}>Empty Cart</button>
          <button type="button" className="btn btn-success" onClick={this.emptyCart}>Checkout</button>
        </div>
        );
    }

    return (
      <div className="container">
          {productRows}
      </div>
    )
  },

  componentDidMount: function() {
    console.log("ProductList: componentDidMount");
    $(document).on("ReactComponent:ProductCart:removeElementFromCart", this.loadData);
    this.loadData();
  },

  loadData: function() {
    $.ajax('/api/cart/get', {}).done(function(data) {
      this.setState({products: data});
    }.bind(this));
  }
});

module.exports = ProductCart;