import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Col, Container, Form, Nav, Navbar, Overlay, OverlayTrigger, Popover, Row, Table, Tooltip } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { Link } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ball, LoadingAnimation } from './Components/LoadingBall/LoadingBall';
import axios from 'axios';

import AOS from 'aos';
import "aos/dist/aos.css";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState(JSON.parse('{}'));
  const [count, setCount] = useState(0);
  return (
    <div className="App bg-light">
      { isLoading === true ?
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
              <img className="lock" alt="" src={process.env.PUBLIC_URL + '/img/lock_white.png'} />
          </Col>
        </Row>      
      </Container>
      <div className="bg-dark pt-3 overflow-hidden">
        <Row>  
          <div className="width-full">
            <Form onSubmit={
              (event:any) => {
                setLoading(true);
                event.preventDefault();
                event.stopPropagation();
                axios.get('https://api.dehash.lt/api.php?json=1&search='+event.target[0].value)
                  .then(result=>{
                    console.log(result);
                    return(result);
                  })
                  .then(result =>{
                    if(result.data==="Error"){
                      setResults(JSON.parse('{"Error":"Unsupported data format"}'));
                    }
                    else{
                      setResults(result.data);
                      setCount(count + 1);
                    }
                  })
                  .then(()=>setLoading(false));
              }
            }
            >
              <Form.Row className="d-flex">
               
                <Col xs="auto" className="flex-fill">
                  <Form.Label>
                    Hash
                  </Form.Label>
                  <Form.Control type="hash" placeholder="Email, Hash or Email:Hash" />
                  <Form.Text className="text-muted">
                    We may collect your data.
                  </Form.Text>
                </Col>
                <SupportedTypesPopover/>
              </Form.Row>
              <Button className="mt-2" variant="primary" type="submit">
                Search
              </Button>
            </Form>
          </div>
        </Row>
        <Row className="p-5">
          {displayResults(results, count)}
        </Row>
      </div>
      <svg id="section1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#212529" fill-opacity="1" d="M0,224L48,197.3C96,171,192,117,288,101.3C384,85,480,107,576,122.7C672,139,768,149,864,170.7C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      <Container fluid >
        <AboutUs/>
      </Container> 
      <svg id="section2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="var(--gray-transp)" fill-opacity="1" d="M0,160L48,154.7C96,149,192,139,288,128C384,117,480,107,576,117.3C672,128,768,160,864,154.7C960,149,1056,107,1152,80C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      <Container fluid className="bg-gray overflow-hidden">
        <DataSources/>
      </Container>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="var(--gray-transp)" fill-opacity="1" d="M0,224L48,197.3C96,171,192,117,288,122.7C384,128,480,192,576,192C672,192,768,128,864,122.7C960,117,1056,171,1152,176C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1420 193"><path fill="#212529" fill-opacity="1" d="M0,128L60,117.3C120,107,240,85,360,74.7C480,64,600,64,720,85.3C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <Footer/>
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
              <Nav.Link><Link  to="section2" href="#data">Data Sources</Link></Nav.Link>
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

class SupportedTypesPopover extends Component <any, any>{

  constructor(props:any) {
    super(props);
    this.state = { isPopoverVisible: false };
  }
  
  render(){
    return (
      <OverlayTrigger placement="auto" show={this.state.isPopoverVisible} delay={{ show: 200, hide: 400 }} overlay={
        <Popover className="overflow-hidden" id="Supported_Types_Popover" style={{maxWidth:'50rem'}} 
          onMouseLeave={()=>{
          this.setState({isPopoverVisible: false})
          }}
        >
          <div className="responsive-popover" style={{ overflow:'scroll'}}>
            <Table striped bordered hover variant="dark" className="mb-0" style={{maxWidth:'10rem'}}>
              <thead>
                <tr>
                  <th>Supported Types</th><th>Dataset Size</th><th>Example</th>
                </tr>
              </thead>
              <tbody>
                  <tr className=""><td>MD5</td><td>1.7B + 1 external API</td><td>32 symbol hex</td></tr>
                  <tr className=""><td>SHA1</td><td>1.7B</td><td>40 symbol hex</td></tr>
                  <tr className=""><td>SHA256</td><td>1.2B</td><td>64 symbol hex</td></tr>
                  <tr className=""><td>SHA384</td><td>1.2B</td><td>96 symbol hex</td></tr>
                  <tr className=""><td>SHA512</td><td>1.2B</td><td>128 symbol hex</td></tr>
                  <tr className=""><td>BCRYPT</td><td>33M</td><td>Ex: $2a$12$...3PG8cvRWd6wZxo2uvzeLIu3NscRMsCe3i7xl1HgnxwxIqe2./a</td></tr>
                  <tr className=""><td>VBULLETIN</td><td>45M</td><td>Ex: 01707f8ad07045fa34da944f4b4b11e1:560826 OR<br/>01707f8ad07045fa34da944f4b4b11e1</td></tr>
                  <tr className=""><td>         </td><td>    </td><td> </td></tr> 
                  <tr className=""><td>         </td><td>    </td><td> </td></tr>              
              </tbody>
              <thead>
                <tr>
                  <th>Other Types</th><td>Dataset Size</td><th>Explanation</th>
                </tr>
              </thead>
              <tbody>
                  <tr className=""><td>EMAIL</td><td>3.2B</td><td>Email:Password pair lookup.<br/>Ex: example@example.com</td></tr>
                  <tr className=""><td>EMAIL:BCRYPT</td><td>3.2B</td><td>Password Reusal Attack.<br/>Ex: example@example.com:$2a$12$...Z4.I.M.fpaViXoXE3q.F20CCG62mkviJPPeXu1mMgXxbIIGcne</td></tr>
              </tbody>
            </Table>
          </div>
        </Popover>
        }>
        <i className="fas fa-lg fa-info-circle text-muted align-self-center mt-2 mx-1" 
        onMouseEnter={() =>{
          this.setState({isPopoverVisible: true})
        }}
        onClick={
          ()=>{
            if (this.state.isPopoverVisible == true){
              this.setState({isPopoverVisible: false})
            }else{
              this.setState({isPopoverVisible: true})
            }

          }
        }
        ></i>
      </OverlayTrigger>
    );
  }
}

class AboutUs extends Component <any, any>{

  constructor(props:any) {
    super(props);
    this.state = { isPopoverVisible: false };
  }

  componentDidMount() {
    AOS.init({
      duration : 2000
    });
  }

  render(){
    return(
      <section className="overflow-hidden p-5">
        <h1 >About Us</h1>
        <Row className=" gx-5 justify-content-center">
          <Col className="col-lg-6">
            <div className="text-center">
              <h4 className="mb-5">We are BlaBlaBla and doing BlobBlobBlob</h4>
            </div>
          </Col>
        </Row>
        <Row className="gx-5 justify-content-center">
          <p>Dehash Team</p>
            <Col className="col-lg-3 col-md-6 mb-5" data-aos={"fade-right"} >
                <div className="card text-center text-decoration-none h-100 lift">
                    <div className="card-body ">
                        <img className={"icon-bubble icon-lg border border-dark border-dashed"} src={process.env.PUBLIC_URL + '/img/Eimantas.png'}></img>
                        <p className={"font-weight-bold small mt-1"}>Eimantas Rebždys</p>
                        <p className={"small mt-1"}>Manager</p>
                        <a className="fab fa-linkedin-in mx-1"></a>
                        <a className="fab fa-github-square mx-1" onClick={()=> window.open("https://github.com/Dehash-lt", "_blank")}></a>
                        <a className="fab fa-bitcoin mx-1"></a>
                    </div>
                </div>
            </Col>
            <Col className="col-lg-3 col-md-6 mb-5" data-aos={"fade-left"} data-aos-delay="100">
                <div className="card text-center text-decoration-none h-100 lift">
                    <div className="card-body ">
                        <img className={"icon-bubble icon-lg border border-dark border-dashed"} src={process.env.PUBLIC_URL + '/img/Tomas.png'}></img>
                        <p className={"font-weight-bold small mt-1"}>Tomas Vanagas</p>
                        <p className={"small mt-1"}>Super Manager</p>
                        <a className={"fab fa-linkedin-in mx-1"}></a>
                        <a className={"fab fa-github-square mx-1"} onClick={()=> window.open("https://github.com/Dehash-lt", "_blank")}></a>
                        <a className={"fab fa-bitcoin mx-1"}></a>
                    </div>
                </div>
            </Col>
          </Row>
      </section>
    )
  }
}

class DataSources extends Component <any, any>{

  constructor(props:any) {
    super(props);
  }

  componentDidMount() {
    AOS.init({
      duration : 900
    });
  }

render(){
  return(
    <Container>
      <h1>Data Sources</h1>
      <p>Our data have been collected over many years from a variety of sources</p>
      <Row className="mt-5">
        <Col>
          <OverlayTrigger placement="right" delay={{ show: 200, hide: 400 }} overlay={renderTooltip('Data from our reaserch')}>
            <div className="icon icon-bubble bg-dark" data-aos={"zoom-in-right"}>
              <i className="fas fa-book text-light"></i>
            </div>
          </OverlayTrigger>
          <p>Research</p>
        </Col>
        <Col>
          <OverlayTrigger placement="right" delay={{ show: 200, hide: 400 }} overlay={renderTooltip('Data Leaks and breaches published on internet')}>
            <div className="icon icon-bubble bg-dark" data-aos="zoom-in"><i className="fas fa-database text-light"></i></div>
          </OverlayTrigger>
          <p>Data Leaks</p>
        </Col>
        <Col>
          <OverlayTrigger placement="right" delay={{ show: 200, hide: 400 }} overlay={renderTooltip('Publicly available information hashtables and other information from different sources like Crackstation')}>
            <div className="icon icon-bubble bg-dark" data-aos="zoom-in-left"><i className="fas fa-server text-light"></i></div>
          </OverlayTrigger>
          <p>Public information</p>
        </Col>
      </Row>
    </Container>
  )
}

}

class Footer extends Component <any,any>{
  render(){
    return(
      <Container fluid className="bg-dark text-white">
        <Row>
          <Col className="d-inline-flex justify-content-center">
            <p className="mb-0 pb-2">© Tomas & Eimantas<br/>Lithuania, Kaunas</p>
            <i className="fab fa-lg fa-github-square mx-3 text-white align-self-center" onClick={()=> window.open("https://github.com/Dehash-lt", "_blank")} ></i>
          </Col>
        </Row>
      </Container>
    )
  }
}

const renderTooltip = (props:any) => (
  <Tooltip id="button-tooltip" {...props}>
    {props}
  </Tooltip>
);

const displayResults = (results:any, count:any)=>{
  
  if(Object.keys(results).length !== 0){
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
      console.log("Error while parsing. Unable to display")
      console.log(e)
    }
  }
  else{
    if(count !== 0 ){
      return(<> <p style={{color: 'white'}} >No Results</p> </>)
    }
    else{
      return(
        <>
        
        </>
      );
    }
  }
}

export default App;