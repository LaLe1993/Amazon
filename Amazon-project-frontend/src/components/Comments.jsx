import React, { Component } from 'react'
import {Badge,Button,Form,Modal,Col,Row} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

class Comments extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       comments:[],
       show: false,
       review :{
        comment :'',
        rate : '1',
        elementId : this.props.name
      }
    }
  }
  handleClick=()=>{
    this.setState({show:true})
  }
  handleHide=()=>{
    this.setState({show:false})
  }
  sendReview=async()=>{
    let id = this.props.name
    const commentsUrl = "http://localhost:3002/reviews/"+id;
    let response = await fetch(commentsUrl,{
      method:'POST',
      body : JSON.stringify(this.state.review),
      headers : new Headers({
        // 'Authorization': 'Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU=',
        'content-type': 'application/json'
      })
    })
    if(response.ok){
      this.setState({show:false})
      const commentsUrl = "http://localhost:3002/reviews/";
      let response = await fetch(commentsUrl + id,{
        method:'GET',
        // headers : new Headers({
        //   'Authorization':'Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU='
        // })
      })
      let comments = await response.json()
      console.log('comments',comments)
      this.setState({comments})
    }
  }
  updateReview =(e)=>{
    let review = this.state.review
    let id = e.currentTarget.name
    if(id === 'rate'){
      review[id] = parseInt(e.currentTarget.value)
    } else{
      review[id] = e.currentTarget.value
    }
    this.setState({review})
    console.log(this.state.review)

  }
  
  componentDidMount=async() =>{
    let id = this.props.name
    console.log('id changing',id)
    const commentsUrl = "http://localhost:3002/reviews/";
    let response = await fetch(commentsUrl + id,{
      method:'GET',
      // headers : new Headers({
      //   'Authorization':'Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU='
      // })
    })
    let comments = await response.json()
    console.log('comments',comments)
    this.setState({comments})
  }

  
    render() {
        return (
           <>
           {this.state.comments.map((comment)=>(<p style={{color:'white'}}>{comment.comment} <Badge variant="info">{comment.rate}</Badge></p> ))}
           <Button className='submitReviewBtn mt-2'onClick={this.handleClick} >Submit Review</Button>
           <Modal
              show = {this.state.show}
              onHide ={this.handleHide}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
            >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Submit Your Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2} style={{color:"black"}}>
              Review:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" id='comment' onChange={this.updateReview} placeholder="Write your Review" required/>
              <Form.Control.Feedback type="invalid">
              Review cannot be empty
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}  for="rate" style={{color:"black"}}>Rating:</Form.Label>
            <Col sm={4}>
              <Form.Control as="select" id='rate' onChange={this.updateReview}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Col>
          </Form.Group>
 
          
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.sendReview}>Send</Button>
        </Modal.Footer>
      </Modal>
           </>
        )
    }
}

export default withRouter(Comments)
