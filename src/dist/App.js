"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
require("./App.css");
var Button_1 = require("react-bootstrap/Button");
var react_bootstrap_1 = require("react-bootstrap");
var NavbarToggle_1 = require("react-bootstrap/esm/NavbarToggle");
var NavbarCollapse_1 = require("react-bootstrap/esm/NavbarCollapse");
var react_scroll_1 = require("react-scroll");
var LoadingBall_1 = require("./Components/LoadingBall/LoadingBall");
var axios_1 = require("axios");
var aos_1 = require("aos");
require("aos/dist/aos.css");
function App() {
    var _a = react_1.useState(false), isLoading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(JSON.parse('{}')), results = _b[0], setResults = _b[1];
    var _c = react_1.useState(0), count = _c[0], setCount = _c[1];
    var _d = react_1.useState({ text: "", show: false }), toastState = _d[0], setToastState = _d[1];
    var _e = react_1.useState('BSC'), dropValue = _e[0], setDropValue = _e[1];
    var _f = react_1.useState(''), fileContent = _f[0], setFileContent = _f[1];
    var fileReader;
    function handleUpload(event) {
        var file = event.target.files[0];
        fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onloadend = function () {
            var _a;
            var content = (_a = (fileReader.result)) === null || _a === void 0 ? void 0 : _a.toString();
            if (content != null) {
                setFileContent(content);
            }
        };
    }
    function postData(data, callback) {
        axios_1["default"]({
            method: 'post',
            url: "https://api.dehash.lt/api.php?json=1",
            headers: { 'Content-Type': 'text/plain' },
            data: data
        })
            .then(function (response) {
            setResults(response.data);
            callback();
        }, function (error) {
            setToastState({ text: "Error occured while parsing response", show: true });
            callback();
        });
    }
    function getRequest(target) {
        axios_1["default"].get('https://api.dehash.lt/api.php?json=1&search=' + target.value)
            .then(function (result) {
            if (result.data === "Error") {
                setResults(JSON.parse('{"https:\/\/dehash.lt Error": {"results": ["Unsupported request format"]}}'));
            }
            else {
                setResults(result.data);
                setCount(count + 1);
            }
        })
            .then(function () { return setLoading(false); })["catch"](function (err) {
            setLoading(false);
            if (err.status == 400 || err.status == 404) {
                setToastState({ text: "Unsupported request format", show: true });
            }
            else {
                setToastState({ text: "Unsupported request format", show: true });
            }
        });
    }
    return (react_1["default"].createElement("div", { className: "App bg-light" },
        isLoading === true ?
            react_1["default"].createElement(LoadingBall_1.LoadingAnimation, { repeat: '3', animationEnd: function () {
                    setLoading(false);
                } })
            :
                react_1["default"].createElement(react_1["default"].Fragment, null),
        react_1["default"].createElement(MenuBar, null),
        react_1["default"].createElement(react_bootstrap_1.Container, { id: "section", fluid: true, className: "pt-5 bg-dark-light " },
            react_1["default"].createElement(react_bootstrap_1.Row, { className: "mt-5" },
                react_1["default"].createElement(react_bootstrap_1.Col, { className: "d-inline-flex justify-content-center" },
                    react_1["default"].createElement("div", { className: "pr-3 mt-5 pt-5 text-light d-inline-flex" },
                        react_1["default"].createElement(ChangingText, null)),
                    react_1["default"].createElement("img", { className: "lock", alt: "", src: process.env.PUBLIC_URL + '/img/lock_white.png' })))),
        react_1["default"].createElement("div", { className: "bg-dark pt-3 overflow-hidden" },
            react_1["default"].createElement(react_bootstrap_1.Row, null,
                react_1["default"].createElement("div", { className: "width-full" },
                    react_1["default"].createElement(react_bootstrap_1.Form, { onSubmit: function (event) {
                            setLoading(true);
                            event.preventDefault();
                            event.stopPropagation();
                            if (dropValue === 'BSC') {
                                getRequest(event.target.BSC);
                            }
                            else if (dropValue === 'ADV') {
                                try {
                                    postData(event.target.ADV.value, function (results) {
                                        setLoading(false);
                                    });
                                }
                                catch (_a) {
                                    setToastState({ text: "Error occured while parsing response", show: true });
                                    setLoading(false);
                                }
                            }
                            if (dropValue === 'FUP') {
                                try {
                                    if (fileContent) {
                                        postData(fileContent, function (results) {
                                            setLoading(false);
                                        });
                                    }
                                }
                                catch (_b) {
                                    setToastState({ text: "Error occured while parsing response", show: true });
                                    setLoading(false);
                                }
                            }
                        } },
                        react_1["default"].createElement(react_bootstrap_1.Form.Row, { className: "d-flex" },
                            react_1["default"].createElement(react_bootstrap_1.Col, { xs: "auto", className: "flex-fill mt-3" },
                                react_1["default"].createElement(react_bootstrap_1.Toast, { onClose: function () { setToastState({ text: "", show: false }); }, show: toastState.show, delay: 3000, autohide: true },
                                    react_1["default"].createElement(CustomToast, { text: toastState.text })),
                                react_1["default"].createElement(react_bootstrap_1.InputGroup, null,
                                    react_1["default"].createElement(react_bootstrap_1.DropdownButton, { variant: "outline-secondary", title: dropValue, id: "input-group-dropdown-1", onSelect: function (e) {
                                            console.log(e);
                                            setDropValue(e);
                                        } },
                                        react_1["default"].createElement(react_bootstrap_1.Dropdown.Item, { eventKey: "BSC" }, "Basic"),
                                        react_1["default"].createElement(react_bootstrap_1.Dropdown.Item, { eventKey: "ADV" }, "Advanced"),
                                        react_1["default"].createElement(react_bootstrap_1.Dropdown.Divider, null),
                                        react_1["default"].createElement(react_bootstrap_1.Dropdown.Item, { eventKey: "FUP" }, "File upload")),
                                    dropValue === 'ADV' ?
                                        react_1["default"].createElement(react_1["default"].Fragment, null,
                                            react_1["default"].createElement(react_bootstrap_1.Form.Control, { className: "mx-1 rounded", as: "textarea", rows: 3, name: 'ADV', placeholder: "Email, Hash or Email:Hash" }))
                                        : dropValue === 'FUP' ?
                                            react_1["default"].createElement(react_1["default"].Fragment, null,
                                                react_1["default"].createElement("input", { className: "form-control rounded mx-1", name: 'FUP', type: "file", id: "formFileDisabled", onChange: handleUpload }))
                                            :
                                                react_1["default"].createElement(react_1["default"].Fragment, null,
                                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { className: "mx-1 rounded", name: 'BSC', placeholder: "Email, Hash or Email:Hash" }))),
                                react_1["default"].createElement(react_bootstrap_1.Form.Text, { className: "text-muted" }, "We collect your submited data (IP, User Agent, Query).")),
                            react_1["default"].createElement(SupportedTypesPopover, null)),
                        react_1["default"].createElement(Button_1["default"], { className: "mt-2", variant: "primary", type: "submit" }, "Search")))),
            react_1["default"].createElement(react_bootstrap_1.Row, { className: "p-5" }, displayResults(results, count))),
        react_1["default"].createElement("svg", { id: "section1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1440 320" },
            react_1["default"].createElement("path", { fill: "#212529", "fill-opacity": "1", d: "M0,224L48,197.3C96,171,192,117,288,101.3C384,85,480,107,576,122.7C672,139,768,149,864,170.7C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" })),
        react_1["default"].createElement(react_bootstrap_1.Container, { fluid: true },
            react_1["default"].createElement(AboutUs, null)),
        react_1["default"].createElement("svg", { id: "section2", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1440 320" },
            react_1["default"].createElement("path", { fill: "var(--gray-transp)", "fill-opacity": "1", d: "M0,160L48,154.7C96,149,192,139,288,128C384,117,480,107,576,117.3C672,128,768,160,864,154.7C960,149,1056,107,1152,80C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" })),
        react_1["default"].createElement(react_bootstrap_1.Container, { fluid: true, className: "bg-gray overflow-hidden" },
            react_1["default"].createElement(DataSources, null)),
        react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1440 320" },
            react_1["default"].createElement("path", { fill: "var(--gray-transp)", "fill-opacity": "1", d: "M0,224L48,197.3C96,171,192,117,288,122.7C384,128,480,192,576,192C672,192,768,128,864,122.7C960,117,1056,171,1152,176C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" })),
        react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1420 193" },
            react_1["default"].createElement("path", { fill: "#212529", "fill-opacity": "1", d: "M0,128L60,117.3C120,107,240,85,360,74.7C480,64,600,64,720,85.3C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" })),
        react_1["default"].createElement(Footer, null)));
}
function MenuBar() {
    var _a = react_1.useState('light'), navColor = _a[0], setNavColor = _a[1];
    react_1.useEffect(function () {
        document.addEventListener("scroll", function () {
            var backgroundcolor = window.scrollY < 60 ? "light" : "light-tr";
            setNavColor(backgroundcolor);
        });
    });
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_bootstrap_1.Navbar, { fixed: "top", className: "justify-content-end", bg: navColor, variant: "light", expand: "lg" },
            react_1["default"].createElement(react_bootstrap_1.Container, null,
                react_1["default"].createElement(react_bootstrap_1.Navbar.Brand, { href: "#home" }, "Dehash.lt"),
                react_1["default"].createElement(NavbarToggle_1["default"], { "aria-controls": "responsive-navbar-nav" }),
                react_1["default"].createElement(NavbarCollapse_1["default"], { id: "responsive-navbar-nav", className: "justify-content-end" },
                    react_1["default"].createElement(react_bootstrap_1.Nav, { className: "mr-auto justify-content-end" },
                        react_1["default"].createElement(react_bootstrap_1.Nav.Link, null,
                            react_1["default"].createElement(react_scroll_1.Link, { to: "section", href: "#home" }, "Home")),
                        react_1["default"].createElement(react_bootstrap_1.Nav.Link, null,
                            react_1["default"].createElement(react_scroll_1.Link, { to: "section1", href: "#about" }, "About Us")),
                        react_1["default"].createElement(react_bootstrap_1.Nav.Link, null,
                            react_1["default"].createElement(react_scroll_1.Link, { to: "section2", href: "#data" }, "Data Sources")),
                        react_1["default"].createElement(react_bootstrap_1.Nav.Link, null,
                            react_1["default"].createElement("a", { onClick: function () { return window.open("https://github.com/Dehash-lt/api#dehashlt-api", "_blank"); } }, "API"))))))));
}
var wordsArray = ['Hash', 'Password', 'Future'];
var ChangingText = /** @class */ (function (_super) {
    __extends(ChangingText, _super);
    function ChangingText(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { textIdx: 0 };
        return _this;
    }
    ChangingText.prototype.componentDidMount = function () {
        var _this = this;
        this.interval = setInterval(function () { return _this.setState({ textIdx: (1 + _this.state.textIdx) % wordsArray.length }); }, 1000);
    };
    ChangingText.prototype.componentWillUnmount = function () {
        clearInterval(this.interval);
    };
    ChangingText.prototype.render = function () {
        return (react_1["default"].createElement("div", { className: "text" },
            react_1["default"].createElement("h1", null, "Dehash"),
            react_1["default"].createElement("span", { className: "words-wrapper" },
                react_1["default"].createElement("b", null, wordsArray[this.state.textIdx % 3]))));
    };
    return ChangingText;
}(react_1.Component));
var SupportedTypesPopover = /** @class */ (function (_super) {
    __extends(SupportedTypesPopover, _super);
    function SupportedTypesPopover(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isPopoverVisible: false };
        return _this;
    }
    SupportedTypesPopover.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_bootstrap_1.OverlayTrigger, { trigger: ['hover', 'focus'], placement: "auto", show: this.state.isPopoverVisible, delay: { show: 200, hide: 400 }, overlay: react_1["default"].createElement(react_bootstrap_1.Popover, { className: "overflow-hidden", id: "Supported_Types_Popover", style: { maxWidth: '50rem' }, onMouseLeave: function () {
                    _this.setState({ isPopoverVisible: false });
                } },
                react_1["default"].createElement("div", { className: "responsive-popover", style: { overflow: 'scroll' } },
                    react_1["default"].createElement(react_bootstrap_1.Table, { striped: true, bordered: true, hover: true, variant: "dark", id: "popover", className: "mb-0", style: { maxWidth: '10rem' } },
                        react_1["default"].createElement("thead", null,
                            react_1["default"].createElement("tr", null,
                                react_1["default"].createElement("th", null, "Supported Types"),
                                react_1["default"].createElement("th", null, "Dataset Size"),
                                react_1["default"].createElement("th", null, "Example"))),
                        react_1["default"].createElement("tbody", null,
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "MD5"),
                                react_1["default"].createElement("td", null, "1.7B + 1 external API"),
                                react_1["default"].createElement("td", null, "32 symbol hex")),
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "SHA1"),
                                react_1["default"].createElement("td", null, "1.7B"),
                                react_1["default"].createElement("td", null, "40 symbol hex")),
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "SHA256"),
                                react_1["default"].createElement("td", null, "1.2B"),
                                react_1["default"].createElement("td", null, "64 symbol hex")),
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "SHA384"),
                                react_1["default"].createElement("td", null, "1.2B"),
                                react_1["default"].createElement("td", null, "96 symbol hex")),
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "SHA512"),
                                react_1["default"].createElement("td", null, "1.2B"),
                                react_1["default"].createElement("td", null, "128 symbol hex")),
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "BCRYPT"),
                                react_1["default"].createElement("td", null, "33M"),
                                react_1["default"].createElement("td", null, "E.g: $2a$12$...3PG8cvRWd6wZxo2uvzeLIu3NscRMsCe3i7xl1HgnxwxIqe2./a")),
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "VBULLETIN"),
                                react_1["default"].createElement("td", null, "45M"),
                                react_1["default"].createElement("td", null,
                                    "E.g.: 01707f8ad07045fa34da944f4b4b11e1:560826 OR",
                                    react_1["default"].createElement("br", null),
                                    "01707f8ad07045fa34da944f4b4b11e1")),
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "         "),
                                react_1["default"].createElement("td", null, "    "),
                                react_1["default"].createElement("td", null, " ")),
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "         "),
                                react_1["default"].createElement("td", null, "    "),
                                react_1["default"].createElement("td", null, " "))),
                        react_1["default"].createElement("thead", null,
                            react_1["default"].createElement("tr", null,
                                react_1["default"].createElement("th", null, "Other Types"),
                                react_1["default"].createElement("td", null, "Dataset Size"),
                                react_1["default"].createElement("th", null, "Explanation"))),
                        react_1["default"].createElement("tbody", null,
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "EMAIL"),
                                react_1["default"].createElement("td", null, "3.2B"),
                                react_1["default"].createElement("td", null,
                                    "Email:Password pair lookup.",
                                    react_1["default"].createElement("br", null),
                                    "E.g: example@example.com")),
                            react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null, "EMAIL:BCRYPT"),
                                react_1["default"].createElement("td", null, "3.2B"),
                                react_1["default"].createElement("td", null,
                                    "Password Reusal Attack.",
                                    react_1["default"].createElement("br", null),
                                    "E.g: example@example.com:$2a$12$...Z4.I.M.fpaViXoXE3q.F20CCG62mkviJPPeXu1mMgXxbIIGcne")))))) },
            react_1["default"].createElement("i", { className: "fas fa-lg fa-info-circle text-muted align-self-center mx-1", onMouseEnter: function () {
                    _this.setState({ isPopoverVisible: true });
                }, onMouseLeave: function () {
                    var _a;
                    if (!((_a = document.getElementById("popover")) === null || _a === void 0 ? void 0 : _a.matches(':hover'))) {
                        _this.setState({ isPopoverVisible: false });
                    }
                }, onClick: function () {
                    if (_this.state.isPopoverVisible == true) {
                        _this.setState({ isPopoverVisible: false });
                    }
                    else {
                        _this.setState({ isPopoverVisible: true });
                    }
                } })));
    };
    return SupportedTypesPopover;
}(react_1.Component));
var AboutUs = /** @class */ (function (_super) {
    __extends(AboutUs, _super);
    function AboutUs(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isPopoverVisible: false };
        return _this;
    }
    AboutUs.prototype.componentDidMount = function () {
        aos_1["default"].init({
            duration: 2000
        });
    };
    AboutUs.prototype.render = function () {
        return (react_1["default"].createElement("section", { className: "overflow-hidden p-5" },
            react_1["default"].createElement("h1", null, "About Us"),
            react_1["default"].createElement(react_bootstrap_1.Row, { className: " gx-5 justify-content-center" },
                react_1["default"].createElement(react_bootstrap_1.Col, { className: "col-lg-6" },
                    react_1["default"].createElement("div", { className: "text-center" },
                        react_1["default"].createElement("h5", { className: "mb-5 mt-2" }, "We are Cybersecurity Enthusiasts - Dehash Team")))),
            react_1["default"].createElement(react_bootstrap_1.Row, { className: "gx-5 justify-content-center" },
                react_1["default"].createElement(react_bootstrap_1.Col, { className: "col-lg-3 col-md-6 mb-5", "data-aos": "fade-right" },
                    react_1["default"].createElement("div", { className: "card text-center text-decoration-none h-100 lift" },
                        react_1["default"].createElement("div", { className: "card-body " },
                            react_1["default"].createElement("img", { className: "icon-bubble icon-lg border border-dark border-dashed", src: process.env.PUBLIC_URL + '/img/Eimantas.jpeg' }),
                            react_1["default"].createElement("p", { className: "font-weight-bold small mt-1" }, "Eimantas Reb\u017Edys"),
                            react_1["default"].createElement("p", { className: "small mt-1" }, "Front-End Engineer"),
                            react_1["default"].createElement("a", { className: "fab fa-linkedin-in mx-1", onClick: function () { return window.open("https://lt.linkedin.com/in/eimantas-rebždys-8b130616a", "_blank"); } }),
                            react_1["default"].createElement("a", { className: "fab fa-github-square mx-1", onClick: function () { return window.open("https://github.com/EimantasRebzdys", "_blank"); } })))),
                react_1["default"].createElement(react_bootstrap_1.Col, { className: "col-lg-3 col-md-6 mb-5", "data-aos": "fade-left", "data-aos-delay": "100" },
                    react_1["default"].createElement("div", { className: "card text-center text-decoration-none h-100 lift" },
                        react_1["default"].createElement("div", { className: "card-body " },
                            react_1["default"].createElement("img", { className: "icon-bubble icon-lg border border-dark border-dashed", src: process.env.PUBLIC_URL + '/img/TomasV.jpg' }),
                            react_1["default"].createElement("p", { className: "font-weight-bold small mt-1" }, "Tomas Vanagas"),
                            react_1["default"].createElement("p", { className: "small mt-1" }, "Back-End Engineer"),
                            react_1["default"].createElement("a", { className: "fab fa-linkedin-in mx-1", onClick: function () { return window.open("https://lt.linkedin.com/in/tomas-vanagas-147332120", "_blank"); } }),
                            react_1["default"].createElement("a", { className: "fab fa-github-square mx-1", onClick: function () { return window.open("https://github.com/tomasvanagas", "_blank"); } })))))));
    };
    return AboutUs;
}(react_1.Component));
var DataSources = /** @class */ (function (_super) {
    __extends(DataSources, _super);
    function DataSources(props) {
        return _super.call(this, props) || this;
    }
    DataSources.prototype.componentDidMount = function () {
        aos_1["default"].init({
            duration: 900
        });
    };
    DataSources.prototype.render = function () {
        return (react_1["default"].createElement(react_bootstrap_1.Container, null,
            react_1["default"].createElement("h1", null, "Data Sources"),
            react_1["default"].createElement("p", null, "We are using publicly available data from data leaks like Collection #1-5 and wordlists like Crackstation."),
            react_1["default"].createElement(react_bootstrap_1.Row, { className: "mt-5" },
                react_1["default"].createElement(react_bootstrap_1.Col, null,
                    react_1["default"].createElement(react_bootstrap_1.OverlayTrigger, { placement: "auto", delay: { show: 200, hide: 400 }, overlay: renderTooltip('Data submited by our users e.g. hashes') },
                        react_1["default"].createElement("div", { className: "icon icon-bubble bg-dark", "data-aos": "zoom-in-right" },
                            react_1["default"].createElement("i", { className: "fas fa-book text-light" }))),
                    react_1["default"].createElement("p", null, "Research")),
                react_1["default"].createElement(react_bootstrap_1.Col, null,
                    react_1["default"].createElement(react_bootstrap_1.OverlayTrigger, { placement: "auto", delay: { show: 200, hide: 400 }, overlay: renderTooltip('Data Leaks and breaches publicly available on the internet') },
                        react_1["default"].createElement("div", { className: "icon icon-bubble bg-dark", "data-aos": "zoom-in" },
                            react_1["default"].createElement("i", { className: "fas fa-database text-light" }))),
                    react_1["default"].createElement("p", null, "Data Leaks")),
                react_1["default"].createElement(react_bootstrap_1.Col, null,
                    react_1["default"].createElement(react_bootstrap_1.OverlayTrigger, { placement: "auto", delay: { show: 200, hide: 400 }, overlay: renderTooltip('Publicly available hashtables and other information from different sources like Crackstation') },
                        react_1["default"].createElement("div", { className: "icon icon-bubble bg-dark", "data-aos": "zoom-in-left" },
                            react_1["default"].createElement("i", { className: "fas fa-server text-light" }))),
                    react_1["default"].createElement("p", null, "Public information")))));
    };
    return DataSources;
}(react_1.Component));
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        return (react_1["default"].createElement(react_bootstrap_1.Container, { fluid: true, className: "bg-dark text-white " },
            react_1["default"].createElement(react_bootstrap_1.Row, null,
                react_1["default"].createElement(react_bootstrap_1.Col, { className: "d-inline-flex justify-content-center" },
                    react_1["default"].createElement("p", { className: "mb-0 pb-2" },
                        "\u00A9 Tomas & Eimantas",
                        react_1["default"].createElement("br", null),
                        "Lithuania, Kaunas"),
                    react_1["default"].createElement("i", { className: "fab fa-lg fa-github-square mx-3 text-white align-self-center", onClick: function () { return window.open("https://github.com/Dehash-lt", "_blank"); } })))));
    };
    return Footer;
}(react_1.Component));
var CustomToast = function (props) { return (react_1["default"].createElement(react_1["default"].Fragment, null,
    react_1["default"].createElement(react_bootstrap_1.Toast.Header, null,
        react_1["default"].createElement("div", { className: "toastHead" },
            react_1["default"].createElement("img", { src: "/img/lock.png", className: "rounded mx-2", alt: "" }),
            react_1["default"].createElement("strong", { className: "mr-auto" }, "Dehas.lt"),
            react_1["default"].createElement("small", { className: " right mx-3" }, "Now"))),
    react_1["default"].createElement(react_bootstrap_1.Toast.Body, null, props.text))); };
var renderTooltip = function (props) { return (react_1["default"].createElement(react_bootstrap_1.Tooltip, __assign({ id: "button-tooltip" }, props), props)); };
var displayResults = function (results, count) {
    if (Object.keys(results).length !== 0) {
        try {
            return (react_1["default"].createElement("div", { className: "pt-3 text-light border border-light rounded overflow-auto", style: { backgroundColor: "rgba(255, 255, 255, 0.32)" } },
                react_1["default"].createElement(react_bootstrap_1.Table, { striped: true, bordered: true, hover: true, variant: "dark" }, results ? (Object.keys(results).map(function (key, value) {
                    return (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("thead", null,
                            react_1["default"].createElement("tr", null,
                                react_1["default"].createElement("th", null, key),
                                react_1["default"].createElement("th", null, "Results"))),
                        react_1["default"].createElement("tbody", null, results[key]["results"].map(function (value1) {
                            return (react_1["default"].createElement("tr", { className: "" },
                                react_1["default"].createElement("td", null),
                                react_1["default"].createElement("td", null, value1)));
                        }))));
                })) : (react_1["default"].createElement(react_1["default"].Fragment, null)))));
        }
        catch (e) {
            console.log("Error while parsing. Unable to display");
            console.log(e);
        }
    }
    else {
        if (count !== 0) {
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                " ",
                react_1["default"].createElement("p", { style: { color: 'white' } }, "No Results"),
                " "));
        }
        else {
            return (react_1["default"].createElement(react_1["default"].Fragment, null));
        }
    }
};
exports["default"] = App;
