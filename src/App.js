import React from "react";
import {Modal,Button} from 'react-bootstrap';

import './style.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      products:[
        {
        name:'Fancy product',
        price:'10.00',
        inCart:false,
        onSale:false,
        rating:2,
        id:0, 
      },
      {
        name:'Special item',
        price:'20.00',
        inCart:false,
        onSale:false,
        rating:5,
        id:1,
      },
      {
        name:'Sale item',
        price:'30.00',
        inCart:false,
        onSale:false,
        rating:4,
        id:2,
      },
      {
        name:'Popular Item',
        price:'40.00',
        inCart:false,
        onSale:true,
        rating:0,
        id:3,
      },
      {
        name:'Sale item1',
        price:'25.00',
        inCart:false,
        onSale:true,
        rating:5,
        id:4,
      },
      {
        name:'Fancy product1',
        price:'35.00',
        inCart:false,
        onSale:true,
        rating:2,
        id:5, 
      },
      {
        name:'Special item2',
        price:'40.00',
        inCart:false,
        onSale:false,
        rating:3,
        id:6,
      },
      {
        name:'Sale item2',
        price:'60.00',
        inCart:false,
        onSale:true,
        rating:4,
        id:7,
      },

      ],
      cartCount:0,
      isCartVisible:false,
      cartTotal:0,
    }
    this.createRatingStars();
  };

  handleCart=(id,action)=>{
    const products= [...this.state.products];
    let inCart= products[id].inCart;
    let cartItems= this.state.cartCount;
    products[id].inCart= !(inCart);
    if(action==='add') cartItems+=1;
    else cartItems-=1;
    this.setState({cartCount:cartItems,
        products,
        isCartVisible:true,});
    this.calculateCartTotal();
  }

  calculateCartTotal=()=>{
    let cartTotal=0;
    this.state.products.forEach((product)=>{
        if(product.inCart) cartTotal+=parseInt(product.price)
    })
    this.setState({cartTotal});
  }

  createRatingStars=()=>{
    const products= [...this.state.products];
    products.forEach((product)=>{
      product['ratingStars']=[];
      for(let i=0;i<product.rating;i++) product['ratingStars'].push(i);
      this.setState({products});
    })
    
  }

  showCart=(e)=>this.setState({isCartVisible:true});
  hideCart=()=>this.setState({isCartVisible:false});
 
  componentDidMount(){
   
  }

  render(){
    return(
      <>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="#!">Start Bootstrap</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="/">About</a></li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="/">All Products</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                            <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                        </ul>
                    </li>
                </ul>
                <Modal show={this.state.isCartVisible} size="md" onHide={this.hideCart}>
                  <Modal.Header closeButton>
                  <Modal.Title>Cart</Modal.Title>
                  </Modal.Header>
                <Modal.Body>
                  {this.state.cartCount<=0? <p>Cart is empty</p>:
                    <div className="cart-items">
                    <h4 className="cart-item-text">Product</h4>
                    <h4>Price</h4>
                    <h4>Action</h4>
                    </div>
                  }

                    {this.state.products.map((product)=>{
                     return(
                      <>
                      {product.inCart?
                      <>
                      <div className="cart-items">
                        <h5 className="cart-item-text">{product.name}</h5>
                        <h5>${product.price}</h5>
                        <Button variant="danger" size="sm" onClick={()=>{this.handleCart(product.id,'remove')}}>Remove</Button>
                        </div>
                          </> :''
                        }
                      </>
                     )
                    
                    })}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideCart} variant="primary">Continue shopping</Button>
                    <h2>Total: ${this.state.cartTotal}</h2>
                  </Modal.Footer>
                </Modal>
                {/* <form className="d-flex"> */}
                    <button className="btn btn-outline-dark" onClick={()=>{this.showCart()}}>
                        <i className="bi-cart-fill me-1"></i>
                        Cart
                        <span className="badge bg-dark text-white ms-1 rounded-pill">{this.state.cartCount}</span>
                    </button>
                {/* </form> */}
            </div>
        </div>
    </nav>
    <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h1 className="display-4 fw-bolder">Shop in style</h1>
                <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
            </div>
        </div>
    </header>
      <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {this.state.products.map((product)=>{
                  return(
                    <>
                        <div className="col mb-5">
                        <div className="card h-100">
                          {product.onSale? <div className="badge bg-dark text-white position-absolute" style={{top:'0.5rem', right:'0.5rem'}}>Sale</div>:''}
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                             <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">{product.name}</h5>
                                    {product.onSale?<span className="text-muted text-decoration-line-through">$100.00</span>:''}
                                     ${product.price}
                                </div>
                                <div className="d-flex justify-content-center small text-warning mb-2">
                                  {product['ratingStars'].map((eachStar)=>{
                                    return(
                                      <div className="bi-star-fill"></div>
                                    )
                                  })}
                                  </div>
                                </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"> <button disabled={product.inCart} className="btn btn-outline-dark mt-auto" onClick={()=>{this.handleCart(product.id,'add')}}>{product.inCart?'In cart':'Add to cart'}</button></div>
                            </div>
                        </div>
                    </div>
                    </>
                  )
                })}
               
                </div>
                </div>
      </section>
      </>
    );
  }

}

export default App;