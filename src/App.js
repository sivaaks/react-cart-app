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
    this.state.products.map((product)=>{
      if(product.inCart) cartTotal+=parseInt(product.price)
    })
    this.setState({cartTotal});
  }

  createRatingStars=()=>{
    const products= [...this.state.products];
    products.map((product)=>{
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
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container px-4 px-lg-5">
            <a class="navbar-brand" href="#!">Start Bootstrap</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">All Products</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                            <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
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
                {/* <form class="d-flex"> */}
                    <button class="btn btn-outline-dark" onClick={()=>{this.showCart()}}>
                        <i class="bi-cart-fill me-1"></i>
                        Cart
                        <span class="badge bg-dark text-white ms-1 rounded-pill">{this.state.cartCount}</span>
                    </button>
                {/* </form> */}
            </div>
        </div>
    </nav>
    <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Shop in style</h1>
                <p class="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
            </div>
        </div>
    </header>
      <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {this.state.products.map((product)=>{
                  return(
                    <>
                        <div class="col mb-5">
                        <div class="card h-100">
                          {product.onSale? <div class="badge bg-dark text-white position-absolute" style={{top:'0.5rem', right:'0.5rem'}}>Sale</div>:''}
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                             <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{product.name}</h5>
                                    {product.onSale?<span class="text-muted text-decoration-line-through">$100.00</span>:''}
                                     ${product.price}
                                </div>
                                <div class="d-flex justify-content-center small text-warning mb-2">
                                  {product['ratingStars'].map((eachStar)=>{
                                    return(
                                      <div class="bi-star-fill"></div>
                                    )
                                  })}
                                  </div>
                                </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"> <button disabled={product.inCart} class="btn btn-outline-dark mt-auto" onClick={()=>{this.handleCart(product.id,'add')}}>{product.inCart?'In cart':'Add to cart'}</button></div>
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