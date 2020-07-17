import React, { Component } from 'react'
import {Row, Container} from 'react-bootstrap'
import Product from './Product'


class Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products:null
        }
    }
    
    componentDidMount=()=>{
        console.log('mounted')
        let id=this.props.match.params.id
        console.log('id',id)
        fetch('http://localhost:3456/products/'+ id)
        .then((response)=>response.json())
        .then((responseJson)=> this.setState({products:responseJson[0]}))
    }

    render() {
        return (
        <Container>
            <Row>
              {this.state.products&&
                    <Product products={this.state.products} />
                }
            </Row>
        </Container>
        )
    }
}

export default Details