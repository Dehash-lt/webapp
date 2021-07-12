import React, { Component, useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Col, Container, Form, Nav, Navbar,Toast, OverlayTrigger, Popover, Row, Table, Tooltip, InputGroup, Dropdown, DropdownButton, Accordion, Card } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { Link } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ball, LoadingAnimation } from './Components/LoadingBall/LoadingBall';
import axios from 'axios';

import AOS from 'aos';
import "aos/dist/aos.css";
import { loadavg } from 'os';
import { propTypes } from 'react-bootstrap/esm/Image';

function App() {
  const [page, setPage] = useState(0);

  const handlelocationChange = (e:number)=>{
    if(e!=page)
      setPage(e);
  }

  return (
   <div className="App bg-light">
    <MenuBar callback={handlelocationChange} />
    { page === 0 ?
        <MainPage />
      : page === 1 ?
          <PrivacyPolicy/>
      : <></>
    }
    <Footer/>
   </div>
  )
}

class MainPage extends Component <any,any>{

  constructor(props:any) {
    super(props);
    this.state = {
      isLoading: false,
      results:JSON.parse('{}'),
      count:0,
      toastState:{text:"",show:false},
      dropValue: 'BSC',
      fileContent: ''
    };
  }

  fileReader = new FileReader();

  handleUpload(event:any) {
    let file = event.target.files[0];
    this.fileReader = new FileReader();
    this.fileReader.readAsText(file);
    this.fileReader.onloadend = ()=>{
      const content = (this.fileReader.result)?.toString();
      if(content != null){
        this.setState({fileContent:content})
       // setFileContent(content);
      } 
    };
  }

  postData(data:String,callback:any){
    axios({
      method: 'post',
      url: "https://api.dehash.lt/api.php?json=1",
      headers: {'Content-Type' : 'text/plain'}, 
      data: data,
    })
    .then((response) => {
      this.setState({results:response.data});
      callback();
    }, (error) => {
      if(error.status == 400){
        this.setState({toastState: {text:"Unsupported request format",show:true} });
      }
      else{
        console.log(error.status)
        this.setState({toastState: {text:"Error occured while parsing response",show:true} });

        callback();
      }
    })

  }

  getRequest(target:any){
    axios.get('https://api.dehash.lt/api.php?json=1&search='+target.value)
    .then(result =>{
      if(result.data==="Error"){
        this.setState({results:JSON.parse('{"https:\/\/dehash.lt Error": {"results": ["Unsupported request format"]}}')})
      }
      else{
        this.setState({results:result.data, count:this.state.count + 1});
      }
    })
    .then(()=>{this.setState({isLoading:false})})
    .catch((err:any)=>{
      this.setState({isLoading:false});
      if(err.status == 400 || err.status == 404){
        this.setState({toastState: {text:"Unsupported request format",show:true} });
      }
      else{
        this.setState({toastState:{text:"Unsupported request format",show:true}});
      }

    });
  };


  render(){
    return (
      <div className="App bg-light">
        { this.state.isLoading === true ?
            <LoadingAnimation repeat={'infinite'} animationEnd={()=>{
              this.setState({isLoading:false});
            }} />
          :
          <></>
        }
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
                  this.setState({isLoading:true});
                  event.preventDefault();
                  event.stopPropagation();
                  if(this.state.dropValue === 'BSC'){
                    this.getRequest(event.target.BSC);
                  }
                  else if(this.state.dropValue === 'ADV') {
                    try{
                    this.postData(event.target.ADV.value,(results:any)=>{
                      this.setState({isLoading:false});
                    });
                    }catch{
                      this.setState({toastState:{text:"Error occured while parsing response",show:true}});
                      this.setState({isLoading:false});
                    }
                    
                  }
                  if(this.state.dropValue === 'FUP') {
                    try{
                      if(this.state.fileContent){
                        this.postData(this.state.fileContent,(results:any)=>{
                          this.setState({isLoading:false});
                        });
                      }
                    }catch{
                      this.setState({toastState:{text:"Error occured while parsing response",show:true}});
                      this.setState({isLoading:false});
                    }
                  }
                }
              }
              >
                <Form.Row className="d-flex">
                  <Col xs="auto" className="flex-fill mt-3">
                    <Toast onClose={() =>{this.setState({toastState:{text:"",show:false}});} } show={this.state.toastState.show} delay={3000} autohide>
                      <CustomToast text={this.state.toastState.text}></CustomToast>
                    </Toast>
                    <InputGroup >
                    <DropdownButton
                      variant="outline-secondary"
                      title={this.state.dropValue}
                      id="input-group-dropdown-1"
                      onSelect={(e:any)=>{
                        console.log(e);
                        this.setState({dropValue:(e)});
                      }}
                    >
                      <Dropdown.Item eventKey="BSC">Basic</Dropdown.Item>
                      <Dropdown.Item eventKey="ADV">Advanced</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="FUP">File upload</Dropdown.Item>
                    </DropdownButton>
                    { this.state.dropValue === 'ADV' ?
                      <>
                        <Form.Control className="mx-1 rounded" as="textarea" rows={3} name={'ADV'} placeholder="Email, Hash or Email:Hash" />
                      </>
                    :this.state.dropValue === 'FUP' ?
                      <>
                        <input className="form-control rounded mx-1" 
                          name={'FUP'} 
                          type="file" 
                          id="formFileDisabled" 
                          onChange={this.handleUpload}
                        />
                      </>
                    :
                    <>
                      <Form.Control className="mx-1 rounded" name={'BSC'} placeholder="Email, Hash or Email:Hash" />
                    </>
                  }
                    
                  </InputGroup>
                  <Form.Text className="text-muted">
                  We collect your submited data (IP, User Agent, Query).
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
            {displayResults(this.state.results, this.state.count)}
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
      </div>
    );
  }
}


const MenuBar=({callback}:any)=>{
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
          <Navbar.Brand onClick={()=>callback(0)} href="#home">Dehash.lt</Navbar.Brand>
          <NavbarToggle aria-controls="responsive-navbar-nav"/>
          <NavbarCollapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="mr-auto justify-content-end" >
              <Nav.Link><Link onClick={()=>callback(0)}  to="section" href="#home">Home</Link></Nav.Link>
              <Nav.Link><Link onClick={()=>callback(0)}  to="section1" href="#about">About Us</Link></Nav.Link>
              <Nav.Link><Link onClick={()=>callback(0)}  to="section2" href="#data">Data Sources</Link></Nav.Link>
              <Nav.Link><a onClick={()=> window.open("https://github.com/Dehash-lt/api#dehashlt-api", "_blank")}>API</a></Nav.Link>
              <Nav.Link><Link onClick={()=>callback(1)}
                to="section" href="#policy">Privacy Policy</Link></Nav.Link>
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
      <OverlayTrigger trigger={['hover', 'focus']} placement="auto" show={this.state.isPopoverVisible} delay={{ show: 200, hide: 400 }} overlay={
        <Popover className="overflow-hidden" id="Supported_Types_Popover" style={{maxWidth:'50rem'}} 
          onMouseLeave={()=>{
          this.setState({isPopoverVisible: false})
          }}
        >
          <div className="responsive-popover" style={{ overflow:'scroll'}}>
            <Table striped bordered hover variant="dark" id="popover" className="mb-0" style={{maxWidth:'10rem'}}>
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
                  <tr className=""><td>BCRYPT</td><td>33M</td><td>E.g: $2a$12$...3PG8cvRWd6wZxo2uvzeLIu3NscRMsCe3i7xl1HgnxwxIqe2./a</td></tr>
                  <tr className=""><td>VBULLETIN</td><td>45M</td><td>E.g.: 01707f8ad07045fa34da944f4b4b11e1:560826 OR<br/>01707f8ad07045fa34da944f4b4b11e1</td></tr>
                  <tr className=""><td>         </td><td>    </td><td> </td></tr> 
                  <tr className=""><td>         </td><td>    </td><td> </td></tr>              
              </tbody>
              <thead>
                <tr>
                  <th>Other Types</th><td>Dataset Size</td><th>Explanation</th>
                </tr>
              </thead>
              <tbody>
                  <tr className=""><td>EMAIL</td><td>3.2B</td><td>Email:Password pair lookup.<br/>E.g: example@example.com</td></tr>
                  <tr className=""><td>EMAIL:BCRYPT</td><td>3.2B</td><td>Password Reusal Attack.<br/>E.g: example@example.com:$2a$12$...Z4.I.M.fpaViXoXE3q.F20CCG62mkviJPPeXu1mMgXxbIIGcne</td></tr>
              </tbody>
            </Table>
          </div>
        </Popover>
        }>
        <i className="fas fa-lg fa-info-circle text-muted align-self-center mx-1" 
        onMouseEnter={() =>{
          this.setState({isPopoverVisible: true})
        }}
        onMouseLeave={() =>{
          if (!document.getElementById("popover")?.matches(':hover')) {
            this.setState({isPopoverVisible: false})
          }
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
              <h5 className="mb-5 mt-2">We are Cybersecurity Enthusiasts - Dehash Team</h5>
            </div>
          </Col>
        </Row>
        <Row className="gx-5 justify-content-center">
            <Col className="col-lg-3 col-md-6 mb-5" data-aos={"fade-right"} >
                <div className="card text-center text-decoration-none h-100 lift">
                    <div className="card-body ">
                        <img className={"icon-bubble icon-lg border border-dark border-dashed"} src={process.env.PUBLIC_URL + '/img/Eimantas.jpeg'}></img>
                        <p className={"font-weight-bold small mt-1"}>Eimantas Rebždys</p>
                        <p className={"small mt-1"}>Front-End Engineer</p>
                        <a className="fab fa-linkedin-in mx-1" onClick={()=> window.open("https://lt.linkedin.com/in/eimantas-rebždys-8b130616a", "_blank")}></a>
                        <a className="fab fa-github-square mx-1" onClick={()=> window.open("https://github.com/EimantasRebzdys", "_blank")}></a>
                    </div>
                </div>
            </Col>
            <Col className="col-lg-3 col-md-6 mb-5" data-aos={"fade-left"} data-aos-delay="100">
                <div className="card text-center text-decoration-none h-100 lift">
                    <div className="card-body ">
                        <img className={"icon-bubble icon-lg border border-dark border-dashed"} src={process.env.PUBLIC_URL + '/img/TomasV.jpg'}></img>
                        <p className={"font-weight-bold small mt-1"}>Tomas Vanagas</p>
                        <p className={"small mt-1"}>Back-End Engineer</p>
                        <a className={"fab fa-linkedin-in mx-1"} onClick={()=> window.open("https://lt.linkedin.com/in/tomas-vanagas-147332120", "_blank")}></a>
                        <a className={"fab fa-github-square mx-1"} onClick={()=> window.open("https://github.com/tomasvanagas", "_blank")}></a>
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
    <Container >
      <h1>Data Sources</h1>
      <p>We are using publicly available data from data leaks like Collection #1-5 and wordlists like Crackstation.</p>
      <Row className="mt-5">
        <Col>
          <OverlayTrigger placement="auto" delay={{ show: 200, hide: 400 }} overlay={renderTooltip('Data submited by our users e.g. hashes')}>
            <div className="icon icon-bubble bg-dark" data-aos={"zoom-in-right"}>
              <i className="fas fa-book text-light"></i>
            </div>
          </OverlayTrigger>
          <p>Research</p>
        </Col>
        <Col>
          <OverlayTrigger placement="auto" delay={{ show: 200, hide: 400 }} overlay={renderTooltip('Data Leaks and breaches publicly available on the internet')}>
            <div className="icon icon-bubble bg-dark" data-aos="zoom-in"><i className="fas fa-database text-light"></i></div>
          </OverlayTrigger>
          <p>Data Leaks</p>
        </Col>
        <Col>
          <OverlayTrigger placement="auto" delay={{ show: 200, hide: 400 }} overlay={renderTooltip('Publicly available hashtables and other information from different sources like Crackstation')}>
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
      <>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="var(--gray-transp)" fill-opacity="1" d="M0,224L48,197.3C96,171,192,117,288,122.7C384,128,480,192,576,192C672,192,768,128,864,122.7C960,117,1056,171,1152,176C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1420 193"><path fill="#212529" fill-opacity="1" d="M0,128L60,117.3C120,107,240,85,360,74.7C480,64,600,64,720,85.3C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      <Container fluid className="bg-dark text-white ">
        <Row>
          <Col className="d-inline-flex justify-content-center">
            <p className="mb-0 pb-2">© Tomas & Eimantas<br/>Lithuania, Kaunas</p>
            <i className="fab fa-lg fa-github-square mx-3 text-white align-self-center" onClick={()=> window.open("https://github.com/Dehash-lt", "_blank")} ></i>
          </Col>
        </Row>
      </Container>
      </>
    )
  }
}

const CustomToast = (props:any)=>(
      <>
          <Toast.Header>
            <div className="toastHead" >
              <img
                src="/img/lock.png"
                className="rounded mx-2"
                alt=""
              />
              <strong className="mr-auto">Dehas.lt</strong>
              <small className=" right mx-3">Now</small>
            </div>
          </Toast.Header>
          <Toast.Body>{props.text}</Toast.Body>
      </>
)

const renderTooltip = (props:any) => (
  <Tooltip id="button-tooltip" {...props}>
    {props}
  </Tooltip>
);

const displayResults = (results:any, count:any)=>{
  
  if(Object.keys(results).length !== 0){
    try{
      return(
        <div className="pt-3 text-light border border-light rounded overflow-auto" style={{backgroundColor:"rgba(255, 255, 255, 0.32)"}}>
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

class PrivacyPolicy extends Component <any,any>{

  render(){
    return( 
      <Container fluid className="bg-gray mt-5 pt-5">
        
                          <div className="container px-5 pb-1">

                              <Accordion className="accordion shadow mb-5">
                                <div className="accordion-item">
                                    <div className="d-flex align-items-center text-left px-4 py-5">
                                        <div className="me-3">
                                            <h4 className="mb-0">Privacy Policy</h4>
                                            <p className="card-text text-gray-500">
                                              Last updated: July 11, 2021<br></br>
                                            </p>
                                            <br/>
                                            <p>
                                              This Privacy Policy describes Our policies and procedures on the collection,
                                               use and disclosure of Your information when You use the Service and tells 
                                               You about Your privacy rights and how the law protects You. We use Your Personal data
                                                to provide and improve the Service. By using the Service, You signify that You have read,
                                                 understood, and agreed to the collection and use of information in accordance with
                                                  this Privacy Policy.
                                                 This Privacy Policy applies to our website, httsp://dehash.lt/ and its associated subdomains.
                                            </p>
                                            <small>
                                              This Privacy Policy has been created with the help of the Privacy Policy Generator.</small>
                                        </div>
                                    </div>
                                </div> 
                                <Card className="accordion-item">
                                  <Card.Header className="accordion-header mt-0 ">
                                    <Accordion.Toggle className="text-left w-100" as={Button} variant="white" eventKey="0">
                                      <h5>Collecting Your Personal Data</h5>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                      <Card.Body className="text-left">
                                        <hr/>
                                      <h5>Personal Data</h5>
                                      <p>
                                        While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You.
                                        Personally identifiable information may include, but is not limited to:
                                      </p>
                                      <ul>
                                        <li>Email address</li>
                                        <li>Provided Hash</li>
                                      </ul>
                                      <hr/>
                                      <h5>Usage Data</h5>
                                      <p>
                                        Usage Data is collected automatically when using the Service. Usage Data may include information such as.:
                                        <ul>
                                          <li>Device's Internet Protocol address (e.g. IP address)</li>
                                          <li>Browser type</li>
                                          <li>Browser version</li>
                                          <li>Visited pages (pages of our service) </li>
                                          <li>The time and date of Your visit</li>
                                          <li>unique device identifiers and other diagnostic data</li>
                                        </ul>
                                      </p>
                                      <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to.:
                                      <ul>
                                        <li>The type of mobile device</li>
                                        <li>Mobile device unique ID</li>
                                        <li>IP address of Your mobile device</li>
                                        <li>Operating system</li>
                                        <li>The type of mobile Internet browser</li>
                                        <li>Unique device identifiers and other diagnostic data</li>
                                      </ul>
                                      </p>
                                      <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
                                      <h5>Where and when is information collected from customers and end users?</h5>
                                      <p>We will collect personal information that you submit to us. We may also receive personal information about you from third parties as described above.</p>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </Card.Header>
                                </Card>
                                <Card className="accordion-item">
                                  <Card.Header className="accordion-header mt-0 ">
                                    <Accordion.Toggle className="text-left w-100" as={Button} variant="white" eventKey="1">
                                      <h5>Use of Your Personal Data</h5>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                      <Card.Body className="text-left">
                                        <hr/>
                                      <p>
                                        Any of the information we collect from You may be used for the following purposes:
                                      </p>
                                      <ul>
                                        <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
                                        <li><strong>To improve our service</strong> (We continually strive to improve our service)</li>
                                        <li><strong>To manage Your requests</strong></li>
                                        <li><strong>For other purposes. </strong>We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</li>
                                      </ul>
                                      <p>
                                        We may share Your personal information in the following situations:
                                      </p>
                                      <ul>
                                        <li><strong>With Service Providers.</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</li>
                                        <li>For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                                        <li>With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
                                        <li>With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
                                        <li>With other users: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
                                        <li>With Your consent: We may disclose Your personal information for any other purpose with Your consent.</li>
                                      </ul>
                                      <h5>Could my information be transferred to other countries?</h5>
                                      <p>We are incorporated in Lithuania. Information collected via our website, through direct interactions with you, or from use of our help services may be transferred from time to time to our offices or personnel, or to third parties, located throughout the world, and may be viewed and hosted anywhere in the world, including countries that may not have laws of general applicability regulating the use and transfer of such data. To the fullest extent allowed by applicable law, by using any of the above, you voluntarily consent to the trans- border transfer and hosting of such information.</p>
                                      <h5>Retention of Your Personal Data</h5>
                                      <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.

                                      The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
                                      <h5>Disclosure of Your Personal Data</h5>
                                      <h6><strong>Business Transactions</strong></h6>
                                      If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                                      <br/>
                                      <p><strong>The Company may disclose Your Personal Data in the good faith belief</strong> that such action is necessary to:</p>
                                      <ul>
                                        <li>Comply with a legal obligation</li>
                                        <li>Protect and defend the rights or property of the Company</li>
                                        <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                                        <li>Protect the personal safety of Users of the Service or the public</li>
                                        <li>Protect against legal liability</li>
                                      </ul>
                                      <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data,<strong>We cannot guarantee its absolute security</strong>.</p>

                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </Card.Header>
                                </Card>
                                <Card className="accordion-item">
                                  <Card.Header className="accordion-header mt-0 ">
                                    <Accordion.Toggle className="text-left w-100" as={Button} variant="white" eventKey="2">
                                      <h5>Links to Other Websites</h5>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="2">
                                      <Card.Body className="text-left">
                                     <p>Our Service may contain links to other websites that are not operated by Us.
                                      If You click on a third party link, You will be directed to that third party's site.
                                       We strongly advise You to review the Privacy Policy of every site You visit.
                                       We have no control over and assume no responsibility for the content,
                                        privacy policies or practices of any third party sites or services.</p>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </Card.Header>
                                </Card>
                                <Card className="accordion-item">
                                  <Card.Header className="accordion-header mt-0 ">
                                    <Accordion.Toggle className="text-left w-100" as={Button} variant="white" eventKey="3">
                                      <h5>Changes to this Privacy Policy</h5>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="3">
                                      <Card.Body className="text-left">
                                     <p>We may update Our Privacy Policy from time to time.
                                        We will notify You of any changes by posting the new Privacy Policy on this page.
                                        We will let You know via email and/or a prominent notice on Our Service,
                                         prior to the change becoming effective and update the "Last updated" date at the top
                                         of this Privacy Policy.
                                         You are advised to review this Privacy Policy periodically for any changes.
                                         Changes to this Privacy Policy are effective when they are posted on this page.</p>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </Card.Header>
                                </Card>
                                <div className="mt-4 pb-1"><p>If you have any questions about this Privacy Policy, You can contact us: tomas@dehash.lt</p></div>
                                </Accordion>
                            
                        </div>

      </Container>
      
    )
  }
}


export default App;