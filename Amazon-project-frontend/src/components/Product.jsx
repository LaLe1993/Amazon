import React, { Component } from 'react'
import {Col, Card, Button, Form, Modal} from 'react-bootstrap'

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            showModal:false,
            product:{}
         }
       }

    editProduct= async(id) =>{
        let response= await fetch("http://localhost:3456/products/"+ id,{
        method:'PUT',
        body: JSON.stringify(this.state.product),
        headers: new Headers({'content-type': 'application/json'})
        }
  
    )
    if(response.ok){
        let response= await fetch(`http://localhost:3456/products/`+ id,{
        headers: new Headers({'content-type': 'application/json'})
    })
        this.setState({showModal:false})
        let products=await response.json()
        this.setState({products})
        }
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

    render() {
        return (
            <>
                            <Col xs={6} className='mb-3'>
                                <Card className='h-100 darkCard mb-3'>
                                    <Card.Img className='w-100' variant="top" src={this.props.products.imageUrl} />
                                    <Card.Body className='d-flex flex-column justify-content-between'>
                                        <Card.Title style={{textAlign:'center'}}>{this.props.products.brand} {this.props.products.name}</Card.Title>
                                        <p>{this.props.products.description}</p>
                                        <div className='d-flex justify-content-between'>
                                            <Button className='w-100' variant="warning" onClick={this.handleShow}>Edit</Button>
                                        </div>
                                        <Modal show={this.state.showModal}  onHide={this.handleClose}>
                                        <Modal.Body>
                                            <Form.Group >
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder={this.props.products.name} id='name' onChange={this.catchInput} />  
                                            </Form.Group>

                                            <Form.Group >
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" rows="3" id='description' placeholder={this.props.products.description} onChange={this.catchInput}/>                                           
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Brand</Form.Label>
                                                <Form.Control type="text" id='brand' placeholder={this.props.products.brand} onChange={this.catchInput} />                                        
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Image URL</Form.Label>
                                                <Form.Control type="text" id='imageUrl' placeholder={this.props.products.imageUrl} onChange={this.catchInput} />                                        
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control type="number" id='price' placeholder={this.props.products.price} onChange={this.catchInput} />                                        
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Category</Form.Label>
                                                <Form.Control type="text" id='category' placeholder={this.props.products.category} onChange={this.catchInput} />                                        
                                            </Form.Group>                                                                        
                                        </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="primary" onClick={ () => this.editProduct(this.props.products._id)}>Save Edits</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6}>
                                <h3>Reviews</h3>
                            </Col>
            </>
        )   
    }
}

export default Product
