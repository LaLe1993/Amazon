import React, { Component } from 'react'
import Comments from './Comments'
import {Card,Button,Row, Col,Image,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Product from './Product'


class Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             movies:null
        }
    }
    
    componentDidMount=()=>{
        console.log('mounted')
        let id=this.props.match.params.id
        console.log('id',id)
        fetch('http://localhost:3002/media/'+ id)
        .then((response)=>response.json())
        .then((responseJson)=> this.setState({movies:responseJson}))
    }

    render() {
        console.log(this.state.movies)
        return (
        <Container>
            <Row>
            {console.log('this movie',this.state.movies)}
              {this.state.movies&&
                    <Product movies={this.state.movies} />
                }
            </Row>
        </Container>
        )
    }
}

export default Details