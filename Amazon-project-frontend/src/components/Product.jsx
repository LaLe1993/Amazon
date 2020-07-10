import React, { Component } from 'react'
import {Col, Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class Product extends Component {
    constructor(props){
        super(props);

       }

    render() {
        return (
            <>
            {/* <p className='movieName'>{this.props.name}</p> */}
                {this.props.movies.map(movie =>{
                    return(
                        <Col xs={4}>
                            <Card className='h-100 darkCard mb-3'>
                                <Card.Img className='w-100' variant="top" src={movie.imageUrl} />
                                <Card.Body className='d-flex flex-column justify-content-between'>
                                        <Card.Title>{movie.name}</Card.Title>
                                    <Link to={'/Details/'+ movie.name}><Button className='w-100' variant="primary">Details...</Button></Link>
                                </Card.Body>
                            </Card>
                        </Col> 
                    )
                })}
            </>
        )   
    }
}

export default Product
