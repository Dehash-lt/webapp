import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Col, Container, Form, Nav, Navbar, Overlay, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { Link } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ball, LoadingAnimation } from './Components/LoadingBall/LoadingBall';
import axios from 'axios';


function App() {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState(JSON.parse('{}'));
  return (
    <div className="App">

{isLoading === true ?
    <LoadingAnimation repeat={'3'} animationEnd={()=>{
      setLoading(false);
    }} />
  :
  <></>
}

    <MenuBar/>
    <Container id="section" fluid className="pt-5 bg-dark-light ">
      <Row className="mt-5">
        <Col className="d-inline-flex justify-content-center">
            <div className="pr-3 mt-5 pt-5 text-light d-inline-flex">
              <ChangingText/>
            </div>
            <img className="lock" src={process.env.PUBLIC_URL + '/img/lock_white.png'} />
        </Col>
      </Row>      
    </Container>
    <div className="bg-dark pt-3">

      <Row>
      <div className="width-full">
      <Form onSubmit={
        (event:any) => {
          setLoading(true);
          event.preventDefault();
          event.stopPropagation();
          axios.get('https://api.dehash.lt/api.php?search='+event.target[0].value+'&json=1')
            .then(result=>{
              console.log(result);
              return(result)
            })
            .then(result =>{
              if(result.data==="Error"){
                setResults(JSON.parse('{"Error":"Unsupported data format"}'))
              }
              else{
                setResults(result.data)
              }
            })
            .then(()=>setLoading(false));
        }
      }>
        <Form.Group controlId="formHash">
          <Form.Label>Hash</Form.Label>
          <Form.Control type="hash" placeholder="Enter Email, Hash or Email:Hash" />
          <Form.Text className="text-muted">
            We'll never share your data with anyone else ;) .
          </Form.Text>
        </Form.Group>
        <Button className="mt-2" variant="primary" type="submit">
          Search
        </Button>
      </Form>
      </div>
      </Row>
      <Row className="p-5">

      {displayResults(results)}

        </Row>
    
    </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#212529" fill-opacity="1" d="M0,224L48,197.3C96,171,192,117,288,101.3C384,85,480,107,576,122.7C672,139,768,149,864,170.7C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
    
    <Container fluid>
      <h1 id="section1" >About Us</h1>
      <p>We are a group of cyber security enthusiasts. All data was collected and processed from different public data sources</p>
      <h6>Our data sources</h6>
      <Container>
        <Row className="mt-5">
          <Col>
            <OverlayTrigger placement="right" delay={{ show: 200, hide: 400 }} overlay={renderTooltip('Data from our reaserch')}>
              <div className="icon icon-bubble bg-dark">
                <i className="fas fa-book text-light"></i>
              </div>
            </OverlayTrigger>
            <p>Research</p>
          </Col>
          <Col>
            <OverlayTrigger placement="right" delay={{ show: 200, hide: 400 }} overlay={renderTooltip('Data Leaks and breaches published on internet')}>
              <div className="icon icon-bubble bg-dark"><i className="fas fa-database text-light"></i></div>
            </OverlayTrigger>
            <p>Data Leaks</p>
          </Col>
          <Col>
            <OverlayTrigger placement="right" delay={{ show: 200, hide: 400 }} overlay={renderTooltip('Publicly available information hashtables and other information from different sources like Chrackstation')}>
              <div className="icon icon-bubble bg-dark"><i className="fas fa-server text-light"></i></div>
            </OverlayTrigger>
            <p>Public information</p>
          </Col>
        </Row>
      </Container>
    </Container>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="var(--gray-transp)" fill-opacity="1" d="M0,160L48,154.7C96,149,192,139,288,128C384,117,480,107,576,117.3C672,128,768,160,864,154.7C960,149,1056,107,1152,80C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    <Container fluid className="bg-gray">
      <h1 id="section2">Lorem ipsum</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </Container>
    </div>
  );
}

function MenuBar(){
  const [navColor, setNavColor] = useState('light');

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const backgroundcolor = window.scrollY < 60 ? "light" : "light-tr";
      setNavColor(backgroundcolor);
    });
  });

  return (
    <>
      <Navbar fixed="top" className="justify-content-end" bg={navColor} variant="light"expand="lg">
        <Container>
          <Navbar.Brand href="#home">Dehash.lt</Navbar.Brand>
          <NavbarToggle aria-controls="responsive-navbar-nav"/>
          <NavbarCollapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="mr-auto justify-content-end" >
              <Nav.Link><Link  to="section" href="#home">Home</Link></Nav.Link>
              <Nav.Link><Link  to="section1" href="#about">About Us</Link></Nav.Link>
              <Nav.Link><Link  to="section2" href="#about">Advanced De-hashing</Link></Nav.Link>
            </Nav>
            </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  )
}


const wordsArray = ['Hash','Password','Future'];

class ChangingText extends Component <any, any>{
  interval!: NodeJS.Timeout;
  constructor(props:any) {
    super(props);
    this.state = { textIdx: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ textIdx: (1 + this.state.textIdx)%wordsArray.length }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render(){
    return (
      <div className="text">
      <h1>Dehash</h1>
            <span className="words-wrapper">
              <b>{wordsArray[this.state.textIdx%3]}</b>
            </span>
  
    </div>
    );
  }
}

const renderTooltip = (props:any) => (
  <Tooltip id="button-tooltip" {...props}>
    {props}
  </Tooltip>
);

const displayResults = (results:any)=>{
  if(Object.keys(results).length != 0){
    try{
      return(
        <div className="pt-3 text-light border border-light rounded " style={{backgroundColor:"rgba(255, 255, 255, 0.32)"}}>
          <Table striped bordered hover variant="dark">
          {results? ( 
            Object.keys(results).map((key,value)=>{
              return(
                <>
                  <thead>
                    <tr>
                      <th>{key}</th>
                      <th>Results</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results[key]["results"].map((value1:any)=>{
                      console.log(value1)
                      return(<tr className=""><td></td><td>{value1}</td></tr>)
                    })}
                  </tbody>
                </>
              )
            })
            ):(<></>)
          }
          </Table>
        </div>
        )
    }
    catch(e)
    {
      console.log("Error while parsing. Unable to display :(")
      console.log(e)
    }
  }

  else{
    return(<><p>No Results :( </p></>)
  }
}

export default App;