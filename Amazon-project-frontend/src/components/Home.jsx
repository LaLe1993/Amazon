import React, { Component } from "react";
import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import MyCards from "./MyCards"

class Home extends React.Component {

   state = {
      movies: []
   }

  componentDidMount=async()=> {
    let response = await fetch('http://localhost:3002/media')
    
    let data= await response.json()
    console.log('DATA',data)
    // console.log('data',data.Search)
   
   
   
    this.setState({movies:data})
    
    // console.log('state',this.state.transformers)
  }

  render() {

    return (
      <Container fluid className="px-4">
        <Row className="justify-content-between mb-4">
          <Col className="d-flex align-items-center">
            <h2 className="mb-0">TV Shows</h2>
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
            <i className="fa fa-th-large icons mr-2"></i>
            <i className="fa fa-th icons mr-4"></i>
          </div>
      
        </Row>    
       <MyCards movies={this.state.movies}/>   
      </Container>
    );
  }
}

export default Home;