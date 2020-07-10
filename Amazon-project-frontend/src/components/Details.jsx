import React, { Component } from 'react'
import Comments from './Comments'
import {Card,Button,Row, Col,Image,Container} from 'react-bootstrap'


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
        .then((responseJson)=> this.setState({movie:responseJson[0]}))
       
     
    }
    render() {
        return (
        <Container>
            {console.log('this movie',this.state.movie)}
              {this.state.movie&&
                <Row>
                    <Col xs={6}>
                        <Image className='image-fluid imageInDetails shadow p-3 mb-5 bg-white rounded'src={this.state.movie.imageUrl}></Image>
                    </Col>
                    <Col xs={6}>
                        <h1 style={{color:'bleck'}}>{this.state.movie.name}</h1>              
                    <Comments id={this.state.movie.id} />
                    </Col>
                </Row>}
        </Container>
        )
    }
}

export default Details
