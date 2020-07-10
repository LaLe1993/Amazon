import React, { Component } from 'react'
import {Container, Row, Col, Card, Button} from'react-bootstrap'
import {Link} from 'react-router-dom'

const responsive = {
    desktop:{
      breakpoint :{max:3000, min:1024},
      items : 6
    },
    mobile:{
      breakpoint :{max:1024, min:464},
      items : 3
    }
  }
 class MyCards extends Component {
    constructor(props){
        super(props);
       
      }
      
    render() {
        return (
            <Container fluid className='mt-3 mb-3'>
              <Row>
                {/* <p className='movieName'>{this.props.name}</p> */}
                {this.props.movies.map(movie =>{
                    return(
                      <Col className='col-6 col-md-3 col-lg-2 mb-2 px-1 imagesCol'>                        
                          <Card className='h-100 darkCard'>
                            <Card.Img className='w-100' variant="top" src={movie.imageUrl} />
                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <Card.Title>{movie.name}</Card.Title>
                                <Link to={'/allSameProduct/'+ movie.name}><Button className='w-100' variant="primary">Details...</Button></Link>
                            </Card.Body>
                          </Card>
                        
                      </Col>
                    )
                })}
              </Row>
            </Container> 
        )
    }
}

export default MyCards
