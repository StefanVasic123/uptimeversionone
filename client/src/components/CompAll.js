import React, { Component } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import Comp from './Comp';
import Chart from './Chart';
import ChartSecond from './ChartSecond';
import ChartR from './ChartR';
import ChartR2 from './ChartR2';
import './CompAllStyle.css';
import { Container, Form, FormControl, InputGroup, ButtonToolbar, Button, Navbar, Nav } from 'react-bootstrap';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import axios from 'axios';

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];

class CompAll extends Component {
    static defaultProps = {
        cols: 12,
        rowHeight: 40,
        onLayoutChange: function() {},
        verticalCompact: false,
        isResizable: false
    }
    constructor(props) {
        super(props);
        
        this.state = {
            e: "",
            eSecond: "",
            eDay: "",
            eDaySecond: "",
            mainNav: true,
            chartNav: false,
            reportsNav: false,
            reservationNav: false,
            workPanelNav: false,
            adminNav: false,
            howItWorksNav: false,
            dailyReportState: "",
            shifts: [],
            erase: "",
            close: "",
            reserveComp: "",
            reserveTime: "",
            firstShiftStart: "",
            firstShiftEnd: "",
            secondShiftStart: "",
            secondShiftEnd: "",
            thirdShiftStart: "",
            thirdShiftEnd: "",
            hourPrice: "",
            hourPriceSecond: "",
            reserveCompRemove: "",
            reserveTimeRemove: "",
            promoUse: "",
            promoHours: "",
            layout: JSON.parse(JSON.stringify(originalLayout)),
            draggable: false,
            compNmb: "",
            compNmbSec: "",
            fromDB: ""
        }

    this.indexed = this.indexed.bind(this);

    this.handleChange = (event) => {
            this.setState({
                e: event.target.value
            })
    }
    this.handleChangeSecondSet = (event) => {
        this.setState({
            eSecond: event.target.value
        })
    }
    this.handleChangeDayPrice = (event) => {
            this.setState({
                eDay: event.target.value
            })
    }
    this.handleChangeDayPriceSecondSet = (event) => {
        this.setState({
            eDaySecond: event.target.value
        })
    }
    this.handleChangeClose = (event) => {
        this.setState({
            close: event.target.value
        })
    }
    this.handleChangeErase = (event) => {
        this.setState({
            erase: event.target.value
        })
    }
    this.handleChangeReserveComp = (event) => {
        this.setState({
            reserveComp: event.target.value
        })
    }
    this.handleChangeReserveTime = (event) => {
        this.setState({
            reserveTime: event.target.value
        })
    }
    this.handleChangeReserveCompRemove = (event) => {
        this.setState({
            reserveCompRemove: event.target.value
        })
    }
    this.handleChangeReserveTimeRemove = (event) => {
        this.setState({
            reserveTimeRemove: event.target.value
        })
    }
    this.handleChangePromoUse = (event) => {
        this.setState({
            promoUse: event.target.value
        })
    }
    this.handleChangePromoHours = (event) => {
        this.setState({
            promoHours: event.target.value
        })
    }
    this.toggleNmbOfComp = (event) => {
        this.setState({
            compNmb: event.target.value
        })
    }
    this.toggleNmbOfCompSec = (event) => {
        this.setState({
            compNmbSec: event.target.value
        })
    }
    this.axiosGet = () => { //when first log in, executes and change interface to real-time

        axios 
            .get('/api/items')
            .then(res => {    
            
           console.log(res.data.map(item => item.items).filter(item => item !== undefined).forEach(el => el));
            const go = res.data.map(item => item.items).filter(item => item !== undefined);
            JSON.parse(go).forEach(el => localStorage.setItem(el[0], el[1]));        
            })
            
    }
 /*   this.axiosPost = () => { // send document of localStorage data to database (document) (set on one hour!) for restoring data
        const newItem = {
            name: "track",
            items: JSON.stringify(Object.entries(localStorage).map(item => item).filter(item => item !== undefined))
        }
        axios.post('http://localhost:5000/api/items', newItem)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
           .catch(err => console.log(err))
        } 
        */
    this.axiosUpdate = () => { 
            axios.put('http://localhost:5000/api/items/update', 
        
                { 'items': JSON.stringify(Object.entries(localStorage).map(item => item).filter(item => item !== undefined)) }
            )
            .then(res => console.log(res));         
  };
    this.axiosDelete = () => {
    /*    axios.delete('http://localhost:5000/api/items')
            .then(res => console.log(res._id))
*/
    }
        
    const hourPrice = localStorage.getItem("hourPrice");
    const hourPriceSecond = localStorage.getItem("hourPriceSecond");

    const comp1 = localStorage.getItem(1) !== null ? localStorage.getItem(1).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp2 = localStorage.getItem(2) !== null ? localStorage.getItem(2).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp3 = localStorage.getItem(3) !== null ? localStorage.getItem(3).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp4 = localStorage.getItem(4) !== null ? localStorage.getItem(4).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp5 = localStorage.getItem(5) !== null ? localStorage.getItem(5).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp6 = localStorage.getItem(6) !== null ? localStorage.getItem(6).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp7 = localStorage.getItem(7) !== null ? localStorage.getItem(7).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp8 = localStorage.getItem(8) !== null ? localStorage.getItem(8).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp9 = localStorage.getItem(9) !== null ? localStorage.getItem(9).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp10 = localStorage.getItem(10) !== null ? localStorage.getItem(10).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp11 = localStorage.getItem(11) !== null ? localStorage.getItem(11).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp12 = localStorage.getItem(12) !== null ? localStorage.getItem(12).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp13 = localStorage.getItem(13) !== null ? localStorage.getItem(13).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp14 = localStorage.getItem(14) !== null ? localStorage.getItem(14).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp15 = localStorage.getItem(15) !== null ? localStorage.getItem(15).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp16 = localStorage.getItem(16) !== null ? localStorage.getItem(16).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp17 = localStorage.getItem(17) !== null ? localStorage.getItem(17).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp18 = localStorage.getItem(18) !== null ? localStorage.getItem(18).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp19 = localStorage.getItem(19) !== null ? localStorage.getItem(19).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp20 = localStorage.getItem(20) !== null ? localStorage.getItem(20).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp21 = localStorage.getItem(21) !== null ? localStorage.getItem(21).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp22 = localStorage.getItem(22) !== null ? localStorage.getItem(22).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp23 = localStorage.getItem(23) !== null ? localStorage.getItem(23).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp24 = localStorage.getItem(24) !== null ? localStorage.getItem(24).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp25 = localStorage.getItem(25) !== null ? localStorage.getItem(25).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp26 = localStorage.getItem(26) !== null ? localStorage.getItem(26).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp27 = localStorage.getItem(27) !== null ? localStorage.getItem(27).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp28 = localStorage.getItem(28) !== null ? localStorage.getItem(28).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp29 = localStorage.getItem(29) !== null ? localStorage.getItem(29).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp30 = localStorage.getItem(30) !== null ? localStorage.getItem(30).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp31 = localStorage.getItem(31) !== null ? localStorage.getItem(31).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp32 = localStorage.getItem(32) !== null ? localStorage.getItem(32).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp33 = localStorage.getItem(33) !== null ? localStorage.getItem(33).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp34 = localStorage.getItem(34) !== null ? localStorage.getItem(34).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp35 = localStorage.getItem(35) !== null ? localStorage.getItem(35).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp36 = localStorage.getItem(36) !== null ? localStorage.getItem(36).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp37 = localStorage.getItem(37) !== null ? localStorage.getItem(37).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp38 = localStorage.getItem(38) !== null ? localStorage.getItem(38).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp39 = localStorage.getItem(39) !== null ? localStorage.getItem(39).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp40 = localStorage.getItem(40) !== null ? localStorage.getItem(40).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp41 = localStorage.getItem(41) !== null ? localStorage.getItem(41).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp42 = localStorage.getItem(42) !== null ? localStorage.getItem(42).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp43 = localStorage.getItem(43) !== null ? localStorage.getItem(43).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp44 = localStorage.getItem(44) !== null ? localStorage.getItem(44).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp45 = localStorage.getItem(45) !== null ? localStorage.getItem(45).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp46 = localStorage.getItem(46) !== null ? localStorage.getItem(46).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp47 = localStorage.getItem(47) !== null ? localStorage.getItem(47).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp48 = localStorage.getItem(48) !== null ? localStorage.getItem(48).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp49 = localStorage.getItem(49) !== null ? localStorage.getItem(49).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp50 = localStorage.getItem(50) !== null ? localStorage.getItem(50).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp1firstShift = localStorage.getItem(1 + "firstShift") !== null ? localStorage.getItem(1 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp1secondShift = localStorage.getItem(1 + "secondShift") !== null ? localStorage.getItem(1 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp1thirdShift = localStorage.getItem(1 + "thirdShift") !== null ? localStorage.getItem(1 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp2firstShift = localStorage.getItem(2 + "firstShift") !== null ? localStorage.getItem(2 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp2secondShift = localStorage.getItem(2 + "secondShift") !== null ? localStorage.getItem(2 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp2thirdShift = localStorage.getItem(2 + "thirdShift") !== null ? localStorage.getItem(2 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp3firstShift = localStorage.getItem(3 + "firstShift") !== null ? localStorage.getItem(3 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp3secondShift = localStorage.getItem(3 + "secondShift") !== null ? localStorage.getItem(3 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp3thirdShift = localStorage.getItem(3 + "thirdShift") !== null ? localStorage.getItem(3 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp4firstShift = localStorage.getItem(4 + "firstShift") !== null ? localStorage.getItem(4 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp4secondShift = localStorage.getItem(4 + "secondShift") !== null ? localStorage.getItem(4 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp4thirdShift = localStorage.getItem(4 + "thirdShift") !== null ? localStorage.getItem(4 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp5firstShift = localStorage.getItem(5 + "firstShift") !== null ? localStorage.getItem(5 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp5secondShift = localStorage.getItem(5 + "secondShift") !== null ? localStorage.getItem(5 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp5thirdShift = localStorage.getItem(5 + "thirdShift") !== null ? localStorage.getItem(5 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp6firstShift = localStorage.getItem(6 + "firstShift") !== null ? localStorage.getItem(6 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp6secondShift = localStorage.getItem(6 + "secondShift") !== null ? localStorage.getItem(6 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp6thirdShift = localStorage.getItem(6 + "thirdShift") !== null ? localStorage.getItem(6 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp7firstShift = localStorage.getItem(7 + "firstShift") !== null ? localStorage.getItem(7 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp7secondShift = localStorage.getItem(7 + "secondShift") !== null ? localStorage.getItem(7 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp7thirdShift = localStorage.getItem(7 + "thirdShift") !== null ? localStorage.getItem(7 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp8firstShift = localStorage.getItem(8 + "firstShift") !== null ? localStorage.getItem(8 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp8secondShift = localStorage.getItem(8 + "secondShift") !== null ? localStorage.getItem(8 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp8thirdShift = localStorage.getItem(8 + "thirdShift") !== null ? localStorage.getItem(8 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp9firstShift = localStorage.getItem(9 + "firstShift") !== null ? localStorage.getItem(9 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp9secondShift = localStorage.getItem(9 + "secondShift") !== null ? localStorage.getItem(9 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp9thirdShift = localStorage.getItem(9 + "thirdShift") !== null ? localStorage.getItem(9 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp10firstShift = localStorage.getItem(10 + "firstShift") !== null ? localStorage.getItem(10 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp10secondShift = localStorage.getItem(10 + "secondShift") !== null ? localStorage.getItem(10 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp10thirdShift = localStorage.getItem(10 + "thirdShift") !== null ? localStorage.getItem(10 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp11firstShift = localStorage.getItem(11 + "firstShift") !== null ? localStorage.getItem(11 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp11secondShift = localStorage.getItem(11 + "secondShift") !== null ? localStorage.getItem(11 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp11thirdShift = localStorage.getItem(11 + "thirdShift") !== null ? localStorage.getItem(11 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp12firstShift = localStorage.getItem(12 + "firstShift") !== null ? localStorage.getItem(12 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp12secondShift = localStorage.getItem(12 + "secondShift") !== null ? localStorage.getItem(12 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp12thirdShift = localStorage.getItem(12 + "thirdShift") !== null ? localStorage.getItem(12 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp13firstShift = localStorage.getItem(13 + "firstShift") !== null ? localStorage.getItem(13 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp13secondShift = localStorage.getItem(13 + "secondShift") !== null ? localStorage.getItem(13 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp13thirdShift = localStorage.getItem(13 + "thirdShift") !== null ? localStorage.getItem(13 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp14firstShift = localStorage.getItem(14 + "firstShift") !== null ? localStorage.getItem(14 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp14secondShift = localStorage.getItem(14 + "secondShift") !== null ? localStorage.getItem(14 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp14thirdShift = localStorage.getItem(14 + "thirdShift") !== null ? localStorage.getItem(14 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp15firstShift = localStorage.getItem(15 + "firstShift") !== null ? localStorage.getItem(15 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp15secondShift = localStorage.getItem(15 + "secondShift") !== null ? localStorage.getItem(15 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp15thirdShift = localStorage.getItem(15 + "thirdShift") !== null ? localStorage.getItem(15 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp16firstShift = localStorage.getItem(16 + "firstShift") !== null ? localStorage.getItem(16 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp16secondShift = localStorage.getItem(16 + "secondShift") !== null ? localStorage.getItem(16 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp16thirdShift = localStorage.getItem(16 + "thirdShift") !== null ? localStorage.getItem(16 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp17firstShift = localStorage.getItem(17 + "firstShift") !== null ? localStorage.getItem(17 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp17secondShift = localStorage.getItem(17 + "secondShift") !== null ? localStorage.getItem(17 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp17thirdShift = localStorage.getItem(17 + "thirdShift") !== null ? localStorage.getItem(17 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp18firstShift = localStorage.getItem(18 + "firstShift") !== null ? localStorage.getItem(18 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp18secondShift = localStorage.getItem(18 + "secondShift") !== null ? localStorage.getItem(18 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp18thirdShift = localStorage.getItem(18 + "thirdShift") !== null ? localStorage.getItem(18 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp19firstShift = localStorage.getItem(19 + "firstShift") !== null ? localStorage.getItem(19 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp19secondShift = localStorage.getItem(19 + "secondShift") !== null ? localStorage.getItem(19 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp19thirdShift = localStorage.getItem(19 + "thirdShift") !== null ? localStorage.getItem(19 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp20firstShift = localStorage.getItem(20 + "firstShift") !== null ? localStorage.getItem(20 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp20secondShift = localStorage.getItem(20 + "secondShift") !== null ? localStorage.getItem(20 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp20thirdShift = localStorage.getItem(20 + "thirdShift") !== null ? localStorage.getItem(20 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    
    const comp21firstShift = localStorage.getItem(21 + "firstShift") !== null ? localStorage.getItem(21 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp21secondShift = localStorage.getItem(21 + "secondShift") !== null ? localStorage.getItem(21 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp21thirdShift = localStorage.getItem(21 + "thirdShift") !== null ? localStorage.getItem(21 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp22firstShift = localStorage.getItem(22 + "firstShift") !== null ? localStorage.getItem(22 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp22secondShift = localStorage.getItem(22 + "secondShift") !== null ? localStorage.getItem(22 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp22thirdShift = localStorage.getItem(22 + "thirdShift") !== null ? localStorage.getItem(22 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp23firstShift = localStorage.getItem(23 + "firstShift") !== null ? localStorage.getItem(23 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp23secondShift = localStorage.getItem(23 + "secondShift") !== null ? localStorage.getItem(23 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp23thirdShift = localStorage.getItem(23 + "thirdShift") !== null ? localStorage.getItem(23 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp24firstShift = localStorage.getItem(24 + "firstShift") !== null ? localStorage.getItem(24 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp24secondShift = localStorage.getItem(24 + "secondShift") !== null ? localStorage.getItem(24 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp24thirdShift = localStorage.getItem(24 + "thirdShift") !== null ? localStorage.getItem(24 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp25firstShift = localStorage.getItem(25 + "firstShift") !== null ? localStorage.getItem(25 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp25secondShift = localStorage.getItem(25 + "secondShift") !== null ? localStorage.getItem(25 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp25thirdShift = localStorage.getItem(25 + "thirdShift") !== null ? localStorage.getItem(25 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp26firstShift = localStorage.getItem(26 + "firstShift") !== null ? localStorage.getItem(26 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp26secondShift = localStorage.getItem(26 + "secondShift") !== null ? localStorage.getItem(26 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp26thirdShift = localStorage.getItem(26 + "thirdShift") !== null ? localStorage.getItem(26 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp27firstShift = localStorage.getItem(27 + "firstShift") !== null ? localStorage.getItem(27 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp27secondShift = localStorage.getItem(27 + "secondShift") !== null ? localStorage.getItem(27 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp27thirdShift = localStorage.getItem(27 + "thirdShift") !== null ? localStorage.getItem(27 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp28firstShift = localStorage.getItem(28 + "firstShift") !== null ? localStorage.getItem(28 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp28secondShift = localStorage.getItem(28 + "secondShift") !== null ? localStorage.getItem(28 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp28thirdShift = localStorage.getItem(28 + "thirdShift") !== null ? localStorage.getItem(28 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp29firstShift = localStorage.getItem(29 + "firstShift") !== null ? localStorage.getItem(29 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp29secondShift = localStorage.getItem(29 + "secondShift") !== null ? localStorage.getItem(29 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp29thirdShift = localStorage.getItem(29 + "thirdShift") !== null ? localStorage.getItem(29 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp30firstShift = localStorage.getItem(30 + "firstShift") !== null ? localStorage.getItem(30 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp30secondShift = localStorage.getItem(30 + "secondShift") !== null ? localStorage.getItem(30 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp30thirdShift = localStorage.getItem(30 + "thirdShift") !== null ? localStorage.getItem(30 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp31firstShift = localStorage.getItem(31 + "firstShift") !== null ? localStorage.getItem(31 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp31secondShift = localStorage.getItem(31 + "secondShift") !== null ? localStorage.getItem(31 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp31thirdShift = localStorage.getItem(31 + "thirdShift") !== null ? localStorage.getItem(31 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp32firstShift = localStorage.getItem(32 + "firstShift") !== null ? localStorage.getItem(32 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp32secondShift = localStorage.getItem(32 + "secondShift") !== null ? localStorage.getItem(32 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp32thirdShift = localStorage.getItem(32 + "thirdShift") !== null ? localStorage.getItem(32 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp33firstShift = localStorage.getItem(33 + "firstShift") !== null ? localStorage.getItem(33 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp33secondShift = localStorage.getItem(33 + "secondShift") !== null ? localStorage.getItem(33 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp33thirdShift = localStorage.getItem(33 + "thirdShift") !== null ? localStorage.getItem(33 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp34firstShift = localStorage.getItem(34 + "firstShift") !== null ? localStorage.getItem(34 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp34secondShift = localStorage.getItem(34 + "secondShift") !== null ? localStorage.getItem(34 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp34thirdShift = localStorage.getItem(34 + "thirdShift") !== null ? localStorage.getItem(34 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp35firstShift = localStorage.getItem(35 + "firstShift") !== null ? localStorage.getItem(35 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp35secondShift = localStorage.getItem(35 + "secondShift") !== null ? localStorage.getItem(35 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp35thirdShift = localStorage.getItem(35 + "thirdShift") !== null ? localStorage.getItem(35 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp36firstShift = localStorage.getItem(36 + "firstShift") !== null ? localStorage.getItem(36 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp36secondShift = localStorage.getItem(36 + "secondShift") !== null ? localStorage.getItem(36 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp36thirdShift = localStorage.getItem(36 + "thirdShift") !== null ? localStorage.getItem(36 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp37firstShift = localStorage.getItem(37 + "firstShift") !== null ? localStorage.getItem(37 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp37secondShift = localStorage.getItem(37 + "secondShift") !== null ? localStorage.getItem(37 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp37thirdShift = localStorage.getItem(37 + "thirdShift") !== null ? localStorage.getItem(37 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp38firstShift = localStorage.getItem(38 + "firstShift") !== null ? localStorage.getItem(38 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp38secondShift = localStorage.getItem(38 + "secondShift") !== null ? localStorage.getItem(38 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp38thirdShift = localStorage.getItem(38 + "thirdShift") !== null ? localStorage.getItem(38 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp39firstShift = localStorage.getItem(39 + "firstShift") !== null ? localStorage.getItem(39 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp39secondShift = localStorage.getItem(39 + "secondShift") !== null ? localStorage.getItem(39 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp39thirdShift = localStorage.getItem(39 + "thirdShift") !== null ? localStorage.getItem(39 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp40firstShift = localStorage.getItem(40 + "firstShift") !== null ? localStorage.getItem(40 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp40secondShift = localStorage.getItem(40 + "secondShift") !== null ? localStorage.getItem(40 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp40thirdShift = localStorage.getItem(40 + "thirdShift") !== null ? localStorage.getItem(40 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp41firstShift = localStorage.getItem(41 + "firstShift") !== null ? localStorage.getItem(41 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp41secondShift = localStorage.getItem(41 + "secondShift") !== null ? localStorage.getItem(41 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp41thirdShift = localStorage.getItem(41 + "thirdShift") !== null ? localStorage.getItem(41 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp42firstShift = localStorage.getItem(42 + "firstShift") !== null ? localStorage.getItem(42 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp42secondShift = localStorage.getItem(42 + "secondShift") !== null ? localStorage.getItem(42 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp42thirdShift = localStorage.getItem(42 + "thirdShift") !== null ? localStorage.getItem(42 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp43firstShift = localStorage.getItem(43 + "firstShift") !== null ? localStorage.getItem(43 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp43secondShift = localStorage.getItem(43 + "secondShift") !== null ? localStorage.getItem(43 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp43thirdShift = localStorage.getItem(43 + "thirdShift") !== null ? localStorage.getItem(43 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp44firstShift = localStorage.getItem(44 + "firstShift") !== null ? localStorage.getItem(44 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp44secondShift = localStorage.getItem(44 + "secondShift") !== null ? localStorage.getItem(44 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp44thirdShift = localStorage.getItem(44 + "thirdShift") !== null ? localStorage.getItem(44 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp45firstShift = localStorage.getItem(45 + "firstShift") !== null ? localStorage.getItem(45 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp45secondShift = localStorage.getItem(45 + "secondShift") !== null ? localStorage.getItem(45 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp45thirdShift = localStorage.getItem(45 + "thirdShift") !== null ? localStorage.getItem(45 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp46firstShift = localStorage.getItem(46 + "firstShift") !== null ? localStorage.getItem(46 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp46secondShift = localStorage.getItem(46 + "secondShift") !== null ? localStorage.getItem(46 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp46thirdShift = localStorage.getItem(46 + "thirdShift") !== null ? localStorage.getItem(46 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp47firstShift = localStorage.getItem(47 + "firstShift") !== null ? localStorage.getItem(47 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp47secondShift = localStorage.getItem(47 + "secondShift") !== null ? localStorage.getItem(47 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp47thirdShift = localStorage.getItem(47 + "thirdShift") !== null ? localStorage.getItem(47 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp48firstShift = localStorage.getItem(48 + "firstShift") !== null ? localStorage.getItem(48 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp48secondShift = localStorage.getItem(48 + "secondShift") !== null ? localStorage.getItem(48 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp48thirdShift = localStorage.getItem(48 + "thirdShift") !== null ? localStorage.getItem(48 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp49firstShift = localStorage.getItem(49 + "firstShift") !== null ? localStorage.getItem(49 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp49secondShift = localStorage.getItem(49 + "secondShift") !== null ? localStorage.getItem(49 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp49thirdShift = localStorage.getItem(49 + "thirdShift") !== null ? localStorage.getItem(49 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp50firstShift = localStorage.getItem(50 + "firstShift") !== null ? localStorage.getItem(50 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp50secondShift = localStorage.getItem(50 + "secondShift") !== null ? localStorage.getItem(50 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp50thirdShift = localStorage.getItem(50 + "thirdShift") !== null ? localStorage.getItem(50 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    

    const comp101 = localStorage.getItem(101) !== null ? localStorage.getItem(101).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp102 = localStorage.getItem(102) !== null ? localStorage.getItem(102).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp103 = localStorage.getItem(103) !== null ? localStorage.getItem(103).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp104 = localStorage.getItem(104) !== null ? localStorage.getItem(104).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp105 = localStorage.getItem(105) !== null ? localStorage.getItem(105).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp106 = localStorage.getItem(106) !== null ? localStorage.getItem(106).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp107 = localStorage.getItem(107) !== null ? localStorage.getItem(107).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp108 = localStorage.getItem(108) !== null ? localStorage.getItem(108).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp109 = localStorage.getItem(109) !== null ? localStorage.getItem(109).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp110 = localStorage.getItem(110) !== null ? localStorage.getItem(110).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp111 = localStorage.getItem(111) !== null ? localStorage.getItem(111).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp112 = localStorage.getItem(112) !== null ? localStorage.getItem(112).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp113 = localStorage.getItem(113) !== null ? localStorage.getItem(113).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp114 = localStorage.getItem(114) !== null ? localStorage.getItem(114).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp115 = localStorage.getItem(115) !== null ? localStorage.getItem(115).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp116 = localStorage.getItem(116) !== null ? localStorage.getItem(116).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp117 = localStorage.getItem(117) !== null ? localStorage.getItem(117).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp118 = localStorage.getItem(118) !== null ? localStorage.getItem(118).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp119 = localStorage.getItem(119) !== null ? localStorage.getItem(119).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp120 = localStorage.getItem(120) !== null ? localStorage.getItem(120).split(',').reduce((total, num) => Number(total) + Number(num)) : 0;


    const comp101firstShift = localStorage.getItem(101 + "firstShift") !== null ? localStorage.getItem(101 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp101secondShift = localStorage.getItem(101 + "secondShift") !== null ? localStorage.getItem(101 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp101thirdShift = localStorage.getItem(101 + "thirdShift") !== null ? localStorage.getItem(101 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp102firstShift = localStorage.getItem(102 + "firstShift") !== null ? localStorage.getItem(102 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp102secondShift = localStorage.getItem(102 + "secondShift") !== null ? localStorage.getItem(102 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp102thirdShift = localStorage.getItem(102 + "thirdShift") !== null ? localStorage.getItem(102 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp103firstShift = localStorage.getItem(103 + "firstShift") !== null ? localStorage.getItem(103 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp103secondShift = localStorage.getItem(103 + "secondShift") !== null ? localStorage.getItem(103 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp103thirdShift = localStorage.getItem(103 + "thirdShift") !== null ? localStorage.getItem(103 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp104firstShift = localStorage.getItem(104 + "firstShift") !== null ? localStorage.getItem(104 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp104secondShift = localStorage.getItem(104 + "secondShift") !== null ? localStorage.getItem(104 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp104thirdShift = localStorage.getItem(104 + "thirdShift") !== null ? localStorage.getItem(104 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp105firstShift = localStorage.getItem(105 + "firstShift") !== null ? localStorage.getItem(105 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp105secondShift = localStorage.getItem(105 + "secondShift") !== null ? localStorage.getItem(105 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp105thirdShift = localStorage.getItem(105 + "thirdShift") !== null ? localStorage.getItem(105 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp106firstShift = localStorage.getItem(106 + "firstShift") !== null ? localStorage.getItem(106 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp106secondShift = localStorage.getItem(106 + "secondShift") !== null ? localStorage.getItem(106 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp106thirdShift = localStorage.getItem(106 + "thirdShift") !== null ? localStorage.getItem(106 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp107firstShift = localStorage.getItem(107 + "firstShift") !== null ? localStorage.getItem(107 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp107secondShift = localStorage.getItem(107 + "secondShift") !== null ? localStorage.getItem(107 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp107thirdShift = localStorage.getItem(107 + "thirdShift") !== null ? localStorage.getItem(107 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp108firstShift = localStorage.getItem(108 + "firstShift") !== null ? localStorage.getItem(108 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp108secondShift = localStorage.getItem(108 + "secondShift") !== null ? localStorage.getItem(108 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp108thirdShift = localStorage.getItem(108 + "thirdShift") !== null ? localStorage.getItem(108 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp109firstShift = localStorage.getItem(109 + "firstShift") !== null ? localStorage.getItem(109 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp109secondShift = localStorage.getItem(109 + "secondShift") !== null ? localStorage.getItem(109 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp109thirdShift = localStorage.getItem(109 + "thirdShift") !== null ? localStorage.getItem(109 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp110firstShift = localStorage.getItem(110 + "firstShift") !== null ? localStorage.getItem(110 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp110secondShift = localStorage.getItem(110 + "secondShift") !== null ? localStorage.getItem(110 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp110thirdShift = localStorage.getItem(110 + "thirdShift") !== null ? localStorage.getItem(110 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp111firstShift = localStorage.getItem(111 + "firstShift") !== null ? localStorage.getItem(111 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp111secondShift = localStorage.getItem(111 + "secondShift") !== null ? localStorage.getItem(111 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp111thirdShift = localStorage.getItem(111 + "thirdShift") !== null ? localStorage.getItem(111 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp112firstShift = localStorage.getItem(112 + "firstShift") !== null ? localStorage.getItem(112 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp112secondShift = localStorage.getItem(112 + "secondShift") !== null ? localStorage.getItem(112 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp112thirdShift = localStorage.getItem(112 + "thirdShift") !== null ? localStorage.getItem(112 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp113firstShift = localStorage.getItem(113 + "firstShift") !== null ? localStorage.getItem(113 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp113secondShift = localStorage.getItem(113 + "secondShift") !== null ? localStorage.getItem(113 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp113thirdShift = localStorage.getItem(113 + "thirdShift") !== null ? localStorage.getItem(113 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp114firstShift = localStorage.getItem(114 + "firstShift") !== null ? localStorage.getItem(114 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp114secondShift = localStorage.getItem(114 + "secondShift") !== null ? localStorage.getItem(114 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp114thirdShift = localStorage.getItem(114 + "thirdShift") !== null ? localStorage.getItem(114 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp115firstShift = localStorage.getItem(115 + "firstShift") !== null ? localStorage.getItem(115 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp115secondShift = localStorage.getItem(115 + "secondShift") !== null ? localStorage.getItem(115 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp115thirdShift = localStorage.getItem(115 + "thirdShift") !== null ? localStorage.getItem(115 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp116firstShift = localStorage.getItem(116 + "firstShift") !== null ? localStorage.getItem(116 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp116secondShift = localStorage.getItem(116 + "secondShift") !== null ? localStorage.getItem(116 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp116thirdShift = localStorage.getItem(116 + "thirdShift") !== null ? localStorage.getItem(116 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp117firstShift = localStorage.getItem(117 + "firstShift") !== null ? localStorage.getItem(117 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp117secondShift = localStorage.getItem(117 + "secondShift") !== null ? localStorage.getItem(117 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp117thirdShift = localStorage.getItem(117 + "thirdShift") !== null ? localStorage.getItem(117 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp118firstShift = localStorage.getItem(118 + "firstShift") !== null ? localStorage.getItem(118 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp118secondShift = localStorage.getItem(118 + "secondShift") !== null ? localStorage.getItem(118 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp118thirdShift = localStorage.getItem(118 + "thirdShift") !== null ? localStorage.getItem(118 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp119firstShift = localStorage.getItem(119 + "firstShift") !== null ? localStorage.getItem(119 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp119secondShift = localStorage.getItem(119 + "secondShift") !== null ? localStorage.getItem(119 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp119thirdShift = localStorage.getItem(119 + "thirdShift") !== null ? localStorage.getItem(119 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const comp120firstShift = localStorage.getItem(120 + "firstShift") !== null ? localStorage.getItem(120 + "firstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp120secondShift = localStorage.getItem(120 + "secondShift") !== null ? localStorage.getItem(120 + "secondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const comp120thirdShift = localStorage.getItem(120 + "thirdShift") !== null ? localStorage.getItem(120 + "thirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;

    const compAllDayFirstShift = localStorage.getItem("allDayFirstShift") !== null ? localStorage.getItem("allDayFirstShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const compAllDaySecondShift = localStorage.getItem("allDaySecondShift") !== null ? localStorage.getItem("allDaySecondShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const compAllDayThirdShift = localStorage.getItem("allDayThirdShift") !== null ? localStorage.getItem("allDayThirdShift").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    
    const compAllDayFirstShiftSecondSet = localStorage.getItem("allDayFirstShiftSecondSet") !== null ? localStorage.getItem("allDayFirstShiftSecondSet").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const compAllDaySecondShiftSecondSet = localStorage.getItem("allDaySecondShiftSecondSet") !== null ? localStorage.getItem("allDaySecondShiftSecondSet").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    const compAllDayThirdShiftSecondSet = localStorage.getItem("allDayThirdShiftSecondSet") !== null ? localStorage.getItem("allDayThirdShiftSecondSet").split(',').reduce((total, num) => Number(total) + Number(num)) : 0;
    
    const compAllDay = Number(compAllDayFirstShift) + Number(compAllDaySecondShift) + Number(compAllDayThirdShift) + Number(compAllDayFirstShiftSecondSet) + Number(compAllDaySecondShiftSecondSet) + Number(compAllDayThirdShiftSecondSet);

    this.shiftReport1 = () => {
        let millis = Number(comp1firstShift) + Number(comp2firstShift) + Number(comp3firstShift) + Number(comp4firstShift) + Number(comp5firstShift) + Number(comp6firstShift) + Number(comp7firstShift) + Number(comp8firstShift) + Number(comp9firstShift) + Number(comp10firstShift)
                     + Number(comp11firstShift) + Number(comp12firstShift) + Number(comp13firstShift) + Number(comp14firstShift) + Number(comp15firstShift) + Number(comp16firstShift) + Number(comp17firstShift) + Number(comp18firstShift) + Number(comp19firstShift) + Number(comp20firstShift)
                     + Number(comp21firstShift) + Number(comp22firstShift) + Number(comp23firstShift) + Number(comp24firstShift) + Number(comp25firstShift) + Number(comp26firstShift) + Number(comp27firstShift) + Number(comp28firstShift) + Number(comp29firstShift) + Number(comp30firstShift)
                     + Number(comp31firstShift) + Number(comp32firstShift) + Number(comp33firstShift) + Number(comp34firstShift) + Number(comp35firstShift) + Number(comp36firstShift) + Number(comp37firstShift) + Number(comp38firstShift) + Number(comp39firstShift) + Number(comp40firstShift)
                     + Number(comp41firstShift) + Number(comp42firstShift) + Number(comp43firstShift) + Number(comp44firstShift) + Number(comp45firstShift) + Number(comp46firstShift) + Number(comp47firstShift) + Number(comp48firstShift) + Number(comp49firstShift) + Number(comp50firstShift);
        let x = millis / 3600000 * Number(hourPrice);
        let y = x.toFixed(2);

        let millisSecond = Number(comp101firstShift) + Number(comp102firstShift) + Number(comp103firstShift) + Number(comp104firstShift) + Number(comp105firstShift) + Number(comp106firstShift) + Number(comp107firstShift) + Number(comp108firstShift) + Number(comp109firstShift) + Number(comp110firstShift)
                          + Number(comp110firstShift) + Number(comp110firstShift) + Number(comp110firstShift) + Number(comp110firstShift) + Number(comp110firstShift) + Number(comp110firstShift) + Number(comp110firstShift) + Number(comp110firstShift) + Number(comp110firstShift) + Number(comp110firstShift);
        let a = millisSecond / 3600000 * Number(hourPriceSecond);
        let b = a.toFixed(2);

        let firstSet = Number(y) + Number(compAllDayFirstShift);
        let secondSet = Number(b) + Number(compAllDayFirstShiftSecondSet);

        localStorage.setItem("reports", true);

        return Number(firstSet) + Number(secondSet) + "$";
        }
    this.shiftReport2 = () => {
        let millis = Number(comp1secondShift) + Number(comp2secondShift) + Number(comp3secondShift) + Number(comp4secondShift) + Number(comp5secondShift) + Number(comp6secondShift) + Number(comp7secondShift) + Number(comp8secondShift) + Number(comp9secondShift) + Number(comp10secondShift)
                    + Number(comp11secondShift) + Number(comp12secondShift) + Number(comp13secondShift) + Number(comp14secondShift) + Number(comp15secondShift) + Number(comp16secondShift) + Number(comp17secondShift) + Number(comp18secondShift) + Number(comp19secondShift) + Number(comp20secondShift)
                    + Number(comp21secondShift) + Number(comp22secondShift) + Number(comp23secondShift) + Number(comp24secondShift) + Number(comp25secondShift) + Number(comp26secondShift) + Number(comp27secondShift) + Number(comp28secondShift) + Number(comp29secondShift) + Number(comp30secondShift)
                    + Number(comp31secondShift) + Number(comp32secondShift) + Number(comp33secondShift) + Number(comp34secondShift) + Number(comp35secondShift) + Number(comp36secondShift) + Number(comp37secondShift) + Number(comp38secondShift) + Number(comp39secondShift) + Number(comp40secondShift)
                    + Number(comp41secondShift) + Number(comp42secondShift) + Number(comp43secondShift) + Number(comp44secondShift) + Number(comp45secondShift) + Number(comp46secondShift) + Number(comp47secondShift) + Number(comp48secondShift) + Number(comp49secondShift) + Number(comp50secondShift);
        let x = millis / 3600000 * Number(hourPrice);
        let y = x.toFixed(2);

        let millisSecond = Number(comp101secondShift) + Number(comp102secondShift) + Number(comp103secondShift) + Number(comp104secondShift) + Number(comp105secondShift) + Number(comp106secondShift) + Number(comp107secondShift) + Number(comp108secondShift) + Number(comp109secondShift) + Number(comp110secondShift);
        let a = millisSecond / 3600000 * Number(hourPriceSecond);
        let b = a.toFixed(2);
            
        let firstSet = Number(y) + Number(compAllDaySecondShift);
        let secondSet = Number(b) + Number(compAllDaySecondShiftSecondSet);

        localStorage.setItem("reports", true);

        return Number(firstSet) + Number(secondSet) + "$";
        }
    this.shiftReport3 = () => {
        let millis = Number(comp1thirdShift) + Number(comp2thirdShift) + Number(comp3thirdShift) + Number(comp4thirdShift) + Number(comp5thirdShift) + Number(comp6thirdShift) + Number(comp7thirdShift) + Number(comp8thirdShift) + Number(comp9thirdShift) + Number(comp10thirdShift)
                    + Number(comp11thirdShift) + Number(comp12thirdShift) + Number(comp13thirdShift) + Number(comp14thirdShift) + Number(comp15thirdShift) + Number(comp16thirdShift) + Number(comp17thirdShift) + Number(comp18thirdShift) + Number(comp19thirdShift) + Number(comp20thirdShift)
                    + Number(comp22thirdShift) + Number(comp22thirdShift) + Number(comp23thirdShift) + Number(comp24thirdShift) + Number(comp25thirdShift) + Number(comp26thirdShift) + Number(comp27thirdShift) + Number(comp28thirdShift) + Number(comp29thirdShift) + Number(comp30thirdShift)
                    + Number(comp31thirdShift) + Number(comp32thirdShift) + Number(comp33thirdShift) + Number(comp34thirdShift) + Number(comp35thirdShift) + Number(comp36thirdShift) + Number(comp37thirdShift) + Number(comp38thirdShift) + Number(comp39thirdShift) + Number(comp40thirdShift)
                    + Number(comp41thirdShift) + Number(comp42thirdShift) + Number(comp43thirdShift) + Number(comp44thirdShift) + Number(comp45thirdShift) + Number(comp46thirdShift) + Number(comp47thirdShift) + Number(comp48thirdShift) + Number(comp49thirdShift) + Number(comp50thirdShift);
        let x = millis / 3600000 * Number(hourPrice);
        let y = x.toFixed(2); 

        let millisSecond = Number(comp101thirdShift) + Number(comp102thirdShift) + Number(comp103thirdShift) + Number(comp104thirdShift) + Number(comp105thirdShift) + Number(comp106thirdShift) + Number(comp107thirdShift) + Number(comp108thirdShift) + Number(comp109thirdShift) + Number(comp110thirdShift);
        let a = millisSecond / 3600000 * Number(hourPriceSecond);
        let b = a.toFixed(2);
            
        let firstSet = Number(y) + Number(compAllDayThirdShift);
        let secondSet = Number(b) + Number(compAllDayThirdShiftSecondSet);

        localStorage.setItem("reports", true);

        return Number(firstSet) + Number(secondSet) + "$";
        }
    this.dailyReport = () => {
        let millis = Number(comp1) + Number(comp2) + Number(comp3) + Number(comp4) + Number(comp5) + Number(comp6) + Number(comp7) + Number(comp8) + Number(comp9) + Number(comp10) 
                    + Number(comp11) + Number(comp12) + Number(comp13) + Number(comp14) + Number(comp15) + Number(comp16) + Number(comp17) + Number(comp18) + Number(comp19) + Number(comp20)
                    + Number(comp21) + Number(comp22) + Number(comp23) + Number(comp24) + Number(comp25) + Number(comp26) + Number(comp27) + Number(comp28) + Number(comp29) + Number(comp30)
                    + Number(comp31) + Number(comp32) + Number(comp33) + Number(comp34) + Number(comp35) + Number(comp36) + Number(comp37) + Number(comp38) + Number(comp39) + Number(comp40)
                    + Number(comp41) + Number(comp42) + Number(comp43) + Number(comp44) + Number(comp45) + Number(comp46) + Number(comp47) + Number(comp48) + Number(comp49) + Number(comp50);
       
        let x = millis / 3600000 * Number(hourPrice);
        let y = x.toFixed(2);

        let millisSecond = Number(comp101) + Number(comp102) + Number(comp103) + Number(comp104) + Number(comp105) + Number(comp106) + Number(comp107) + Number(comp108) + Number(comp109) + Number(comp110)
                          + Number(comp111) + Number(comp112) + Number(comp113) + Number(comp114) + Number(comp115) + Number(comp116) + Number(comp117) + Number(comp118) + Number(comp119) + Number(comp120);
        let a = millisSecond / 3600000 * Number(hourPriceSecond);
        let b = a.toFixed(2);

        localStorage.setItem("reports", true);
        
        localStorage.setItem("dailyReport", Number(y) + Number(b));
        return (Number(y) + Number(b) + Number(compAllDay)).toFixed(2) + "$";
        }

        this.endOfDay = () => {
            alert(new Date() + ": " + this.dailyReport());

            localStorage.removeItem("allDayFirstShift");
            localStorage.removeItem("allDaySecondShift");
            localStorage.removeItem("allDayThirdShift");

            localStorage.removeItem("allDayFirstShiftSecondSet");
            localStorage.removeItem("allDaySecondShiftSecondSet");
            localStorage.removeItem("allDayThirdShiftSecondSet");

            let getAll = localStorage.getItem("properties");
            let array = getAll.split(',');
            let arrayString = Array.from(new Set(array)).filter((item) => item !== "null");

            let getAllSec = localStorage.getItem("propertiesSecond");
            let arraySec = getAllSec.split(',');
            let arrayStringSec = Array.from(new Set(arraySec)).filter((item) => item !== "null");

            let num = 0;

                arrayString.forEach(function(element) {
                    localStorage.removeItem(element + "firstShift")
                    localStorage.removeItem(element + "secondShift")
                    localStorage.removeItem(element + "thirdShift")

                    localStorage.removeItem(element + "allDay")
                    localStorage.removeItem(element + "allDayDual")
                    localStorage.removeItem("min" + element)
                    
                    localStorage.removeItem(element + "normalEnd")

                    localStorage.removeItem(element + "erased");

                    localStorage.removeItem(element)
                    num++
                })

                arrayStringSec.forEach(function(element) {
                    localStorage.removeItem(element + "firstShiftSecondSet")
                    localStorage.removeItem(element + "secondShiftSecondSet")
                    localStorage.removeItem(element + "thirdShiftSecondSet")

                    localStorage.removeItem(element + "allDay")
                    localStorage.removeItem(element + "allDayDual")
                    localStorage.removeItem("min" + element)
                    
                    localStorage.removeItem(element + "normalEnd")

                    localStorage.removeItem(element)
                    num++
                })

            alert("Today workday is succesfully closed! All data is proceed.");
            window.location.reload();
        }

        this.shiftsHourReport = () => {
            this.setState({
                firstShiftStart: localStorage.getItem("firstShiftStart"),
                firstShiftEnd: localStorage.getItem("firstShiftEnd"),
                secondShiftStart: localStorage.getItem("secondShiftStart"),
                secondShiftEnd: localStorage.getItem("secondShiftEnd"),
                thirdShiftStart: localStorage.getItem("thirdShiftStart"),
                thirdShiftEnd: localStorage.getItem("thirdShiftEnd"),
                hourPrice: localStorage.getItem("hourPrice"),
                hourPriceSecond: localStorage.getItem("hourPriceSecond")
            })
        }
        
        this.mainNav = () => {
            this.setState({
                chartNav: false,
                reportsNav: false,
                reservationNav: false,
                workingPanelNav: false,
                howItWorksNav: false
            })
        }
        this.chartNav = () => {
            this.setState({
                chartNav: !this.state.chartNav
            })
        }
        this.reportsNav = () => {
            this.setState({
                reportsNav: !this.state.reportsNav
            })
        }
        this.reservationNav = () => {
            this.setState({
                reservationNav: !this.state.reservationNav
            })
            if(this.state.mainNav === true) {
                this.setState({
                    reservationNav: !this.state.reservationNav
                })
            }
        }
        this.workingPanelNav = () => {
            this.setState({
                workingPanelNav: !this.state.workingPanelNav
            })
        }
        this.adminNav = () => {
            this.setState({
                adminNav: !this.state.adminNav
            })
        }
        this.howItWorksNav = () => {
            this.setState({
                howItWorksNav: !this.state.howItWorksNav
            })
        }
        this.dragAndDrop = () => {
            this.setState({
                draggable: !this.state.draggable
            })
        setTimeout(() => {
            let num = 0;
            let maxVisible = Number(localStorage.getItem("propertiesMax"));
            let maxVisibleSecond = Number(localStorage.getItem("propertiesMaxSecond"));

            let getAllAbsolute = localStorage.getItem("propertiesAbsolute");
            let arrayA = getAllAbsolute.split(',');
            let arrayStringAbsolute = Array.from(new Set(arrayA)).filter((item) => item !== "null");
            let arrayAbsoluteFiltered = arrayStringAbsolute.filter((item) => item > maxVisible);

            arrayAbsoluteFiltered.forEach(function(element) {
                document.getElementById(element).style.display = "none";

                num++;
            })
            
            let getAllAbsoluteSec = localStorage.getItem("propertiesAbsoluteSecond");
            let arrayASec = getAllAbsoluteSec.split(',');
            let arrayStringAbsoluteSecond = Array.from(new Set(arrayASec)).filter((item) => item !== "null");
            
            let arrayAbsoluteFilteredSecondSet = arrayStringAbsoluteSecond.filter((item) => item > maxVisibleSecond);
            
                arrayAbsoluteFilteredSecondSet.forEach(function(element) {
                    document.getElementById(element).style.display = "none";

                    num++;
                })
            if(this.state.draggable === true) {
                alert("Drag and drop is enabled")
            }
            if(this.state.draggable === false) {
                alert("Drag and drop is disabled")
            }
        }, 3000)
        }

    this.resetLayout = () => {
        this.setState({
          layout: []
        });
      }
    
      this.nmbOfComp = () => {
          localStorage.setItem("nmbOfComp", this.state.compNmb);
          window.location.reload();
      }
      this.nmbOfCompSec = () => {
        localStorage.setItem("nmbOfCompSec", this.state.compNmbSec);
        window.location.reload();
    }
        this.promoCode = () => {
            localStorage.setItem("promoUse", this.state.promoUse);
            localStorage.setItem("promoHours", this.state.promoHours);
            alert("Promo code is set! On " + this.state.promoUse + " hours - plus " + this.state.promoHours);
        }

        this.removePromoCode = () => {
            localStorage.removeItem("promoUse");
            localStorage.removeItem("promoHours");
        }

        this.reload = () => {
            return window.location.reload();
        }

        this.chartState = () => {
            this.setState({
                chart: true
            })
        }
        this.toggleClose = () => {
            
            localStorage.removeItem(this.state.close + "normal");
            localStorage.removeItem(this.state.close + "timePrice");
            localStorage.removeItem(this.state.close + "normalStart");
            localStorage.removeItem(this.state.close + "normalEnd");
            localStorage.removeItem(this.state.close + "added");
            localStorage.removeItem(this.state.close + "inputValue");
            if(localStorage.getItem(this.state.close + "promoHours") !== null) {
                localStorage.removeItem(this.state.close + "promoHours");
            }

                alert("Comp number: " + this.state.close + " is ready for use! Entered data has been collected.")

                this.setState({
                    close: ""
                })

                window.location.reload();
        }
        this.toggleReserve = () => {
            if(localStorage.getItem(this.state.reserveComp + "reserved")) {
                let getLS = localStorage.getItem(this.state.reserveComp + "reserved");
                let toArr = getLS.split(',');
                let concated = toArr.concat(this.state.reserveTime);
                alert("Reservation set. Comp nmb: " + this.state.reserveComp + " is reserved at: " + this.state.reserveTime + " h");
                return localStorage.setItem(this.state.reserveComp + "reserved", concated);
            }
            localStorage.setItem(this.state.reserveComp + "reserved", this.state.reserveTime); 

            alert("Reservation set. Comp nmb: " + this.state.reserveComp + " is reserved at: " + this.state.reserveTime + " h");
        }
        this.toggleReserveRemove = () => {
            let getLS = localStorage.getItem(this.state.reserveCompRemove + "reserved"); // 15, 17
            let toArr = getLS.split(',');
            let filtered = toArr.filter((item) => item !== this.state.reserveTimeRemove);
            localStorage.setItem(this.state.reserveCompRemove + "reserved", filtered);
            alert("Reservation on comp nmb: " + this.state.reserveCompRemove + " at: " + this.state.reserveTimeRemove + "h is removed!")
        }
        this.toggleErase = () => { 
            if(localStorage.getItem(this.state.erase + "allDay") === null || localStorage.getItem(this.state.erase + "normal" === null)) {
                return alert("Can not do that. All day usage is not used on this component!")
            } 
            if(localStorage.getItem(this.state.erase + "allDay") !== null) {
                if(Number(this.state.erase) < 100) {
                    if(localStorage.getItem("allDayFirstShift") !== null) {
                        let firstShift = localStorage.getItem("allDayFirstShift"); // get all values stored from all day time played
                        let getArr = firstShift.split(','); // make usebly array
                        getArr.shift(); // remove first item ! remove last item!!!!
        
                        localStorage.setItem("allDayFirstShift", getArr);
        
                        localStorage.removeItem(this.state.erase + "allDay");
                        localStorage.removeItem(this.state.erase + "normalEnd");
        
                        if(localStorage.getItem(this.state.erase + "firstShift") === null) {
                            localStorage.removeItem(this.state.erase + "firstShift");
                        }
        
                        if(localStorage.getItem("allDayFirstShift") === null) {
                        localStorage.removeItem("allDayFirstShift")
                        }
                        }
                        
                        if(localStorage.getItem("allDaySecondShift") !== null) {
                            let secondShift = localStorage.getItem("allDaySecondShift")
                            let getArrSec = secondShift.split(',');
                            getArrSec.shift();
        
                            localStorage.setItem("allDaySecondShift", getArrSec);
                            localStorage.removeItem(this.state.erase + "allDay");
                            localStorage.removeItem(this.state.erase + "normalEnd");
        
                        if(localStorage.getItem(this.state.erase + "secondShift") === null) {
                            localStorage.removeItem(this.state.erase + "secondShift");
                        }
                        if(localStorage.getItem("allDaySecondShift") === null) {
                            localStorage.removeItem("allDaySecondShift")
                        }
                        }
                        
                        if(localStorage.getItem("allDayThirdShift") !== null) {
                            let thirdShift = localStorage.getItem("allDayThirdShift")
                            let getArrThi = thirdShift.split(',');
                            getArrThi.shift();
        
                            localStorage.setItem("allDayThirdShift", getArrThi);
                            localStorage.removeItem(this.state.erase + "allDay");
                            localStorage.removeItem(this.state.erase + "normalEnd");
        
                        if(localStorage.getItem(this.state.erase + "thirdShift") === null) {
                            localStorage.removeItem(this.state.erase + "thirdShift");
                        }
                        if(localStorage.getItem("allDayThirdShift") === null) {
                            localStorage.removeItem("allDayThirdShift")
                        }
                }
            }
            if(Number(this.state.erase) >= 100) {
                if(localStorage.getItem("allDayFirstShiftSecondSet") !== null) {
                    localStorage.getItem("allDayFirstShiftSecondSet")
                    let firstShift = localStorage.getItem("allDayFirstShiftSecondSet") // get all values stored from all day time
                    let getArr = firstShift.split(','); // make usebly array
                    getArr.shift(); // remove first item 
                    localStorage.setItem("allDayFirstShiftSecondSet", getArr);

                    localStorage.removeItem(this.state.erase + "allDay");
                    localStorage.removeItem(this.state.erase + "normalEnd");
    
                    if(localStorage.getItem(this.state.erase + "firstShiftSecondSet") === null) {
                        localStorage.removeItem(this.state.erase + "firstShiftSecondSet");
                    }
    
                    if(localStorage.getItem("allDayFirstShiftSecondSet") === null) {
                    localStorage.removeItem("allDayFirstShiftSecondSet")
                    }
                    }
                    
                    if(localStorage.getItem("allDaySecondShiftSecondSet") !== null) {
                        let secondShift = localStorage.getItem("allDaySecondShiftSecondSet")
                        let getArrSec = secondShift.split(',');
                        getArrSec.shift();
    
                        localStorage.setItem("allDaySecondShiftSecondSet", getArrSec);
                        localStorage.removeItem(this.state.erase + "allDay");
                        localStorage.removeItem(this.state.erase + "normalEnd");
    
                    if(localStorage.getItem(this.state.erase + "secondShiftSecondSet") === null) {
                        localStorage.removeItem(this.state.erase + "secondShiftSecondSet");
                    }
                    if(localStorage.getItem("allDaySecondShiftSecondSet") === null) {
                        localStorage.removeItem("allDaySecondShiftSecondSet")
                    }
                    }
                    
                    if(localStorage.getItem("allDayThirdShiftSecondSet") !== null) {
                        let thirdShift = localStorage.getItem("allDayThirdShiftSecondSet")
                        let getArrThi = thirdShift.split(',');
                        getArrThi.shift();
    
                        localStorage.setItem("allDayThirdShiftSecondSet", getArrThi);
                        localStorage.removeItem(this.state.erase + "allDay");
                        localStorage.removeItem(this.state.erase + "normalEnd");
    
                    if(localStorage.getItem(this.state.erase + "thirdShiftSecondSet") === null) {
                        localStorage.removeItem(this.state.erase + "thirdShiftSecondSet");
                    }
                    if(localStorage.getItem("allDayThirdShiftSecondSet") === null) {
                        localStorage.removeItem("allDayThirdShiftSecondSet")
                    }
                }
            }

                if(this.state.erase < 100) {
                    localStorage.setItem(this.state.erase + "erased", localStorage.getItem("allDayPrice"));
                }
                if(this.state.erase >= 100) {
                    localStorage.setItem(this.state.erase + "erased", localStorage.getItem("allDayPriceSecondSet"));
                }
            alert("Comp number: " + this.state.erase + " is restarted! Entered data has erased and not proceed at shift,daily and others reports.")
            }
            

            if(localStorage.getItem(this.state.erase + "normal") && localStorage.getItem(this.state.erase + "normalEnd")) {
                let getLS = localStorage.getItem(this.state.erase); //get obj/nmb
                let toArr = getLS.split(','); // to arr
                let sliced = toArr.slice(1); // remove first
                localStorage.setItem(this.state.erase, sliced);

            const now = new Date().getHours();

            if(this.state.erase < 100) {
               if(Number(now) >= Number(localStorage.getItem("firstShiftStart")) && Number(now) < Number(localStorage.getItem("firstShiftEnd"))) {
                    let getLSShift = localStorage.getItem(this.state.erase + "firstShift");
                    let toArrShift = getLSShift.split(',');
                    let splicedShift = toArrShift.slice(1);
                    localStorage.setItem(this.state.erase + "firstShift", splicedShift);
                }
                if(Number(now) >= Number(localStorage.getItem("secondShiftStart")) && Number(now) < Number(localStorage.getItem("secondShiftEnd"))) {
                    let getLSShift = localStorage.getItem(this.state.erase + "secondShift");
                    let toArrShift = getLSShift.split(',');
                    let splicedShift = toArrShift.slice(1);
                    localStorage.setItem(this.state.erase + "secondShift", splicedShift);
                }
                if(Number(now) >= Number(localStorage.getItem("thirdShiftStart")) && Number(now) < Number(localStorage.getItem("thirdShiftEnd"))) {
                    let getLSShift = localStorage.getItem(this.state.erase + "thirdShift");
                    let toArrShift = getLSShift.split(',');
                    let splicedShift = toArrShift.slice(1);
                    localStorage.setItem(this.state.erase + "thirdShift", splicedShift);
                }
                let normalStart = localStorage.getItem(this.state.erase + "normalStart");
                let normalEnd = localStorage.getItem(this.state.erase + "normalEnd");
                let inputValue = localStorage.getItem(this.state.erase + "inputValue");
                localStorage.setItem(this.state.erase + "erased",`${normalStart}, ${normalEnd}, ${inputValue}`);

                localStorage.removeItem(this.state.erase + "normal");
                localStorage.removeItem(this.state.erase + "timePrice");
                localStorage.removeItem(this.state.erase + "normalStart");
                localStorage.removeItem(this.state.erase + "normalEnd");
                localStorage.removeItem(this.state.erase + "added");
                localStorage.removeItem(this.state.erase + "inputValue");
                if(localStorage.getItem(this.state.erase + "promoHours") !== null) {
                    localStorage.removeItem(this.state.erase + "promoHours");
                }

                alert("Comp number: " + this.state.erase + " is restarted! Entered data has erased and not proceed at shift,daily and others reports.")

                this.setState({
                    erase: ""
                })
            }
            if(this.state.erase >= 100) {
                if(Number(now) >= Number(localStorage.getItem("firstShiftStart")) && Number(now) < Number(localStorage.getItem("firstShiftEnd"))) {
                    let getLSShift = localStorage.getItem(this.state.erase + "firstShiftSecondSet");
                    let toArrShift = getLSShift.split(',');
                    let splicedShift = toArrShift.slice(1);
                    localStorage.setItem(this.state.erase + "firstShiftSecondSet", splicedShift);
                }
                if(Number(now) >= Number(localStorage.getItem("secondShiftStart")) && Number(now) < Number(localStorage.getItem("secondShiftEnd"))) {
                    let getLSShift = localStorage.getItem(this.state.erase + "secondShiftSecondSet");
                    let toArrShift = getLSShift.split(',');
                    let splicedShift = toArrShift.slice(1);
                    localStorage.setItem(this.state.erase + "secondShiftSecondSet", splicedShift);
                }
                if(Number(now) >= Number(localStorage.getItem("thirdShiftStart")) && Number(now) < Number(localStorage.getItem("thirdShiftEnd"))) {
                    let getLSShift = localStorage.getItem(this.state.erase + "thirdShiftSecondSet");
                    let toArrShift = getLSShift.split(',');
                    let splicedShift = toArrShift.slice(1);
                    localStorage.setItem(this.state.erase + "thirdShiftSecondSet", splicedShift);
                }

                let normalStart = localStorage.getItem(this.state.erase + "normalStart");
                let normalEnd = localStorage.getItem(this.state.erase + "normalEnd");
                let inputValue = localStorage.getItem(this.state.erase + "inputValue");
                localStorage.setItem(this.state.erase + "erased",`${normalStart}, ${normalEnd}, ${inputValue}`);
                
                localStorage.removeItem(this.state.erase + "normal");
                localStorage.removeItem(this.state.erase + "timePrice");
                localStorage.removeItem(this.state.erase + "normalStart");
                localStorage.removeItem(this.state.erase + "normalEnd");
                localStorage.removeItem(this.state.erase + "added");
                localStorage.removeItem(this.state.erase + "inputValue");
                if(localStorage.getItem(this.state.erase + "promoHours") !== null) {
                    localStorage.removeItem(this.state.erase + "promoHours");
                }

                alert("Comp number: " + this.state.erase + " is restarted! Entered data has erased and not proceed at shift,daily and others reports.")

                this.setState({
                    erase: ""
                })
            }

            window.location.reload();

            }
        }
    }

    hourPrice = () => {
        localStorage.setItem("hourPrice", this.state.e);
        alert("Price for one hour of usage is set on: " + this.state.e + "$");
    }

    hourPriceSecondSet = () => {
        localStorage.setItem("hourPriceSecond", this.state.eSecond);
        alert("Price for one hour of usage of second set of component is set on: " + this.state.eSecond + "$");
    }

    allDayPrice = () => {
        localStorage.setItem("allDayPrice", this.state.eDay);
        alert("Price for whole day usage is set on: " + this.state.eDay + "$");
    }

    allDayPriceSecondSet = () => {
        localStorage.setItem("allDayPriceSecondSet", this.state.eDaySecond);
        alert("Price for whole day usage of Second Set of component is: " + this.state.eDaySecond + "$");
    }

    firstShiftStart = () => {
        var e = document.getElementById("firstShiftStart");
		var selectedItem = e.options[e.selectedIndex].value;
        localStorage.setItem("firstShiftStart", selectedItem);
        alert("First shift start succesfully entered! It starts at: " + selectedItem);
    }
    firstShiftEnd = () => {
        var e = document.getElementById("firstShiftEnd");
		var selectedItem = e.options[e.selectedIndex].value;
        localStorage.setItem("firstShiftEnd", selectedItem);
        alert("First shift end succesfully entered!It starts at: " + selectedItem);
    }

    secondShiftStart = () => {
        var e = document.getElementById("secondShiftStart");
		var selectedItem = e.options[e.selectedIndex].value;
        localStorage.setItem("secondShiftStart", selectedItem);
        let pushed = [1].concat(this.state.shifts);
        
        this.setState({
            shifts: pushed
        })
        localStorage.setItem("shifts", this.state.shifts);
        alert("Second shift start succesfully entered! It starts: " + selectedItem);
    }
    secondShiftEnd = () => {
        var e = document.getElementById("secondShiftEnd");
		var selectedItem = e.options[e.selectedIndex].value;
        localStorage.setItem("secondShiftEnd", selectedItem);
        alert("Second shift end succesfully entered! It starts: " + selectedItem);
    }

    thirdShiftStart = () => {
        var e = document.getElementById("thirdShiftStart");
		var selectedItem = e.options[e.selectedIndex].value;
        localStorage.setItem("thirdShiftStart", selectedItem);
        let pushed = [2].concat(this.state.shifts);
        this.setState({
            shifts: pushed
        })
        localStorage.setItem("shifts", this.state.shifts);
        alert("Third shift start succesfully entered! It starts: " + selectedItem);
    }
    thirdShiftEnd = () => {
        var e = document.getElementById("thirdShiftEnd");
		var selectedItem = e.options[e.selectedIndex].value;
        localStorage.setItem("thirdShiftEnd", selectedItem);
        alert("Third shift end succesfully entered! It starts: " + selectedItem);
    }

    indexed(i) {
        return i
    }

    
    resetLayout() {
        this.setState({
            layout: []
        })
    }

    onLayoutChange(layout) {
        saveToLS("layout", layout);
    }

    componentDidUpdate() {     
        this.dailyReport();
        let getAll = localStorage.getItem("properties");
        let array = getAll.split(',');

        let getAppPlus = localStorage.getItem("propertiesNow") !== null ? localStorage.getItem("propertiesNow") : "null"; // get added or print null if no added comp
        let arrayPlus = getAppPlus.split(',');
       
        let arrayConcated = array.concat(arrayPlus); // concat with comp that already have comp class name 

        
        let arrayString = Array.from(new Set(arrayConcated)).filter((item) => item !== "null"); 
        let propsMax = Math.max.apply(Math, arrayString);
        localStorage.setItem("propertiesMax", propsMax);

        let getAllSec = localStorage.getItem("propertiesSecond");
        let arraySec = getAllSec.split(',');

        let getAllSecPlus = localStorage.getItem("propertiesNowSecond") !== null ? localStorage.getItem("propertiesNowSecond") : "null"; // get added or print null if no added comp
        let arraySecPlus = getAllSecPlus.split(',');

        let arraySecConcated = arraySec.concat(arraySecPlus);

        let arrayStringSec = Array.from(new Set(arraySecConcated)).filter((item) => item !== "null");
        let propsMaxSec = Math.max.apply(Math, arrayStringSec);
        localStorage.setItem("propertiesMaxSecond", propsMaxSec);

        if(localStorage.getItem("properties") !== null) {
            let getAll = localStorage.getItem("properties");
            let array = getAll.split(',');
            let arrayString = Array.from(new Set(array)).filter((item) => item !== "null");
            
            let num = 0;
    
                arrayString.forEach(function(element) {
    
                    document.getElementById(element).childNodes[0].className = "comp";
                    
                    num++
                })
            }
        if(localStorage.getItem("propertiesSecond") !== null) {

            let getAllSec = localStorage.getItem("propertiesSecond");
            let arraySec = getAllSec.split(',');
            let arrayStringSec = Array.from(new Set(arraySec)).filter((item) => item !== "null");
            
            let num = 0;
        
                arrayStringSec.forEach(function(element) {
        
                document.getElementById(element).childNodes[0].className = "comp-second";
                        
                num++
                })
            }
    /*        function uploadDB () {
                axios.put('http://localhost:5000/api/items/update', 
            
                    { 'items': JSON.stringify(Object.entries(localStorage).map(item => item).filter(item => item !== undefined)) }
                )
                .then(res => console.log(res));
            }
            uploadDB();     */
    } 

    componentDidMount() {
         /*   let maxVisibleLS = Number(localStorage.getItem("propertiesMax"));
            let maxVisibleSecondLS = Number(localStorage.getItem("propertiesMaxSecond"));

            let getAllAbsoluteLS = localStorage.getItem("propertiesAbsolute");
            let arrayALS = getAllAbsoluteLS.split(',');
            let arrayStringAbsoluteLS = Array.from(new Set(arrayALS)).filter((item) => item !== "null");
            let arrayAbsoluteFilteredLS = arrayStringAbsoluteLS.filter((item) => item > maxVisibleLS);

            arrayAbsoluteFilteredLS.forEach(function(element) {   
                if(localStorage.getItem("propertiesAbsolute") !== null) {
                    let lsProps = localStorage.getItem(element + "props");
                    console.log(lsProps); 
                }    
                num++;
            }) */
            


            this.setState({ mounted: true });
            if(localStorage.getItem("reports") !== false) {
                this.setState({
                    reportsNav: !this.state.reportsNav
                })
                localStorage.removeItem("reports");
            }
            if(localStorage.getItem("hourPrice") === null && localStorage.getItem("firstShiftEnd") === null) {
                this.setState({
                    adminNav: !this.state.adminNav
                })
                alert("Fulfill required field in the form on bottom of the page. Application will not work if required fields are not filled.");
            }
            if(localStorage.getItem("nmbOfComp") !== null) {
            let arrayProps = localStorage.getItem("properties");
            let arrayPropsSplit = arrayProps.split(',');
            let arrayPropsFilter = Array.from(new Set(arrayPropsSplit)).filter((item) => item !== "null"); // [1, 2, 3, 4, 5]
            let max = Math.max.apply(Math, arrayPropsFilter);
            let nmbComp = localStorage.getItem("nmbOfComp");
        
            let arr = [];
            for(let numb = Number(max); numb <= Number(nmbComp); numb++) { //5, 6, 7, 8, 9 ...i 
                arr.push(numb);
            }
            localStorage.setItem("propertiesNow", arr);
            
            //set className to "comp"

            let arrayNewComp = localStorage.getItem("propertiesNow");
            let arrayNewCompSplit = arrayNewComp.split(',');
        

            arrayNewCompSplit.forEach(function(el) {
                document.getElementById(el).childNodes[0].className = "comp";
            })
        }

        if(localStorage.getItem("nmbOfCompSec") !== null) {
            let arrayProps = localStorage.getItem("propertiesSecond");
            let arrayPropsSplit = arrayProps.split(',');
            let arrayPropsFilter = Array.from(new Set(arrayPropsSplit)).filter((item) => item !== "null"); // [1, 2, 3, 4, 5]
            let max = Math.max.apply(Math, arrayPropsFilter);
            let nmbComp = localStorage.getItem("nmbOfCompSec");
            let arr = [];
            for(let numb = Number(max); numb <= Number(nmbComp); numb++) { //5, 6, 7, 8, 9 ...i 
                arr.push(numb);
            }
            localStorage.setItem("propertiesNowSecond", arr);
            //set className to "comp"

            let arrayNewComp = localStorage.getItem("propertiesNowSecond");
            let arrayNewCompSplit = arrayNewComp.split(',');
        

            arrayNewCompSplit.forEach(function(el) {
                document.getElementById(el).childNodes[0].className = "comp-second";
            })
        }



            if(localStorage.getItem("dragg") == null) {
                localStorage.setItem("dragg", null)
            }
            if(localStorage.getItem("resize") == null) {
                localStorage.setItem("resize", null)
            }
            let num = 0;
            let maxVisible = Number(localStorage.getItem("propertiesMax"));
            let maxVisibleSecond = Number(localStorage.getItem("propertiesMaxSecond"));

            let getAllAbsolute = localStorage.getItem("propertiesAbsolute") !== null ? localStorage.getItem("propertiesAbsolute") : "null";
            let arrayA = getAllAbsolute.split(',');

            let arrayStringAbsolute = Array.from(new Set(arrayA)).filter((item) => item !== "null");
            let arrayAbsoluteFiltered = arrayStringAbsolute.filter((item) => item > maxVisible);

            let xSec = arrayStringAbsolute.filter((item) => item > 100);
            let arrayAbsoluteFilteredSecondSet = xSec.filter((item) => item > maxVisibleSecond)

                arrayAbsoluteFiltered.forEach(function(element) {
                 document.getElementById(element).style.display = "none";

                    num++;
                })
                arrayAbsoluteFilteredSecondSet.forEach(function(element) {
                    document.getElementById(element).style.display = "none";

                    num++;
                })
        
            }

    render() {
        window.onload = () => {
        localStorage.setItem("shifts", 0);
        this.setState({
            shifts: [localStorage.getItem("shifts")]  //[0]
        })
        function noname() {
            var a = localStorage.getItem("firstShiftEnd");
            var b = localStorage.getItem("secondShiftEnd");
            var c = localStorage.getItem("thirdShiftEnd");
            let arr = [a, b, c].filter((item) => item !== null);
            
            let arrLeng = arr[arr.length -1]; // hour last shift over
         
            let hour = new Date();
            let hourNew = hour.setHours(arrLeng); //ms of last shift
            let newDate = new Date(hourNew); // to date obj
            let newDateD = newDate.getDate() + 1; // tomorrow day (Number, example (3))
            let newDateDPlus = newDate.setDate(newDateD); // milliseconds of tomorrow day
            
            if(Number(arrLeng) < Number(localStorage.getItem("firstShiftStart")) && Number(new Date().getHours()) > 6) { 
                localStorage.setItem("overtime", newDateDPlus);
            } 
            if(Number(arrLeng) > Number(localStorage.getItem("firstShiftStart"))) { 
                localStorage.removeItem("overtime");
            }
        }
        noname();

        function addStyle() {
            if(localStorage.getItem("properties") !== null) {
                if(localStorage.getItem("propertiesNow") === null) {
                    localStorage.setItem("propertiesNow", "null")
                }
                let getAll = localStorage.getItem("properties");
                let array = getAll.split(',');

                let getAppPlus = localStorage.getItem("propertiesNow") !== null ? localStorage.getItem("propertiesNow") : "null"; // get added or print null if no added comp
                let arrayPlus = getAppPlus.split(',');
               
                let arrayConcated = array.concat(arrayPlus); // concat with comp that already have comp class name 
            

                let arrayString = Array.from(new Set(arrayConcated)).filter((item) => item !== "null");
                
                let num = 0;
                let maxVisible = Number(localStorage.getItem("propertiesMax")); //

                let getAllAbsolute = localStorage.getItem("propertiesAbsolute"); // get all comp
                let arrayA = getAllAbsolute.split(','); // make array
                let arrayStringAbsolute = Array.from(new Set(arrayA)).filter((item) => item !== "null"); // without null
                let arrayAbsoluteFiltered = arrayStringAbsolute.filter((item) => item > maxVisible); // all bigger than maxVisible

                arrayAbsoluteFiltered.forEach(function(element) {
                if(document.getElementById(element) !== null) {
                document.getElementById(element).style.display = "none";
                    num++;
                }
                })
                arrayString.forEach(function(element) {
               document.getElementById(element).childNodes[0].className = "comp"; 
                num++
                })

            }
                if(localStorage.getItem("propertiesSecond") !== null) {

                    let getAllSec = localStorage.getItem("propertiesSecond");
                    let arraySec = getAllSec.split(',');

                    if(localStorage.getItem("propertiesNowSecond") === null) {
                        localStorage.setItem("propertiesNowSecond", "null")
                    }

                    let getAllSecPlus = localStorage.getItem("propertiesNowSecond") !== null ? localStorage.getItem("propertiesNowSecond") : "null"; // get added or print null if no added comp
                    let arraySecPlus = getAllSecPlus.split(',');

                    let arraySecConcated = arraySec.concat(arraySecPlus);

                    let arrayStringSec = Array.from(new Set(arraySecConcated)).filter((item) => item !== "null");
                    
                    let num = 0;
                    let maxVisibleSecond = Number(localStorage.getItem("propertiesMaxSecond")); //

                let getAllAbsoluteSecond = localStorage.getItem("propertiesAbsoluteSecond"); // get all comp
                let arrayASecond = getAllAbsoluteSecond.split(','); // make array
                let arrayStringAbsoluteSecond = Array.from(new Set(arrayASecond)).filter((item) => item !== "null"); // without null
                let arrayAbsoluteFilteredSecond = arrayStringAbsoluteSecond.filter((item) => item > maxVisibleSecond); // all bigger of maxVisible

                arrayAbsoluteFilteredSecond.forEach(function(element) {
                    if(document.getElementById(element) !== null) {
                    document.getElementById(element).style.display = "none";
                    num++;
                    }
                })
            
                        arrayStringSec.forEach(function(element) {
            
                        document.getElementById(element).childNodes[0].className = "comp-second";
                            
                            num++
                        })
                    }
        }
        addStyle();
        }
        return (
<div style={{ margin: "0 5% 0 5%" }}>
<button onClick={this.axiosGet}>Get</button>
<button onClick={this.axiosUpdate}>Update</button>
  <Navbar sticky="top" bg="light" expand="lg">
  <Navbar.Brand onClick={this.mainNav} href="#main-nav">UpTime</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link onClick={this.chartNav} href="#chart-nav">Charts</Nav.Link>
      <Nav.Link onClick={this.reportsNav} href="#reports-nav">Reports</Nav.Link>
      <Nav.Link onClick={this.reservationNav} href="#reservation-nav">Reservations</Nav.Link>
      <Nav.Link onClick={this.workingPanelNav} href="#working-panel">Working Panel</Nav.Link>
    </Nav>
    <Nav pullRight>
        <Nav.Link onClick={this.adminNav} href="#admin-dash">Admin</Nav.Link>
        <Nav.Link onClick={this.howItWorksNav} href="#how-it-works">How It Works</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
{this.state.mainNav && (
                <div className="component-flex" id="main-nav">
                    <div className="component-rows">
                        <ReactGridLayout
                        {...this.props}
                        layout={this.state.layout}
                        onLayoutChange={this.onLayoutChange}
                        isDraggable={this.state.draggable}
                        > 
                           <div key="1" data-grid={{ w: 2, h: 2, x: 0, y: 0 }} id="1">
                                <Comp className="comp" nmb={this.indexed(1)}/>
                            </div>
                            <div key="2" data-grid={{ w: 2, h: 2, x: 2, y: 0 }} id="2">
                                <Comp className="comp" nmb={this.indexed(2)}/>
                            </div>
                            <div key="3" data-grid={{ w: 2, h: 2, x: 4, y: 0 }} id="3">
                                 <Comp className="comp" nmb={this.indexed(3)}/>
                            </div>
                            <div key="4" data-grid={{ w: 2, h: 2, x: 6, y: 0 }} id="4">       
                                <Comp className="comp" nmb={this.indexed(4)}/>
                            </div>
                            <div key="5" data-grid={{ w: 2, h: 2, x: 8, y: 0 }} id="5">
                                <Comp className="comp" nmb={this.indexed(5)}/>
                             </div>
                            <div key="6" data-grid={{ w: 2, h: 2, x: 10, y: 0 }} id="6">
                                <Comp className="comp" nmb={this.indexed(6)} />
                            </div>

                            <div key="7" data-grid={{ w: 2, h: 2, x: 2, y: 1 }} id="7">
                                 <Comp className="comp" nmb={this.indexed(7)} />
                            </div>
                            <div key="8" data-grid={{ w: 2, h: 2, x: 4, y: 1 }} id="8">
                                 <Comp className="comp" nmb={this.indexed(8)} />
                            </div>
                            <div key="9" data-grid={{ w: 2, h: 2, x: 6, y: 1 }} id="9">
                                <Comp className="comp" nmb={this.indexed(9)} />
                            </div>
                            <div key="10" data-grid={{ w: 2, h: 2, x: 8, y: 1 }} id="10">
                                <Comp className="comp" nmb={this.indexed(10)} />
                            </div>          
                            <div key="11" data-grid={{ w: 2, h: 2, x: 0, y: 1 }} id="11">
                                <Comp nmb={this.indexed(11)}/>
                            </div>
                            <div key="12" data-grid={{ w: 2, h: 2, x: 2, y: 1 }} id="12">
                                <Comp nmb={this.indexed(12)}/>
                            </div>

                            <div key="13" data-grid={{ w: 2, h: 2, x: 4, y: 2 }} id="13">
                                 <Comp nmb={this.indexed(13)}/>
                            </div>
                            <div key="14" data-grid={{ w: 2, h: 2, x: 6, y: 2 }} id="14">       
                            <Comp nmb={this.indexed(14)}/>
                            </div>
                            <div key="15" data-grid={{ w: 2, h: 2, x: 8, y: 2 }} id="15">
                            <Comp nmb={this.indexed(15)}/>
                            </div>
                   
                            <div key="16" data-grid={{ w: 2, h: 2, x: 0, y: 3 }} id="16">
                            <Comp nmb={this.indexed(16)} />
                            </div>
                            <div key="17" data-grid={{ w: 2, h: 2, x: 2, y: 3 }} id="17">
                                 <Comp nmb={this.indexed(17)} />
                            </div>
                            <div key="18" data-grid={{ w: 2, h: 2, x: 4, y: 3 }} id="18">
                                 <Comp nmb={this.indexed(18)} />
                            </div>
                            <div key="19" data-grid={{ w: 2, h: 2, x: 6, y: 3 }} id="19">
                                <Comp nmb={this.indexed(19)} />
                            </div>
                            <div key="20" data-grid={{ w: 2, h: 2, x: 8, y: 3 }} id="20">
                                <Comp nmb={this.indexed(20)} />
                            </div>
                       

                        <div key="21" data-grid={{ w: 2, h: 2, x:0, y:4 }} id="21">
                            <Comp nmb={this.indexed(21)} />
                        </div>
                        <div key="22" data-grid={{ w: 2, h: 2, x:2, y:4 }} id="22">
                                <Comp nmb={this.indexed(22)} />
                        </div>
                        <div key="23" data-grid={{ w: 2, h: 2, x:4, y:4 }} id="23">
                            <Comp nmb={this.indexed(23)} />
                        </div>
                        <div key="24" data-grid={{ w: 2, h: 2, x:6, y:4 }} id="24">
                                <Comp nmb={this.indexed(24)} />
                        </div>
                        <div key="25" data-grid={{ w: 2, h: 2, x:8, y:4 }} id="25">
                            <Comp nmb={this.indexed(25)} />
                        </div>
             

                        <div key="26" data-grid={{ w: 2, h: 2, x:0 , y:5  }} id="26">
                            <Comp nmb={this.indexed(26)} />
                        </div>
                        <div key="27" data-grid={{ w: 2, h: 2, x:2 , y:5  }} id="27">
                                <Comp nmb={this.indexed(27)} />
                        </div>
                        <div key="28" data-grid={{ w: 2, h: 2, x:4 , y:5  }} id="28">
                            <Comp nmb={this.indexed(28)} />
                        </div>
                        <div key="29" data-grid={{ w: 2, h: 2, x:6 , y:5  }} id="29">
                                <Comp nmb={this.indexed(29)} />
                        </div>
                        <div key="30" data-grid={{ w: 2, h: 2, x:8 , y:6  }} id="30">
                            <Comp nmb={this.indexed(30)} />
                        </div>
              

                        <div key="31" data-grid={{ w: 2, h: 2, x:0 , y:6 }} id="31">
                            <Comp nmb={this.indexed(31)} />
                        </div>
                        <div key="32" data-grid={{ w: 2, h: 2, x:2 , y:6 }} id="32">
                                <Comp nmb={this.indexed(32)} />
                        </div>
                        <div key="33" data-grid={{ w: 2, h: 2, x:4 , y:6 }} id="33">
                            <Comp nmb={this.indexed(33)} />
                        </div>
                        <div key="34" data-grid={{ w: 2, h: 2, x:6 , y:6 }} id="34">
                                <Comp nmb={this.indexed(34)} />
                        </div>
                        <div key="35" data-grid={{ w: 2, h: 2, x:8 , y:6 }} id="35">
                            <Comp nmb={this.indexed(35)} />
                        </div>
             

                        <div key="36" data-grid={{ w: 2, h: 2, x:0 , y:6 }} id="36">
                            <Comp nmb={this.indexed(36)} />
                        </div>
                        <div key="37" data-grid={{ w: 2, h: 2, x:2 , y:6 }} id="37">
                                <Comp nmb={this.indexed(37)} />
                        </div>
                        <div key="38" data-grid={{ w: 2, h: 2, x:4 , y:6 }} id="38">
                            <Comp nmb={this.indexed(38)} />
                        </div>
                        <div key="39" data-grid={{ w: 2, h: 2, x:6 , y:6 }} id="39">
                                <Comp nmb={this.indexed(39)} />
                        </div>
                        <div key="40" data-grid={{ w: 2, h: 2, x:8 , y:6 }} id="40">
                            <Comp nmb={this.indexed(40)} />
                        </div>
           

                        <div key="41" data-grid={{ w: 2, h: 2, x:0 , y:6 }} id="41">
                            <Comp nmb={this.indexed(41)} />
                        </div>
                        <div key="42" data-grid={{ w: 2, h: 2, x:2 , y:6 }} id="42">
                                <Comp nmb={this.indexed(42)} />
                        </div>
                        <div key="43" data-grid={{ w: 2, h: 2, x:4 , y:6 }} id="43">
                            <Comp nmb={this.indexed(43)} />
                        </div>
                        <div key="44" data-grid={{ w: 2, h: 2, x:6 , y:6 }} id="44">
                                <Comp nmb={this.indexed(44)} />
                        </div>
                        <div key="45" data-grid={{ w: 2, h: 2, x:8 , y:6 }} id="45">
                            <Comp nmb={this.indexed(45)} />
                        </div>
             

                        <div key="46" data-grid={{ w: 2, h: 2, x:0 , y:6 }} id="46">
                            <Comp nmb={this.indexed(46)} />
                        </div>
                        <div key="47" data-grid={{ w: 2, h: 2, x:2 , y:6 }} id="47">
                                <Comp nmb={this.indexed(47)} />
                        </div>
                        <div key="48" data-grid={{ w: 2, h: 2, x:4 , y:6 }} id="48">
                            <Comp nmb={this.indexed(48)} />
                        </div>
                        <div key="49" data-grid={{ w: 2, h: 2, x:6 , y:6 }} id="49">
                                <Comp nmb={this.indexed(49)} />
                        </div>
                        <div key="50" data-grid={{ w: 2, h: 2, x:8 , y:6 }} id="50">
                            <Comp nmb={this.indexed(50)} />
                        </div> 

                        <div key="101" data-grid={{ w: 2, h:2, x:0 , y: 5 }} id="101">
                            <Comp className="comp-second" nmb={this.indexed(101)} />
                        </div>
                        <div key="102" data-grid={{ w: 2, h:2, x:2 , y: 5 }} id="102">
                                <Comp className="comp-second" nmb={this.indexed(102)} />
                        </div>
                        <div key="103" data-grid={{ w: 2, h:2, x:4 , y: 5 }} id="103">
                            <Comp className="comp-second" nmb={this.indexed(103)} />
                        </div>
                        <div key="104" data-grid={{ w: 2, h:2, x:6 , y: 5 }} id="104">
                            <Comp className="comp-second" nmb={this.indexed(104)} />
                        </div>
                        <div key="105" data-grid={{ w: 2, h:2, x:8 , y: 5 }} id="105">
                            <Comp className="comp-second" nmb={this.indexed(105)} />
                        </div>
            

                        <div key="106" data-grid={{ w: 2, h:2, x:0 , y:5 }} id="106">
                            <Comp className="comp-second" nmb={this.indexed(106)} />
                        </div>
                        <div key="107" data-grid={{ w: 2, h:2, x:2 , y:5 }} id="107">
                            <Comp className="comp-second" nmb={this.indexed(107)} />
                        </div>
                        <div key="108" data-grid={{ w: 2, h:2, x:4 , y:5 }} id="108">
                            <Comp className="comp-second" nmb={this.indexed(108)} />
                        </div>
                        <div key="109" data-grid={{ w: 2, h:2, x:6 , y:5 }} id="109">
                            <Comp className="comp-second" nmb={this.indexed(109)} />
                        </div>
                        <div key="110" data-grid={{ w: 2, h:2, x:8 , y:5 }} id="110">
                            <Comp className="comp-second" nmb={this.indexed(110)} />
                        </div>
         

                        <div key="111" data-grid={{ w: 2, h: 2, x:0 , y:5 }} id="111">
                            <Comp nmb={this.indexed(111)} />
                        </div>
                        <div key="112" data-grid={{ w: 2, h: 2, x:2 , y:5 }} id="112">
                                <Comp  nmb={this.indexed(112)} />
                        </div>
                        <div key="113" data-grid={{ w: 2, h: 2, x:4 , y:5 }} id="113">
                            <Comp nmb={this.indexed(113)} />
                        </div>
                        <div key="114" data-grid={{ w: 2, h: 2, x:6 , y:5 }} id="114">
                                <Comp nmb={this.indexed(114)} />
                        </div>
                        <div key="115" data-grid={{ w: 2, h: 2, x:8 , y:5 }} id="115">
                            <Comp nmb={this.indexed(115)} />
                        </div>
       

                        <div key="116" data-grid={{ w: 2, h: 2, x:0 , y:5 }} id="116">
                            <Comp nmb={this.indexed(116)} />
                        </div>
                        <div key="117" data-grid={{ w: 2, h: 2, x:2 , y:5 }} id="117">
                                <Comp  nmb={this.indexed(117)} />
                        </div>
                        <div key="118" data-grid={{ w: 2, h: 2, x:4 , y:5 }} id="118">
                            <Comp nmb={this.indexed(118)} />
                        </div>
                        <div key="119" data-grid={{ w: 2, h: 2, x:6 , y:5 }} id="119">
                                <Comp nmb={this.indexed(119)} />
                        </div>
                        <div key="120" data-grid={{ w: 2, h: 2, x:8 , y:5 }} id="120">
                            <Comp nmb={this.indexed(120)} />
                        </div>
                        </ReactGridLayout>
                </div>        
                </div> 
    )}       
            {this.state.chartNav && (
        <div id="chart-nav">
            <div>
                <h3>First set</h3>
                 <Chart />
            
             </div>

             <hr />

             <div>
                <h3>Second set</h3>
                 <ChartSecond />
          
            </div>
            <hr />
            <div>
                <h3>Reservations S1</h3>
                 <ChartR />
            </div>
            <hr />
            <div>
                <h3>Reservations S2</h3>
                 <ChartR2 />
            </div>
             </div>
            )}     
               

            
            {this.state.workingPanelNav && (
                <div style={{ textAlign: "center" }} id="working-panel">
    
       
                    <h3>Restart</h3>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Component number (for example enter: 5) *just number"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        value={this.state.close}
                        onChange={this.handleChangeClose.bind(this)}
                        />
                        <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" onClick={this.toggleClose} style={{cursor: "pointer"}}>Proceed</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                    <h3>Annul</h3>
                    <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Component number (for example enter: 5) *just number"
                    aria-label=""
                    aria-describedby="basic-addon2"
                    value={this.state.erase}
                    onChange={this.handleChangeErase.bind(this)}
                    />
                    <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" onClick={this.toggleErase} style={{cursor: "pointer"}}>Erase</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                </div>
            )}


            {this.state.reservationNav && (
        <div id="reservation-nav">
                <div style={{ textAlign: "center" }} id="reservation-panel">
                    <h2 style={{ paddingBottom: "1em" }}>Reservation</h2>
       
                    <h3>Add reservation</h3>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Component number (for example enter: 5) *just number"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        value={this.state.reserveComp}
                        onChange={this.handleChangeReserveComp.bind(this)}
                        />
                        <FormControl
                        placeholder="Reservation start time (for example: 14) *just number"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        value={this.state.reserveTime}
                        onChange={this.handleChangeReserveTime.bind(this)}
                        />
                        <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" onClick={this.toggleReserve} style={{cursor: "pointer"}}>Proceed</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <div>
                    <h3 style={{ textAlign: "center" }}>Remove reservation</h3>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Component number"
                            aria-label=""
                            aria-describedby="basic-addon2"
                            value={this.state.reserveCompRemove}
                            onChange={this.handleChangeReserveCompRemove.bind(this)}
                        />
                        <FormControl
                            placeholder="Reservation start time"
                            aria-label=""
                            aria-describedby="basic-addon2"
                            value={this.state.reserveTimeRemove}
                            onChange={this.handleChangeReserveTimeRemove.bind(this)}
                        />
                        <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" onClick={this.toggleReserveRemove} style={{cursor: "pointer"}}>Remove</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
             </div>
                )}

            {this.state.reportsNav && (
        <div id="reports-nav">
                <div id="reports" style={{ textAlign: "center" }}>
                    <h2>Reports</h2>
                    <h4>Daily report</h4>
                    <div className="reports-centered">
                        <ButtonToolbar>
                            <Button variant="info" onClick={this.dailyReport, this.reload} style={{ cursor: "pointer" }}>Day</Button>
                        </ButtonToolbar>
                    </div>
                        <h5>Storage: {this.dailyReport()}</h5>
                    <hr />

                    <h5>Shifts reports</h5>
                    <div className="reports-centered">
                        <ButtonToolbar>
                            <Button variant="info" onClick={this.shiftReport1, this.reload} style={{ cursor: "pointer" }}>Shift 1</Button>
                        </ButtonToolbar>
                    </div>
                        <h6>First shift: {this.shiftReport1()}</h6>
                    <div className="reports-centered">
                        <ButtonToolbar>
                            <Button variant="info" onClick={this.shiftReport2, this.reload} style={{ cursor: "pointer" }}>Shift 2</Button>
                        </ButtonToolbar>
                    </div>
                        <h6>Second shift: {this.shiftReport2()}</h6>
                    <div className="reports-centered">
                        <ButtonToolbar>
                            <Button variant="info" onClick={this.shiftReport3, this.reload} style={{ cursor: "pointer" }}>Shift 3</Button>
                        </ButtonToolbar>
                    </div>
                        <h6>Third shift: {this.shiftReport3()}</h6>

                        <hr />

                    <h5>End of day</h5>
                    <div className="reports-centered">
                        <ButtonToolbar>
                            <Button variant="danger" onClick={this.endOfDay}>End</Button>
                        </ButtonToolbar>
                    </div>
                        <h5>{this.dailyReport()}</h5>
                </div>
            
                <div style={{ textAlign: "center" }}>
                    <h2>Price/shifts report</h2>
                    <ButtonToolbar style={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="info" onClick={this.shiftsHourReport} style={{ cursor: "pointer", textAlign: "center" }}>Click!</Button>
                    </ButtonToolbar>
                    <h3>Hour price: {this.state.hourPrice}</h3>
                    <h3>Hour price second set: {this.state.hourPriceSecond}</h3>
                    <h3>First shift start: {this.state.firstShiftStart}</h3>
                    <h3>First shift end: {this.state.firstShiftEnd}</h3>
                    <h3>Second shift start: {this.state.secondShiftStart}</h3>
                    <h3>Second shift end: {this.state.secondShiftEnd}</h3>
                    <h3>Third shift start: {this.state.thirdShiftStart}</h3>
                    <h3>Third shift end: {this.state.thirdShiftEnd}</h3>
                </div>

                <hr />
                <div style={{ textAlign: "center" }}>
                    <h2>Current promotions</h2>
                    <h3>On {localStorage.getItem("promoUse")} hours plus {localStorage.getItem("promoHours")}</h3>
                </div>
                </div>
                )}

                {this.state.adminNav && (
                <div id="admin-dash">
                <h2 style={{ paddingBottom: "1em" }}>Admin Dashboard</h2>
                <p style={{ marginTop: "-30px" }}>Do not fulfill this form between 00:00h and 06:00h</p>
         
            
            <h3>Define number of components</h3>
                <h4>First Set (10-50)</h4>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Components number (default 10)"
                    aria-label=""
                    aria-describedby="basic-addon2"
                    value={this.state.compNmb}
                    onChange={this.toggleNmbOfComp.bind(this)}
                    />
                    <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" onClick={this.nmbOfComp} style={{cursor: "pointer"}}>Proceed</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <h4>Second Set (10-20)</h4>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Components number second set (default 10)"
                    aria-label=""
                    aria-describedby="basic-addon2"
                    value={this.state.compNmbSec}
                    onChange={this.toggleNmbOfCompSec.bind(this)}
                    />
                    <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" onClick={this.nmbOfCompSec} style={{cursor: "pointer"}}>Proceed</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                
                <hr />

                <h3>Add Prices</h3>
                <h4>First Set (one hour price)</h4>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Hour Price *required"
                    aria-label="Hour Price"
                    aria-describedby="basic-addon2"
                    value={this.state.e}
                    onChange={this.handleChange.bind(this)}
                    />
                    <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" onClick={this.hourPrice} style={{cursor: "pointer"}}>Proceed</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <hr />
                
                <h4>Second Set(one hour price)</h4>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Hour Price second set *required"
                    aria-label="Hour Price Second Set"
                    aria-describedby="basic-addon2"
                    value={this.state.eSecond}
                    onChange={this.handleChangeSecondSet.bind(this)}
                    />
                    <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" onClick={this.hourPriceSecondSet} style={{cursor: "pointer"}}>Proceed</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <hr />

                <h4>First Set All Day Price</h4>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Add price for whole day usage"
                    aria-label="All Day Price"
                    aria-describedby="basic-addon2"
                    value={this.state.eDay}
                    onChange={this.handleChangeDayPrice.bind(this)}
                    />
                    <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" onClick={this.allDayPrice} style={{cursor: "pointer"}}>Proceed</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <hr />

                <h4>Second Set All Day Price</h4>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Add price for whole day usage"
                    aria-label="All Day Price Second Set"
                    aria-describedby="basic-addon2"
                    value={this.state.eDaySecond}
                    onChange={this.handleChangeDayPriceSecondSet.bind(this)}
                    />
                    <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" onClick={this.allDayPriceSecondSet} style={{cursor: "pointer"}}>Proceed</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <hr />

                <h3>Add promotions</h3>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="On how much hours of using (example: 3)"
                    aria-label="How much hours"
                    aria-describedby="basic-addon2"
                    value={this.state.promoUse}
                    onChange={this.handleChangePromoUse.bind(this)}
                    />
                    <FormControl
                    placeholder="How much promo (in hours) (example: 1)"
                    aria-label="How much promo"
                    aria-describedby="basic-addon2"
                    value={this.state.promoHours}
                    onChange={this.handleChangePromoHours.bind(this)}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" onClick={this.promoCode} style={{cursor: "pointer"}}>Add promo code</InputGroup.Text>
                    </InputGroup.Append>
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" onClick={this.removePromoCode} style={{cursor: "pointer"}}>Remove promo code</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <hr />

                <h3>Define shifts</h3>
                <div id="firstShift">
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>First shift start</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend" onClick={this.firstShiftStart} style={{cursor: "pointer"}}>Select</InputGroup.Text>
                        </InputGroup.Prepend>
                    <Form.Control id="firstShiftStart" as="select">
                        <option value="None">Select from dropdown list</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                    </Form.Control>
                    </InputGroup>
                    </Form.Group>
     
               <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>First shift end</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend" onClick={this.firstShiftEnd} style={{cursor: "pointer"}}>Select</InputGroup.Text>
                        </InputGroup.Prepend>
                    <Form.Control id="firstShiftEnd" as="select">
                        <option value="None">Select from dropdown list</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                    </Form.Control>
                    </InputGroup>
                    </Form.Group>
                </div>

                <div id="secondShift">
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Second shift start</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend" onClick={this.secondShiftStart} style={{cursor: "pointer"}}>Select</InputGroup.Text>
                        </InputGroup.Prepend>
                    <Form.Control id="secondShiftStart" as="select">
                        <option value="None">Select from dropdown list</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                    </Form.Control>
                    </InputGroup>
                    </Form.Group>
               
               <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Second shift end</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend" onClick={this.secondShiftEnd} style={{cursor: "pointer"}}>Select</InputGroup.Text>
                        </InputGroup.Prepend>
                    <Form.Control id="secondShiftEnd" as="select">
                        <option value="None">Select from dropdown list</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                    </Form.Control>
                    </InputGroup>
                    </Form.Group>
                </div>

                <div id="thirdShift">
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Third shift start</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend" onClick={this.thirdShiftStart} style={{cursor: "pointer"}}>Select</InputGroup.Text>
                        </InputGroup.Prepend>
                    <Form.Control id="thirdShiftStart" as="select">
                        <option value="None">Select from dropdown list</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                    </Form.Control>
                    </InputGroup>
                    </Form.Group>
            
               <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Third shift end</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend" onClick={this.thirdShiftEnd} style={{cursor: "pointer"}}>Select</InputGroup.Text>
                        </InputGroup.Prepend>
                    <Form.Control id="thirdShiftEnd" as="select">
                        <option value="None">Select from dropdown list</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                    </Form.Control>
                    </InputGroup>
                    </Form.Group>
                    </div>

                    <h3>Arrangement of components</h3>
                    <h4>Drag and drop</h4>
                    <ButtonToolbar style={{ display: "flex", justifyContent: "center", alignItems: "space-between" }}>
                        <Button variant="primary" onClick={this.dragAndDrop.bind(this)} style={{ cursor: "pointer", textAlign: "center" }}>On/off</Button>
                    </ButtonToolbar>
                    <h4>Restart drag and drop (back to default)</h4>
                    <Button variant="primary" onClick={this.resetLayout.bind(this)} style={{ cursor: "pointer", textAlign: "center" }}>Restart</Button>
                    
                    <hr />

            <div style={{ textAlign: "center", margin: "20px 0 20px 0" }}>
                <Button variant="primary" onClick={() => {this.setState({ adminNav: !this.state.adminNav }); window.location.reload()}} style={{ cursor: "pointer", textAlign: "center", padding: "0.5em 2em 0.5em 2em" }}>Done</Button>
            </div>
        </div>
        )}
  </div>
        );

    }
}

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }
  
  function saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-7",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }

export default CompAll;