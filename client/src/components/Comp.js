import React, { Component } from 'react';
import { Container, ButtonToolbar, Button, InputGroup, FormControl } from 'react-bootstrap';
import './CompAllStyle.css';
import axios from 'axios';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            on: false,
            main: false,
            mainBTN: false,
            allDayConfirm: false,
            allDayConfirmed: false,
            open: false,
            start: false,
            end: false,
            timePast: "",
            input: false,
            paymentDiv: false,
            inputGreen: false,
            inputYellow: false,
            inputOrange: false,
            over: false,
            over30: false,
            over10: false,
            inputValue: "",
            inputStartMillisec: "",
            inputStart: "",
            inputEnd: "",
            openStart: "",
            value: "",
            hasPassed: false,
            openComponent: false,
            compDidMount: false,
            startMilis: "",
            updating: false
        }

        const hourPrice = this.props.nmb < 100 ? localStorage.getItem("hourPrice") : localStorage.getItem("hourPriceSecond");

        const firstShiftStart = localStorage.getItem("firstShiftStart");
        const firstShiftEnd = localStorage.getItem("firstShiftEnd");
        const secondShiftStart = localStorage.getItem("secondShiftStart");
        const secondShiftEnd = localStorage.getItem("secondShiftEnd");
        const thirdShiftStart = localStorage.getItem("thirdShiftStart");
        const thirdShiftEnd = localStorage.getItem("thirdShiftEnd");

        this.msToTime = (duration) => { //get time by hours, minutes and seconds of client timezone
            const timeZone = () => new Date().getTimezoneOffset(); //-60
            const x = Math.abs(timeZone()) / 60; //1

            var milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60);
            const hours = () => {
                if(timeZone() < 0) {
                   return parseInt((duration / (1000 * 60 * 60) % 24 + x)) < 10 ? "0" + parseInt((duration / (1000 * 60 * 60) % 24 + x)) : parseInt((duration / (1000 * 60 * 60) % 24 + x));
                   
                }
                if(timeZone() > 0) {
                   return parseInt((duration / (1000 * 60 * 60) % 24 - x)) < 10 ? "0" + parseInt((duration / (1000 * 60 * 60) % 24 - x)) : parseInt((duration / (1000 * 60 * 60) % 24 - x));
                   
                }
                if(timeZone() == 0) {
                  return parseInt((duration / (1000 * 60 * 60) % 24)) < 10 ? "0" + parseInt((duration / (1000 * 60 * 60) % 24)) : parseInt((duration / (1000 * 60 * 60) % 24));
                  
                }
            }
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
    
            return hours() + ":" + minutes + ":" + seconds;
    }
            this.msToTimeRegular = (duration) => { //for getting minutes and seconds that has passed
                var milliseconds = parseInt((duration % 1000) / 100),
                seconds = parseInt((duration / 1000) % 60),
                minutes = parseInt((duration / (1000 * 60)) % 60),
                hours = parseInt((duration / (1000 * 60 * 60)) % 24);
        
                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;
        
                return hours + ":" + minutes + ":" + seconds;
            }
    

        this.openPrice = (millisecondsPlayed) => {
            let millsToMin = millisecondsPlayed / 1000 / 60;
            let minutePrice = Number(hourPrice) / 60;

            return (millsToMin * minutePrice).toFixed(2) + "$";
        }

        this.openPriceTimer = (millisecondsPlayed) => {
            let millsToMin = millisecondsPlayed / 1000 / 60;
            let minutePrice = Number(hourPrice) / 60;

            return (millsToMin * minutePrice).toFixed(2) + "$";
        }

        this.normalPrice = (money) => {
            let hourTime = money / Number(hourPrice); //1
            let paidToMillisec = hourTime * 60 * 60 * 1000; //millisec of paid time

            return paidToMillisec + this.state.inputStartMillisec;
        }

        this.normalPriceLS = (money) => {
            let hourTime = money / Number(hourPrice); //1
            let paidToMillisec = hourTime * 60 * 60 * 1000; //millisec of paid time
            let timeEnd = paidToMillisec + Number(localStorage.getItem(this.props.nmb + "normalStart"))
            return timeEnd; 
        }
        this.over = () => {
            let a = localStorage.getItem(this.props.nmb + "normalStart");
            let b = this.normalPrice(localStorage.getItem(this.props.nmb + "timePrice"));
            return this.msToTime(a + b);
        }

        this.toggle = () => {
            this.setState({
                on: !this.state.on,
                main: !this.state.main
            })
        }
        this.toggleAllDay = () => {
            localStorage.setItem(this.props.nmb + "allDayDual", true);
            this.setState({
                on: !this.state.on,
                allDayConfirm: !this.state.allDayConfirm
            })
        }
        this.toggleOpen = () => {
            this.setState({
                on: !this.state.on,
                open: !this.state.open
            })
        }
        this.toggleConfirm = () => {  
        if(this.props.nmb < 100 && localStorage.getItem("allDayPrice") == null || this.props.nmb >= 100 && localStorage.getItem("allDayPriceSecondSet") == null) {
                return alert("Enter price for whole day usage!")
            }
        if(this.props.nmb < 100) {
            localStorage.removeItem(this.props.nmb + "allDayDual");
            let nmbSuper = [localStorage.getItem(this.props.nmb + "allDay")]; // 
            let priceArr = [localStorage.getItem("allDayPrice")];
            let firstShift = [localStorage.getItem("allDayFirstShift")];
            let secondShift = [localStorage.getItem("allDaySecondShift")];
            let thirdShift = [localStorage.getItem("allDayThirdShift")];
            
            this.setState({
                allDayConfirm: !this.state.allDayConfirm,
                allDayConfirmed: !this.state.allDayConfirmed
            })

            localStorage.setItem(this.props.nmb + "allDay", localStorage.getItem("allDayPrice")); // set new value to LS
            let nmb = [localStorage.getItem(this.props.nmb + "allDay")]; // get new value from LS
            let nmbConcat = nmb.concat(nmbSuper); // concat all values with new value 
            localStorage.setItem(this.props.nmb + "allDay", nmbConcat); // set all values to LS
            localStorage.setItem(this.props.nmb + "normalEnd", 24);
            
             let collectedTime = new Date().getHours();

            if(Number(collectedTime) >= firstShiftStart && Number(collectedTime) < firstShiftEnd) {
                localStorage.setItem("allDayFirstShift", localStorage.getItem("allDayPrice")); // set new value to LS
                let nmb = [localStorage.getItem("allDayFirstShift")]; // get new value from LS
                let nmbConcat = nmb.concat(firstShift); // concat all values with new value 
                localStorage.setItem("allDayFirstShift", nmbConcat); //ako je to prvi entri a nmb super vec ima entry onda ne concatuje
            }
            if(Number(collectedTime) >= secondShiftStart && Number (collectedTime) < secondShiftEnd) {
                localStorage.setItem("allDaySecondShift", localStorage.getItem("allDayPrice")); // set new value to LS
                let nmb = [localStorage.getItem("allDaySecondShift")]; // get new value from LS
                let nmbConcat = nmb.concat(secondShift); // concat all values with new value 
                localStorage.setItem("allDaySecondShift", nmbConcat);
            }
            if(Number(collectedTime) >= thirdShiftStart && Number(collectedTime) < 24 || Number(collectedTime) < thirdShiftEnd) {
                localStorage.setItem("allDayThirdShift", localStorage.getItem("allDayPrice")); // set new value to LS
                let nmb = [localStorage.getItem("allDayThirdShift")]; // get new value from LS
                let nmbConcat = nmb.concat(thirdShift); // concat all values with new value 
                localStorage.setItem("allDayThirdShift", nmbConcat);
            }
        }
        if(this.props.nmb >= 100) {
            localStorage.removeItem(this.props.nmb + "allDayDual");
            let nmbSuper = [localStorage.getItem(this.props.nmb + "allDay")];  
            let priceArr = [localStorage.getItem("allDayPriceSecondSet")];
            let firstShift = [localStorage.getItem("allDayFirstShiftSecondSet")];
            let secondShift = [localStorage.getItem("allDaySecondShiftSecondSet")];
            let thirdShift = [localStorage.getItem("allDayThirdShiftSecondSet")];
            
            this.setState({
                allDayConfirm: !this.state.allDayConfirm,
                allDayConfirmed: !this.state.allDayConfirmed
            })

            localStorage.setItem(this.props.nmb + "allDay", localStorage.getItem("allDayPriceSecondSet")); // set new value to LS
            let nmb = [localStorage.getItem(this.props.nmb + "allDay")]; // get new value from LS
            let nmbConcat = nmb.concat(nmbSuper); // concat all values with new value 
            localStorage.setItem(this.props.nmb + "allDay", nmbConcat); // set all values to LS
            localStorage.setItem(this.props.nmb + "normalEnd", 24);
            
             let collectedTime = new Date().getHours();

            if(Number(collectedTime) >= firstShiftStart && Number(collectedTime) < firstShiftEnd) {
                localStorage.setItem("allDayFirstShiftSecondSet", localStorage.getItem("allDayPriceSecondSet")); // set new value to LS
                let nmb = [localStorage.getItem("allDayFirstShiftSecondSet")]; // get new value from LS
                let nmbConcat = nmb.concat(firstShift); // concat all values with new value 
                localStorage.setItem("allDayFirstShiftSecondSet", nmbConcat); //ako je to prvi entri a nmb super vec ima entry onda ne concatuje
            }
            if(Number(collectedTime) >= secondShiftStart && Number (collectedTime) < secondShiftEnd) {
                localStorage.setItem("allDaySecondShiftSecondSet", localStorage.getItem("allDayPriceSecondSet")); // set new value to LS
                let nmb = [localStorage.getItem("allDaySecondShiftSecondSet")]; // get new value from LS
                let nmbConcat = nmb.concat(secondShift); // concat all values with new value 
                localStorage.setItem("allDaySecondShiftSecondSet", nmbConcat);
            }
            if(Number(collectedTime) >= thirdShiftStart && Number(collectedTime) < 24 || Number(collectedTime) < thirdShiftEnd) {
                localStorage.setItem("allDayThirdShiftSecondSet", localStorage.getItem("allDayPriceSecondSet")); // set new value to LS
                let nmb = [localStorage.getItem("allDayThirdShiftSecondSet")]; // get new value from LS
                let nmbConcat = nmb.concat(thirdShift); // concat all values with new value 
                localStorage.setItem("allDayThirdShiftSecondSet", nmbConcat);
            }
        }
        
        }
        this.toggleStart = () => {
            this.setState({
                open: !this.state.open,
                start: !this.state.start,
                openStart: Date.now()
            })
            if(localStorage.getItem(this.props.nmb + "started") !== null) {
                localStorage.removeItem(this.props.nmb + "started");
            }
            localStorage.setItem(this.props.nmb + "started", Date.now());
            localStorage.setItem(this.props.nmb + "normalEnd", 24.00);
        }
        this.toggleBack = () => {
            this.setState({
                on: !this.state.on,
                open: !this.state.open
            })
        }
        this.toggleBackAllDay = () => {
            this.setState({
                allDayConfirm: !this.state.allDayConfirm,
                on: !this.state.on,
            })
            localStorage.removeItem(this.props.nmb + "allDayDual");
        }
        this.toggleEnd = () => {
            let nmbSuper = [localStorage.getItem(this.props.nmb)]; // get all values from LS
            this.setState({
                start: !this.state.start,
                end: !this.state.end,
                timePast: "",
                openStart: localStorage.getItem(this.props.nmb + "started")
            })
            if (this.state.hasPassed !== false) {
                this.setState({
                    hasPassed: !this.state.hasPassed
                })
            } 
            if(localStorage.getItem(this.props.nmb + "copy-closed")) {
                localStorage.removeItem(this.props.nmb + "collectedTime");
                localStorage.setItem(this.props.nmb + "copy-closed", "opened");
                return alert("Component was restarted before closing! Click Close button. Component has been processed.")
            } else {
                localStorage.setItem(this.props.nmb + "ended", Date.now()); //Milliseconds of ended time
            }
            
            localStorage.setItem(this.props.nmb, Date.now() - localStorage.getItem(this.props.nmb + "started")); // set new value to LS
            let nmb = [localStorage.getItem(this.props.nmb)]; // get new value from LS
            let nmbConcat = nmb.concat(nmbSuper); // concat all values with new value 
            localStorage.setItem(this.props.nmb, nmbConcat); // set all values to LS

            let collectedTime = new Date().getHours();

            if(Number(collectedTime) >= firstShiftStart && Number(collectedTime) < firstShiftEnd) {
                localStorage.setItem(this.props.nmb + "firstShift",  Date.now() - localStorage.getItem(this.props.nmb + "started")); // set new value to LS
                let nmb = [localStorage.getItem(this.props.nmb + "firstShift")]; // get new value from LS
                let nmbConcat = nmb.concat(nmbSuper); // concat all values with new value 
                localStorage.setItem(this.props.nmb + "firstShift", nmbConcat); //ako je to prvi entri a nmb super vec ima entry onda ne concatuje
            }
            if(Number(collectedTime) >= secondShiftStart && Number (collectedTime) < secondShiftEnd) {
                localStorage.setItem(this.props.nmb + "secondShift", Date.now() - localStorage.getItem(this.props.nmb + "started")); // set new value to LS
                let nmb = [localStorage.getItem(this.props.nmb + "secondShift")]; // get new value from LS
                let nmbConcat = nmb.concat(nmbSuper); // concat all values with new value 
                localStorage.setItem(this.props.nmb + "secondShift", nmbConcat);
            }
            if(Number(collectedTime) >= thirdShiftStart && Number(collectedTime) < 24 || Number(collectedTime) < thirdShiftEnd) {
                localStorage.setItem(this.props.nmb + "thirdShift", Date.now() - localStorage.getItem(this.props.nmb + "started")); // set new value to LS
                let nmb = [localStorage.getItem(this.props.nmb + "thirdShift")]; // get new value from LS
                let nmbConcat = nmb.concat(nmbSuper); // concat all values with new value 
                localStorage.setItem(this.props.nmb + "thirdShift", nmbConcat);
            }

            localStorage.removeItem(this.props.nmb + "collectedTime");
            localStorage.setItem(this.props.nmb + "copy-closed", "opened");
        }
        this.toggleClose = () => {
                this.setState({
                    end: !this.state.end,
                    main: !this.state.main,
                    timePast: "",
                })
                localStorage.removeItem(this.props.nmb + "started");
                localStorage.removeItem(this.props.nmb + "ended");
                localStorage.removeItem(this.props.nmb + "copy-closed");
                localStorage.removeItem(this.props.nmb + "normalEnd");
        }
        this.handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }
        this.inputPay = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                    if(localStorage.getItem("promoHours") !== null) {
                        localStorage.setItem(this.props.nmb + "promoHours", "promo")
                    }
                    let promoHour = Number(localStorage.getItem("promoHours")); // 1
                    let promoHourMillisec = promoHour * 3600000;
                    let promoHourInputValue = promoHour * hourPrice; // 70

                    if(localStorage.getItem(this.props.nmb + "inputValue") === null) {
                        localStorage.setItem(this.props.nmb + "inputValue", e.target.value);
                    }

                    localStorage.setItem(this.props.nmb + "promoUseHours", Number(localStorage.getItem("promoUse")) * (this.props.nmb < 100 ? Number(localStorage.getItem("hourPrice")) : Number(localStorage.getItem("hourPriceSecond"))));
                    

                    const endGame = this.normalPriceLS(this.state.inputValue); // millis of end time
                
                    let newDate = Number(hourPrice) * Number(localStorage.getItem("promoUse")) == e.target.value ? Date.now() + endGame + Number(promoHourMillisec) : Date.now() + endGame;
    
                    let newDateHours = new Date(newDate).getHours();
                    
                    if(localStorage.getItem(this.props.nmb + "reserved") !== null) {
                    let getLS = localStorage.getItem(this.props.nmb + "reserved");
                    let arr = getLS.split(',');
                    let min = Math.min(...arr);
    
                    if(localStorage.getItem(this.props.nmb + "reserved") && Number(min) <= Number(newDateHours)/* && Number(newDate.toFixed(0)) > Number(localStorage.getItem("overtime"))*/) {
                        this.setState({
                            main: !this.state.main,
                            paymentDiv: !this.state.paymentDiv
                        })
                        return alert("Can not do that! This component is reserved at: " + min + " hours");
                     }
                    }
                   
                    if(localStorage.getItem("overtime") && Number(newDate.toFixed(0)) > Number(localStorage.getItem("overtime"))) {
                           this.setState({
                               main: !this.state.main,
                               on: !this.state.on
                           })
                           alert("Can not do that! It goes beyond last shift over.");
                           return window.location.reload();
                   }
    
                    this.setState({
                    inputStartMillisec: Date.now(),
                    inputStart: this.msToTime(Date.now()),
                    value: this.props.value,
                    mainBTN: !this.state.mainBTN,
                    paymentDiv: !this.state.paymentDiv
                })
    
                let nmbSuper = [localStorage.getItem(this.props.nmb)]; // get everything in LS for this component as array (for concat)
                
                localStorage.setItem(this.props.nmb, (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0)); // push to LS
                
                let nmb = [localStorage.getItem(this.props.nmb)]; // get just pushed to LS (this erase by default LS existed values) example: 3600000 from LS
                let nmbConcat = nmb.concat(nmbSuper); // concat pushed and existing values => 3600000 concat [if something has in LS]
                localStorage.setItem(this.props.nmb, nmbConcat); // set concated array to LS (all values)
    
                localStorage.setItem(this.props.nmb + "normal", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
               
                localStorage.setItem(this.props.nmb + "normalStart", Date.now());
                localStorage.setItem(this.props.nmb + "timePrice", (this.state.inputValue)); 
    
                    let end = Number(hourPrice) * Number(localStorage.getItem("promoUse")) == e.target.value ? this.normalPriceLS(Number(localStorage.getItem(this.props.nmb + "timePrice")) + Number(promoHourInputValue)) : this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice"));
            
                    let normalEnd = new Date(end).getHours();
                    let normalEndMinutes = new Date(end).getMinutes();
                    let startTime = new Date().getHours();
                                        
                    localStorage.setItem(this.props.nmb + "normalEnd", normalEnd + '.' + normalEndMinutes)
                    
                    if(Number(startTime) >= firstShiftStart && Number(startTime) < firstShiftEnd) {
                            let getEverything = [localStorage.getItem(this.props.nmb + "firstShift")].filter(n => n !== null);
                            localStorage.setItem(this.props.nmb + "firstShift", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
                            let getJustPushedToLS = [localStorage.getItem(this.props.nmb + "firstShift")];
                            let concatedValues = getJustPushedToLS.concat(getEverything).filter(n => n !== null);
                            localStorage.setItem(this.props.nmb + "firstShift", concatedValues); 
                    }
                    if(Number(startTime) >= secondShiftStart && Number(startTime) < secondShiftEnd) {
                        let getEverything = [localStorage.getItem(this.props.nmb + "secondShift")];
                        localStorage.setItem(this.props.nmb + "secondShift", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
                        let getJustPushedToLS = [localStorage.getItem(this.props.nmb + "secondShift")];
                        let concatedValues = getJustPushedToLS.concat(getEverything);
                        localStorage.setItem(this.props.nmb + "secondShift", concatedValues); 
                    }
                    if(Number(startTime) >= thirdShiftStart && Number(startTime) < 24 || Number(startTime) < thirdShiftEnd) {  
                        let getEverything = [localStorage.getItem(this.props.nmb + "thirdShift")];
                        localStorage.setItem(this.props.nmb + "thirdShift", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
                        let getJustPushedToLS = [localStorage.getItem(this.props.nmb + "thirdShift")];
                        let concatedValues = getJustPushedToLS.concat(getEverything);
                        localStorage.setItem(this.props.nmb + "thirdShift", concatedValues); 
                    }   
                    
                    const timeTillEnd = Number(hourPrice) * Number(localStorage.getItem("promoUse")) === Number(localStorage.getItem(this.props.nmb + "inputValue")) ? this.normalPriceLS(Number(localStorage.getItem(this.props.nmb + "timePrice"))) + Number(promoHourMillisec) - Date.now() : this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")) - Date.now();

                    const time30 = async () => {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                resolve(this.setState({
                                    mainBTN: !this.state.mainBTN,
                                    over30: !this.state.over30
                                }))
                            }, Number(timeTillEnd) - 1800000 )
                        })
                    }
                    
                    const callAsync30 = async () => {
                        const result30 = await time30();
                    }
                    callAsync30();
    
                    const time10 = async () => {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                resolve(this.setState({
                                    over30: !this.state.over30,
                                    over10: !this.state.over10
                                }))
                            }, Number(timeTillEnd) - 600000)
                        })
                    }
                    
                    const callAsync10 = async () => {
                        const result10 = await time10();
                    }
                    callAsync10();
    
                    const timeOver = async () => {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                resolve(this.setState({
                                    over: !this.state.over, 
                                    mainBTN: this.state.mainBTN !== false ? !this.state.mainBTN : this.state.mainBTN,
                                    inputOrange: this.state.inputOrange !== false ? !this.state.inputOrange : this.state.inputOrange,
                                    over10: !this.state.over10
                                }))
                            }, timeTillEnd.toFixed(0));
                        })
                    }
                     const callAsync = async () => {
                        const result = await timeOver();
                    }
                    callAsync(); 
                }                
            }
            
            
        
        this.hasPassed = () => {
            this.setState({
                hasPassed: !this.state.hasPassed,
                start: !this.state.start
            })
        }
        this.toggleGreen = () => {
            this.setState({
                mainBTN: !this.state.mainBTN,
                inputGreen: !this.state.inputGreen,
            })
        }
        this.toggleYellow = () => {
            this.setState({
                inputGreen: this.state.inputGreen !== false ? !this.state.inputGreen : false,
                inputYellow: !this.state.inputYellow,
                over30: !this.state.over30
            })
        }
        this.toggleOrange = () => {
            this.setState({
                inputYellow: this.state.inputYellow !== false ? !this.state.inputYellow : false,
                inputOrange: !this.state.inputOrange,
                over10: !this.state.over10
            })
        }
        this.toggleCloseInputGreen = () => {
            this.setState({
                inputGreen: !this.state.inputGreen,
                mainBTN: !this.state.mainBTN,
            })
        }
        this.toggleCloseInputYellow = () => {
            this.setState({
                inputYellow: !this.state.inputYellow,
                over30: !this.state.over30
            })
        }
        this.toggleCloseInputOrange = () => {
            this.setState({
                inputOrange: !this.state.inputOrange,
                over10: !this.state.over10
            })
        }
        this.compOver = () => {
            this.setState({
                over: !this.state.over,
                main: !this.state.main
            })
            localStorage.removeItem(this.props.nmb + "normal");

            localStorage.removeItem(this.props.nmb + "normalStart");
            localStorage.removeItem(this.props.nmb + "normalEnd");
            localStorage.removeItem(this.props.nmb + "timePrice");
            localStorage.removeItem(this.props.nmb + "inputValue");
            localStorage.removeItem(this.props.nmb + "promoUseHours");
            localStorage.removeItem(this.props.nmb + "promoHours");
        }
    }
    componentDidUpdate() {
     /*   if(this.state.updating) {
            const addingToDB = () => {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-type": "application/json"
                    }
                }
                config.headers['x-auth-token'] = token;  
                console.log(config);
                    axios.post('/api/users/update', {
                    'id': localStorage.getItem('userId'), 
                    'items': JSON.stringify(Object.entries(localStorage).map(item => item).filter(item => item !== undefined))
            })
                    .then(res => console.log(res))       
                }
            addingToDB();
        }
        */
                 
        if(this.props.nmb < 100) {
            if(localStorage.getItem("propertiesAbsolute") === null) {
                localStorage.setItem("propertiesAbsolute", null)
            }
        let oldArray = localStorage.getItem("propertiesAbsolute");
        localStorage.setItem(this.props.nmb + "propsAbsolute", this.props.nmb);

        let getNewItem = localStorage.getItem(this.props.nmb + "propsAbsolute");
        let array = getNewItem.split(',');
        let oldArraySplit = oldArray.split(',');
        let concatArray = oldArraySplit.concat(array);
        let settedArray = Array.from(new Set(concatArray));

        localStorage.setItem("propertiesAbsolute", settedArray);
        }

        if(this.props.nmb >= 100) {
            if(localStorage.getItem("propertiesAbsoluteSecond") === null) {
                localStorage.setItem("propertiesAbsoluteSecond", null)
            }
        let oldArray = localStorage.getItem("propertiesAbsoluteSecond");
        localStorage.setItem(this.props.nmb + "propsAbsoluteSecond", this.props.nmb);

        let getNewItem = localStorage.getItem(this.props.nmb + "propsAbsoluteSecond");
        let array = getNewItem.split(',');
        let oldArraySplit = oldArray.split(',');
        let concatArray = oldArraySplit.concat(array);
        let settedArray = Array.from(new Set(concatArray));

        localStorage.setItem("propertiesAbsoluteSecond", settedArray);
        }

    if(this.props.className === "comp") {
        if(localStorage.getItem("properties") === null) {
            localStorage.setItem("properties", null)
        }
        
        let oldArr = localStorage.getItem("properties");
        localStorage.setItem(this.props.nmb + "props", this.props.nmb); //1, 2, 3

        let getNew = localStorage.getItem(this.props.nmb + "props");
        let arr = getNew.split(','); // [1]
        let oldArrSplit = oldArr.split(','); // ["1" ,"2" ...]
        let concat = oldArrSplit.concat(arr);
        let setted = Array.from(new Set(concat));

        localStorage.setItem("properties", setted);

        let now = new Date().getHours();

    if(Number(localStorage.getItem(this.props.nmb + "reserved")) === Number(now) && localStorage.getItem(this.props.nmb + "reserved") !== null) {
        const endGame = this.normalPriceLS(this.state.inputValue);

        let newDate = Date.now() + endGame;

        let newDateHours = new Date(newDate).getHours();

        let now = new Date().getHours();
        
        let getLS = localStorage.getItem(this.props.nmb + "reserved");
        let arr = getLS.split(',');
        let min = Math.min(...arr);
        let minO = JSON.stringify(min);
      
        let filtered = arr.filter((item) => item !== minO);
        
        if(Number(newDateHours) == Number(localStorage.getItem(this.props.nmb + "reserved")) || Number(now) >= Number(min)) {
            localStorage.setItem(this.props.nmb + "reserved", filtered);
            alert("Component " + this.props.nmb + " has been reserved from: " + min + " h. You can use it now.")
        }
    } 
    }

    if(this.props.className === "comp-second") {
        if(localStorage.getItem("propertiesSecond") === null) {
            localStorage.setItem("propertiesSecond", null)
        }
        
        let oldArr = localStorage.getItem("propertiesSecond");
        localStorage.setItem(this.props.nmb + "propsSecond", this.props.nmb); //1, 2, 3

        let getNew = localStorage.getItem(this.props.nmb + "propsSecond");
        let arr = getNew.split(','); // [1]
        let oldArrSplit = oldArr.split(','); // ["1" ,"2" ...]
        let concat = oldArrSplit.concat(arr);
        let setted = Array.from(new Set(concat));

        localStorage.setItem("propertiesSecond", setted);

        let now = new Date().getHours();

    if(Number(localStorage.getItem(this.props.nmb + "reserved")) === Number(now) && localStorage.getItem(this.props.nmb + "reserved") !== null) {
        const endGame = this.normalPriceLS(this.state.inputValue);

        let newDate = Date.now() + endGame;

        let newDateHours = new Date(newDate).getHours();

        let getLS = localStorage.getItem(this.props.nmb + "reserved");
        let arr = getLS.split(',');
        let min = Math.min(...arr);
        let minO = JSON.stringify(min);
      
        let filtered = arr.filter((item) => item !== minO);
        

        if(Number(newDateHours) == Number(localStorage.getItem(this.props.nmb + "reserved")) || Number(now) >= Number(min)) {
            localStorage.setItem(this.props.nmb + "reserved", filtered);
            alert("Component " + this.props.nmb + " has been reserved from: " + min + " h. You can use it now.")
        }
    } 
    }
    if(localStorage.getItem(this.props.nmb + "reserved") !== null) {
        console.log(localStorage.getItem(this.props.nmb + "reserved") )
    let getHours = new Date().getHours();

    let res = localStorage.getItem(this.props.nmb + "reserved");
    let resSplit = res.split(',');
    let resArr = Math.min(...resSplit);
        console.log(resArr);
    if(Number(getHours) > Number(resArr) || Number(getHours) < Number(localStorage.getItem("firstShfitStart")) && Number(getHours) > Number(resArr)) {
        let getLS = localStorage.getItem(this.props.nmb + "reserved"); 
        let toArr = getLS.split(',');
        toArr.shift();
        localStorage.setItem(this.props.nmb + "reserved", toArr);
        console.log(toArr);
    }
    }
}
    componentDidMount() {
     /*   const updatingTimeout = () => {
            setTimeout(() => {
                this.setState({
                    updating: !this.state.updating
                })
            }, 10000)
        }
        updatingTimeout();
        */
        if(localStorage.getItem(this.props.nmb + "allDay") !== null) {
            this.setState({
                main: !this.state.main,
                allDayConfirmed: !this.state.allDayConfirmed
            })
        }
        if(localStorage.getItem(this.props.nmb + "allDayDual") !== null) {
                this.setState({
                    allDayConfirm: !this.state.allDayConfirm,
                    main: !this.state.main
                })
        }

        if(localStorage.getItem(this.props.nmb + "started") !== null) {
            this.setState({
                main: !this.state.main,
                start: !this.state.start
            })
        } 

        if(localStorage.getItem(this.props.nmb + "normal") !== null) {
                this.setState({
                    main: !this.state.main,
                    mainBTN: !this.state.mainBTN,
                    compDidMount: !this.state.compDidMount,
                })

                let promoHour = Number(localStorage.getItem("promoHours")); // 1
                let promoHourMillisec = promoHour * 3600000;
            
                const timeTillEndMount = (this.props.nmb < 100 ? Number(localStorage.getItem("hourPrice")) : Number(localStorage.getItem("hourPriceSecond"))) * Number(localStorage.getItem("promoUse")) === Number(localStorage.getItem(this.props.nmb + "inputValue")) ? Number(this.normalPriceLS(Number(localStorage.getItem(this.props.nmb + "timePrice"))) + Number(promoHourMillisec)) - Number(Date.now()) : Number(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice"))) - Number(Date.now());

                const time30 = async () => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(this.setState({
                                mainBTN: !this.state.mainBTN,
                                over30: !this.state.over30
                            }))
                        }, timeTillEndMount - 1800000)
                    })
                }
                
                const callAsync30 = async () => {
                    const result30 = await time30();
                }
                callAsync30();

                const time10 = async () => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(this.setState({
                                over30: !this.state.over30,
                                over10: !this.state.over10
                            }))
                        }, timeTillEndMount - 600000)
                    })
                }
                
                const callAsync10 = async () => {
                    const result10 = await time10();
                }
                callAsync10();
                

                const timeOver = async () => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(this.setState({
                                over: !this.state.over, 
                                over10: !this.state.over10,
                                mainBTN: this.state.mainBTN !== false ? !this.state.mainBTN : this.state.mainBTN,
                                inputGreen: this.state.inputGreen !== false ? !this.state.inputGreen : this.state.inputGreen,
                            })
                            );
                        }, timeTillEndMount)
                    })
                }
                 const callAsync = async () => {
                    const result = await timeOver();
                }
                callAsync();
            }
    } 
    render() {
        const hourPrice = Number(localStorage.getItem("hourPrice"));
        const hourPriceSecond = Number(localStorage.getItem("hourPriceSecond"));
        const promoHour = Number(localStorage.getItem("promoHours")); // 1
        const promoHourMillisec = promoHour * 3600000;
        const promoHourInputValue = promoHour * hourPrice; // 70
        const promoHourInputValueSecond = promoHour * hourPriceSecond; // 1 * 500
        return (
            <div>
               {this.state.main === false && (
                    <div className="main-btn" onClick={this.toggle}>
                        <div style={{ paddingTop: "35px", textAlign: "center", fontWeight: "bold" }}>{`${this.props.nmb}`}</div>
                    </div>
               )}

               {this.state.mainBTN && (
                  <div className="main-btn-input">
                    <span className="text-node">C{this.props.nmb}<br /></span>
                    <span className="text-node">End: {localStorage.getItem("promoHours") !== null && Number(localStorage.getItem(this.props.nmb + "inputValue")) === Number(localStorage.getItem(this.props.nmb + "promoUseHours")) ? this.msToTime(this.normalPriceLS(Number(localStorage.getItem(this.props.nmb + "timePrice")) + (this.props.nmb < 100 ? Number(promoHourInputValue) : Number(promoHourInputValueSecond)))) : this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")))}</span>
                   <div className="main-input-details-btn text-node-btn">
                    <button className="on-back-btn" onClick={this.toggleGreen}><span className="text-node-btn">details</span></button>
                    </div>
                  </div>
               )}
               {this.state.over30 && (
                <div className="main-btn-input-30">
                   <span className="text-node">C{this.props.nmb}<br /></span>
                   <span className="text-node">End: {localStorage.getItem("promoHours") !== null && Number(localStorage.getItem(this.props.nmb + "inputValue")) === Number(localStorage.getItem(this.props.nmb + "promoUseHours")) ? this.msToTime(this.normalPriceLS(Number(localStorage.getItem(this.props.nmb + "timePrice")) + (this.props.nmb < 100 ? Number(promoHourInputValue) : Number(promoHourInputValueSecond)))) : this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")))}</span>
                  <div className="main-input-details-btn text-node-btn">
                   <button className="on-back-btn" onClick={this.toggleYellow}><span className="text-node-btn">details</span></button>
                   </div>
                </div>
                )}
                {this.state.over10 && (
                    <div className="main-btn-input-10">
                   <span className="text-node">C{this.props.nmb}<br /></span>
                   <span className="text-node">End: {localStorage.getItem("promoHours") !== null && Number(localStorage.getItem(this.props.nmb + "inputValue")) === Number(localStorage.getItem(this.props.nmb + "promoUseHours")) ? this.msToTime(this.normalPriceLS(Number(localStorage.getItem(this.props.nmb + "timePrice")) + (this.props.nmb < 100 ? Number(promoHourInputValue) : Number(promoHourInputValueSecond)))) : this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")))}</span>
                  <div className="main-input-details-btn text-node-btn">
                   <button className="on-back-btn" onClick={this.toggleOrange}><span className="text-node-btn">details</span></button>
                   </div>
                </div>
                )}
                {this.state.over && (
                    <div className="time-is-up" onClick={this.compOver}>
                        <span className="text-node">C{this.props.nmb}</span>
                        <div style={{ paddingTop: "5px"  }}>
                        <span className="text-node">TIME'S UP!</span>
                        </div>
                        <span className="text-node"><span className="text-node-none">At:</span> {localStorage.getItem("promoHours") !== null && Number(localStorage.getItem(this.props.nmb + "inputValue")) === Number(localStorage.getItem(this.props.nmb + "promoUseHours")) ? this.msToTime(this.normalPriceLS(Number(localStorage.getItem(this.props.nmb + "timePrice")) + (this.props.nmb < 100 ? Number(promoHourInputValue) : Number(promoHourInputValueSecond)))) : this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")))}</span>
                    </div>
                )}
                {this.state.on && (
                <div className="on-btn">
                <div className="on-proceed">
                        <div className="btn-proceed btn-payment" onClick={() => this.setState({ paymentDiv: !this.state.paymentDiv, on: !this.state.on})} style={{ cursor: "pointer", backgroundColor: "green", height: "90px", color: "white" }}>
                            <div style={{ paddingTop: "35px", textAlign: "center" }}>$</div> 
                        </div>
                        <div className="btn-proceed btn-open" onClick={() => this.setState({ open: !this.state.open, on: !this.state.on})} style={{ cursor: "pointer", backgroundColor: "purple", height: "90px", color: "white" }}>
                            <div style={{ paddingTop: "35px", textAlign: "center" }}>>||</div> 
                        </div>
                        <div className="btn-proceed btn-all-day" onClick={() => this.setState({ allDayConfirm: !this.state.allDayConfirm, on: !this.state.on})} style={{ cursor: "pointer", backgroundColor: "grey", height: "90px", color: "white" }}>
                            <div style={{ paddingTop: "35px", textAlign: "center" }}>O</div> 
                        </div>
                </div>
                    <div className="on-back">
                        <button className="on-back-btn" onClick={() => this.setState({ main: !this.state.main, on: !this.state.on })} style={{ cursor: "pointer" }}><span className="text-node-btn">Back</span></button>
                    </div>
                </div>
                )}
                {this.state.paymentDiv && (
                    <div className="payment-div-btn">
                        <div className="payment-div-btn-proceed">
                            <FormControl
                            placeholder="Payment($)"
                            aria-label="Payment($)"
                            aria-describedby="basic-addon2"
                            onChange={this.handleChange.bind(this)}
                            onKeyDown={this.inputPay.bind(this)}
                            />
                        </div>
                    <div className="on-back-payment">
                         <button className="on-back-btn-payment on-back-btn" onClick={() => this.setState({ paymentDiv: !this.state.paymentDiv, on: !this.state.on })} style={{ cursor: "pointer" }}><span className="text-node-btn">Back</span></button>
                    </div>
                </div>
                  
                )}
                {this.state.open && (
                    <div className="open-proceed">
                        <div className="open-start" onClick={this.toggleStart.bind(this)}>
                        <span className="text-node">Start</span>
                        </div>
                        <div className="open-back">
                          <button className="on-back-btn" onClick={this.toggleBack.bind(this)}><span className="text-node-btn">Back</span></button>
                        </div>
                    </div>
                )}
                {this.state.allDayConfirm && (
                <div>
                    <div className="all-day-confirm" onClick={this.toggleConfirm.bind(this)}>
                    <span className="text-node">Confirm</span>
                    </div>
                    <div className="all-day-confirm-back-btn">
                        <button className="on-back-btn" onClick={this.toggleBackAllDay.bind(this)}><span className="text-node-btn">Back</span></button>
                    </div>
                </div>
                )}
                {this.state.allDayConfirmed && (
                    <div className="all-day-confirmed">
                       <span className="text-node">C{this.props.nmb}<br /></span>
                       <span className="text-node">All day <br /></span>
                       <span className="text-node">Price: {this.props.nmb < 100 ? localStorage.getItem("allDayPrice") : localStorage.getItem("allDayPriceSecondSet")}$</span>
                   </div>
                )}
                {this.state.start && (
                    <div className="open-start-div">
                    <span className="text-node">C{this.props.nmb} <br /></span>
                    <span className="text-node">Started: {this.msToTime(localStorage.getItem(this.props.nmb + "started"))} <br /></span>
                    <button className="on-back-btn text-node-btn-end" style={{ backgroundColor: "red", color: "white" }} onClick={this.toggleEnd.bind(this)}><span className="text-node-btn">End</span></button>
                    <button className="on-back-btn text-node-btn" onClick={this.hasPassed.bind(this)}><span className="text-node-btn">details</span></button>
                </div>
                )}
                 {this.state.hasPassed && (
                                    <div>
                                        <div className="open-details-div">
                                        <span className="text-node">Started: {this.msToTime(localStorage.getItem(this.props.nmb + "started"))} <br /></span>
                                        <span className="text-node">Time past: {this.msToTimeRegular(Date.now() - localStorage.getItem(this.props.nmb + "started"))} <br /></span>
                                        <span className="text-node">Price: {this.openPriceTimer(Date.now() - localStorage.getItem(this.props.nmb + "started"))}</span>
                                        </div>
                                    <div className="details-back-btn">
                                        <button className="on-back-btn" onClick={this.hasPassed.bind(this)}><span className="text-node-btn">back</span></button>
                                    </div>
                                    </div>
                                )}
                {this.state.end && (
                    <div>
                        <div className="close-open-div">
                        <span className="text-node-none">Started: {this.msToTime(localStorage.getItem(this.props.nmb + "started"))} <br /></span>
                        <span className="text-node">Finished: {this.msToTime(localStorage.getItem(this.props.nmb + "ended"))} <br /></span>
                        <span className="text-node-none">Time used: {this.msToTimeRegular(localStorage.getItem(this.props.nmb + "ended") - localStorage.getItem(this.props.nmb + "started"))} <br /></span>
                        <span className="text-node">Price: {this.openPrice(localStorage.getItem(this.props.nmb + "ended") - localStorage.getItem(this.props.nmb + "started"))}</span>
                        </div>
                        <div className="close-open-btn" onClick={this.toggleClose.bind(this)}>
                            <button className="close-btn-open on-back-btn"><span className="text-node-btn">Close</span></button>
                        </div>
                    </div>
                )}  

                {this.state.inputGreen && (
        <div>
            <div className="input-green">
                <div className="input-green-proceed">
                <span className="text-node">Start: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? this.msToTime(localStorage.getItem(this.props.nmb + "normalStart")) : this.state.inputStart} <br /></span>
                <span className="text-node">End: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? localStorage.getItem("promoHours") !== null && Number(localStorage.getItem(this.props.nmb + "inputValue")) === Number(localStorage.getItem(this.props.nmb + "promoUseHours")) ? this.msToTime(this.normalPriceLS(Number(localStorage.getItem(this.props.nmb + "timePrice")) + Number(this.props.nmb < 100 ? Number(promoHourInputValue) : Number(promoHourInputValueSecond)))) : this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice"))) : localStorage.getItem("promoHours") !== null && Number(localStorage.getItem(this.props.nmb + "inputValue")) === Number(localStorage.getItem(this.props.nmb + "promoUseHours")) ? this.msToTime(this.normalPrice(Number(this.state.inputValue) + Number(promoHourInputValue))) : this.msToTime(this.normalPrice(this.state.inputValue))}<br /></span>
                <span className="text-node">Price: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? localStorage.getItem(this.props.nmb + "timePrice") : this.state.inputValue} $</span>
                </div>
            </div>
            <div className="details-back-btn">
                    <button className="on-back-btn" onClick={this.toggleCloseInputGreen.bind(this)}><span className="text-node-btn">back</span></button>
                </div>
        </div>
                )}
                {this.state.inputYellow && (
            <div>
                <div className="input-yellow">
                    <div className="input-yellow-proceed">
                    <span className="text-node">Start: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true  ? this.msToTime(localStorage.getItem(this.props.nmb + "normalStart")) : this.state.inputStart} <br /></span>
                    <span className="text-node">End: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? localStorage.getItem("promoHours") !== null && Number(localStorage.getItem(this.props.nmb + "inputValue")) === Number(localStorage.getItem(this.props.nmb + "promoUseHours")) ? this.msToTime(this.normalPriceLS(Number(localStorage.getItem(this.props.nmb + "timePrice")) + Number(this.props.nmb < 100 ? Number(promoHourInputValue) : Number(promoHourInputValueSecond)))) : this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice"))) : localStorage.getItem("promoHours") !== null && Number(localStorage.getItem(this.props.nmb + "inputValue")) === Number(localStorage.getItem(this.props.nmb + "promoUseHours")) ? this.msToTime(this.normalPrice(Number(this.state.inputValue) + Number(promoHourInputValue))) : this.msToTime(this.normalPrice(this.state.inputValue))} <br /></span>
                    <span className="text-node">Price: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? localStorage.getItem(this.props.nmb + "timePrice") : this.state.inputValue} $</span>
                    </div>
                </div>
                <div className="details-back-btn">
                        <button className="on-back-btn" onClick={this.toggleCloseInputYellow.bind(this)}><span className="text-node-btn">back</span></button>
                    </div>
            </div>

                )}
                {this.state.inputOrange && (
            <div>
                <div className="input-orange">
                <div className="input-orange-proceed">
                <span className="text-node">Start: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true  ? this.msToTime(localStorage.getItem(this.props.nmb + "normalStart")) : this.state.inputStart} <br /></span>
                <span className="text-node">End: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? localStorage.getItem("promoHours") !== null && Number(localStorage.getItem(this.props.nmb + "inputValue")) === Number(localStorage.getItem(this.props.nmb + "promoUseHours")) ? this.msToTime(this.normalPriceLS(Number(localStorage.getItem(this.props.nmb + "timePrice")) + Number(this.props.nmb < 100 ? Number(promoHourInputValue) : Number(promoHourInputValueSecond)))) : this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice"))) : localStorage.getItem("promoHours") !== null && Number(localStorage.getItem(this.props.nmb + "inputValue")) === Number(localStorage.getItem(this.props.nmb + "promoUseHours")) ? this.msToTime(this.normalPrice(Number(this.state.inputValue) + Number(promoHourInputValue))) : this.msToTime(this.normalPrice(this.state.inputValue))} <br /></span>
                <span className="text-node">Price: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? localStorage.getItem(this.props.nmb + "timePrice") : this.state.inputValue} $</span>
                </div>
            </div>
            <div className="details-back-btn">
                    <button className="on-back-btn" onClick={this.toggleCloseInputOrange.bind(this)}><span className="text-node-btn">back</span></button>
                </div>
            </div>
                )}
            </div>
        );
    }
}

export default Comp;

/* Get all items from local storage - keys and values 
    console.log(Object.entries(localStorage));
    Get all keys from local storage
    const allKeys = () => {
            for ( var i = 0, len = localStorage.length; i < len; ++i ) {
                console.log( localStorage.getItem( localStorage.key( i ) ) );
              }
            }
    return allKeys();
*/
/*  Stopwatch/timer -> working too slow on live mode!
        this.timePast = () => {
            let d = Date.now();
            let n = 1;
            let start = this.state.openStart;
            setInterval(() => {
                this.setState({
                    timePast: d + (n++ * 10000) - start
                })
            }, 10000);
        } 
        OR
        setInterval(() => {
            return Date.now() + (n++ * 1000) - this.state.openStart
        }, 1000);
*/