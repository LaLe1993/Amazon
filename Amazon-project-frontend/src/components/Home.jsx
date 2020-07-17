import React from "react";
import { Container, Row, Col , Dropdown,Button,Modal,Form,Card } from "react-bootstrap";
import {Link} from 'react-router-dom'

class Home extends React.Component {

   state = {
      products: [],
      showModal:false,
      product:{}
   }

  componentDidMount=async()=> {
    let response = await fetch('http://localhost:3456/products')
    
    let data= await response.json()
    console.log('DATA',data)
    this.setState({products:data})
  }

 handleShow=()=>{
     this.setState({showModal:true})
 }
 handleClose=()=>{
    this.setState({showModal:false})
}

catchInput=(e)=>{
  let field=e.currentTarget.id
  let product=this.state.product
  product[field]=e.currentTarget.value
  this.setState({product},()=>{
    console.log(this.state.product)
  })
  
}
saveNewProduct=async()=>{
    let response= await fetch("http://localhost:3456/products/",{
      method:'POST',
      body: JSON.stringify(this.state.product),
      headers: new Headers({'content-type': 'application/json'})
  })
  if(response.ok){
    this.setState({showModal:false})
    let response= await fetch(`http://localhost:3456/products/`,{
      headers: new Headers({'content-type': 'application/json'})
  })
  let products=await response.json()
  this.setState({products})
  }
}

deleteProduct=async(id)=>{
  let response= await fetch("http://localhost:3456/products/"+ id,{
    method:'DELETE',
    headers: new Headers({'content-type': 'application/json'})
  }
  
  )
  console.log("ODGOVOR",response)
if(response.ok){

  let response= await fetch(`http://localhost:3456/products`,{
    headers: new Headers({'content-type': 'application/json'})
})
let products=await response.json()
this.setState({products})
}
}

  render() {

    return (
      <Container>
        <Row className="justify-content-between mb-4">
          <Col className="d-flex align-items-center">
            <h2 className="mb-0">Products</h2>
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                className="btn btn-sm dropdown-toggle rounded-0 ml-3"
                style={{ backgroundColor: "white", color: "black" }}
              >
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark">
                <Dropdown.Item href="#/action-1">By name</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Price from lowest</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Price from highest</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <div className="d-none d-md-block">
            <Button variant='success' style={{fontWeight:"bold"}}  onClick={this.handleShow}>ADD NEW PRODUCT</Button>
            <Modal show={this.state.showModal}  onHide={this.handleClose}>
             <Modal.Body>
             <Form.Group >
             <Form.Label>Name</Form.Label>
             <Form.Control type="text" placeholder="Enter name of product" id='name' onChange={this.catchInput} />
            
           </Form.Group>
           <Form.Group >
             <Form.Label>Description</Form.Label>
             <Form.Control as="textarea" rows="3" id='description' placeholder="Enter product description" onChange={this.catchInput}/>
            
           </Form.Group>
             <Form.Group>
             <Form.Label>Brand</Form.Label>
             <Form.Control type="text" id='brand' placeholder="Enter products brand" onChange={this.catchInput} />
           
           </Form.Group>
           <Form.Group>
             <Form.Label>Image URL</Form.Label>
             <Form.Control type="text" id='imageUrl' onChange={this.catchInput} />
           
           </Form.Group>
           <Form.Group>
             <Form.Label>Price</Form.Label>
             <Form.Control type="number" id='price' onChange={this.catchInput} />
           
           </Form.Group>
           <Form.Group>
             <Form.Label>Category</Form.Label>
             <Form.Control type="text" id='category' onChange={this.catchInput} />
           
           </Form.Group>
   
        
           </Modal.Body>
           <Modal.Footer>
           <Button variant="success" onClick={this.saveNewProduct}>Save changes</Button>
         </Modal.Footer>
         </Modal>
          </div>
        </Row>
              <Row>
                {/* <p className='movieName'>{this.props.name}</p> */}
                {this.state.products.map(product =>{
                    return(
                      <Col className='col-6 col-md-4 col-lg-3 mb-2 px-1 imagesCol' key={product._id}>                        
                          <Card className='h-100 darkCard'>
                            <Card.Img className='w-100' variant="top" src={product.imageUrl} />
                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <Card.Title style={{textAlign:'center'}}>{product.brand} {product.name}</Card.Title>
                                <h3 style={{textAlign:'center'}}>{product.price} €</h3>
                                <div className='d-flex justify-content-between'>
                                  <Link to={'/allSameProduct/'+ product._id} className='w-100 mr-3'><Button variant="primary">Product details</Button></Link>
                                  <Button variant='danger' className='w-100' onClick={() => this.deleteProduct(product._id)}>Delete</Button>
                                </div>
                            </Card.Body>
                          </Card>
                        
                      </Col>
                    )
                })}
              </Row>  
      </Container>
    );
  }
}

export default Home;