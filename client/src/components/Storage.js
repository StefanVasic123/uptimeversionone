import React, { Component } from 'react';
import './CompAllStyle.css';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            on: false,
            main: false,
            mainBTN: false,
            open: false,
            start: false,
            end: false,
            timePast: "",
            input: false,
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
            value: "",
            openStart: "",
            openEnd: "",
            hasPassed: false,
            openComponent: false,
            compDidMount: false,
            startMilis: ""
        }

        this.handleChange = this.handleChange.bind(this);

        const hourPrice = localStorage.getItem("hourPrice");

        const firstShiftStart = localStorage.getItem("firstShiftStart");
        const firstShiftEnd = localStorage.getItem("firstShiftEnd");
        const secondShiftStart = localStorage.getItem("secondShiftStart");
        const secondShiftEnd = localStorage.getItem("secondShiftEnd");
        const thirdShiftStart = localStorage.getItem("thirdShiftStart");
        const thirdShiftEnd = localStorage.getItem("thirdShiftEnd");


        const timeZone = () => new Date().getTimezoneOffset(); //-60
        const timeZoneHarmonizer = () => {
            if(timeZone() < 0) {
                const x = Math.abs(timeZone()) * 60000;//get difference between UTC and local => convert to milliseconds
                return Date.now() + x; //return local time in millisecond
            }
            if(timeZone() > 0) {
                const y = timeZone() * 60000;
                    return Date.now() - y;
                }
                if(timeZone() == 0) {
                    return Date.now();
                }
            } // return millisecond of local time
            

        this.msToTime = (duration) => {
            var milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
    
            return hours + ":" + minutes + ":" + seconds;
        };
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
        this.toggleOpen = () => {
            this.setState({
                on:!this.state.on,
                open: !this.state.open
            })
        }
        this.toggleStart = () => {
            this.setState({
                open: !this.state.open,
                start: !this.state.start,
                openStart: Date.now(),
            })
            localStorage.setItem(this.props.nmb + "started", Date.now());
            localStorage.setItem(this.props.nmb + "normalEnd", 24.00);
        }
        this.toggleEnd = () => {
            let nmbSuper = [localStorage.getItem(this.props.nmb)]; // get all values from LS
            this.setState({
                start: !this.state.start,
                end: !this.state.end,
                openEnd: Date.now(),
                timePast: "",
            })
            if (this.state.hasPassed !== false) {
                this.setState({
                    hasPassed: !this.state.hasPassed
                })
            } 
            localStorage.setItem(this.props.nmb, Date.now() - this.state.openStart); // set new value to LS
            let nmb = [localStorage.getItem(this.props.nmb)]; // get new value from LS
            let nmbConcat = nmb.concat(nmbSuper); // concat all values with new value 
            localStorage.setItem(this.props.nmb, nmbConcat); // set all values to LS
            localStorage.removeItem(this.props.nmb + "started");
            localStorage.removeItem(this.props.nmb + "normalEnd");

            let normalEnd = new Date().getHours();

            if(Number(normalEnd) >= firstShiftStart && Number(normalEnd) < firstShiftEnd) {
                localStorage.setItem(this.props.nmb + "firstShift", Date.now() - this.state.openStart); // set new value to LS
                let nmb = [localStorage.getItem(this.props.nmb + "firstShift")]; // get new value from LS
                let nmbConcat = nmb.concat(nmbSuper); // concat all values with new value 
                localStorage.setItem(this.props.nmb + "firstShift", nmbConcat);
            }
            if(Number(normalEnd) >= secondShiftStart && Number (normalEnd) < secondShiftEnd) {
                localStorage.setItem(this.props.nmb + "secondShift", Date.now() - this.state.openStart); // set new value to LS
                let nmb = [localStorage.getItem(this.props.nmb + "secondShift")]; // get new value from LS
                let nmbConcat = nmb.concat(nmbSuper); // concat all values with new value 
                localStorage.setItem(this.props.nmb + "secondShift", nmbConcat);
            }
            if(Number(normalEnd) >= thirdShiftStart && Number(normalEnd) < thirdShiftEnd) {
                localStorage.setItem(this.props.nmb + "thirdShift", Date.now() - this.state.openStart); // set new value to LS
                let nmb = [localStorage.getItem(this.props.nmb + "thirdShift")]; // get new value from LS
                let nmbConcat = nmb.concat(nmbSuper); // concat all values with new value 
                localStorage.setItem(this.props.nmb + "thirdShift", nmbConcat);
            }

        }
        this.toggleClose = () => {
                this.setState({
                    end: !this.state.end,
                    main: !this.state.main,
                    timePast: "",
                })
        }
        this.inputPay = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.setState({
                on: !this.state.on,
                inputStartMillisec: Date.now(),
                inputStart: this.msToTime(Date.now()),
                value: this.props.value,
                mainBTN: !this.state.mainBTN
            })
            let nmbSuper = [localStorage.getItem(this.props.nmb)]; // get everything in LS for this component as array (for concat)

            localStorage.setItem(this.props.nmb, (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0)); // push to LS
            
            let nmb = [localStorage.getItem(this.props.nmb)]; // get just pushed to LS (this erase by default LS existed values) example: 3600000 from LS
            let nmbConcat = nmb.concat(nmbSuper); // concat pushed and existing values => 3600000 concat [if something has in LS]
            localStorage.setItem(this.props.nmb, nmbConcat); // set concated array to LS (all values)

            localStorage.setItem(this.props.nmb + "normal", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
           
            localStorage.setItem(this.props.nmb + "normalStart", Date.now());
            localStorage.setItem(this.props.nmb + "timePrice", (this.state.inputValue)); //10

                let end = this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice"));

                let normalEnd = new Date(end).getHours();
                let normalEndMinutes = new Date(end).getMinutes();
                
                localStorage.setItem(this.props.nmb + "normalEnd", normalEnd + '.' + normalEndMinutes)
                
                if(Number(normalEnd) >= firstShiftStart && Number(normalEnd) < firstShiftEnd) {
                        let getEverything = [localStorage.getItem(this.props.nmb + "firstShift")].filter(n => n !== null);
                        localStorage.setItem(this.props.nmb + "firstShift", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
                        let getJustPushedToLS = [localStorage.getItem(this.props.nmb + "firstShift")];
                        let concatedValues = getJustPushedToLS.concat(getEverything).filter(n => n !== null);
                        localStorage.setItem(this.props.nmb + "firstShift", concatedValues); 
                }
                if(Number(normalEnd) >= secondShiftStart && Number (normalEnd) < secondShiftEnd) {
                    let getEverything = [localStorage.getItem(this.props.nmb + "secondShift")];
                    localStorage.setItem(this.props.nmb + "secondShift", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
                    let getJustPushedToLS = [localStorage.getItem(this.props.nmb + "secondShift")];
                    let concatedValues = getJustPushedToLS.concat(getEverything);
                    localStorage.setItem(this.props.nmb + "secondShift", concatedValues); 
                }
                if(Number(normalEnd) >= thirdShiftStart && Number(normalEnd) < thirdShiftEnd) {
                    let getEverything = [localStorage.getItem(this.props.nmb + "thirdShift")];
                    localStorage.setItem(this.props.nmb + "thirdShift", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
                    let getJustPushedToLS = [localStorage.getItem(this.props.nmb + "thirdShift")];
                    let concatedValues = getJustPushedToLS.concat(getEverything);
                    localStorage.setItem(this.props.nmb + "thirdShift", concatedValues); 
                }   

                const time30 = async () => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(this.setState({
                                mainBTN: !this.state.mainBTN,
                                over30: !this.state.over30
                            }))
                        }, (this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")) - Date.now()) - 1800000)
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
                        }, (this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")) - Date.now()) - 600000)
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
                            })
                            );
                        }, this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")) - Date.now());
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
                hasPassed: !this.state.hasPassed
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
        }
        this.overTest = () => {
            this.setState({
                main: !this.state.main,
                mainBTN: !this.state.mainBTN
            })
            localStorage.removeItem(this.props.nmb + "normal");

            localStorage.removeItem(this.props.nmb + "normalStart");
            localStorage.removeItem(this.props.nmb + "normalEnd");
            localStorage.removeItem(this.props.nmb + "timePrice");
        }
    }
    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        })
    }
    componentDidMount() {
        this.setState({
            openStart: localStorage.getItem(this.props.nmb + "started"),
        })
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

                const time30 = async () => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(this.setState({
                                mainBTN: !this.state.mainBTN,
                                over30: !this.state.over30
                            }))
                        }, (this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")) - Date.now()) - 1800000)
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
                        }, (this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")) - Date.now()) - 600000)
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
                        }, this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")) - Date.now());
                    })
                }
                 const callAsync = async () => {
                    const result = await timeOver();
                }
                callAsync(); 
            }            
    } 
    render() {
        const styles = {marginBottom: "40px"};
        return (
            <div style={styles}>
               {this.state.main === false && localStorage.getItem(this.props.nmb + "started") === null && (
                    <button className="componentBTN" onClick={this.toggle}>{`${this.props.nmb}`}</button>
               )}

               {this.state.mainBTN && (
                   <div>
                   <button className="componentBTNGreen" onClick={this.toggleGreen}>End: {this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")))}</button>
                   </div>
               )}
               {this.state.over30 && (
                     <button className="componentBTNYellow" onClick={this.toggleYellow}>End: {this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")))}</button>
                )}
                {this.state.over10 && (
                    <button className="componentBTNOrange" onClick={this.toggleOrange}>End: {this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")))}</button>
                )}
                {this.state.over && (
                     <button className="overBTN" onClick={this.compOver}>OVER</button>
                )}

                {this.state.on && (
                    <div>
                        <h2 style={{cursor: "pointer"}} onClick={() => this.setState({main: !this.state.main, on: !this.state.on})}>Component {this.props.nmb}</h2>
                        <input type="number" placeholder="payment" onChange={this.handleChange} onKeyDown={this.inputPay.bind(this)}/>
                        <button onClick={this.toggleOpen.bind(this)}>Open</button>
                    </div>
                )}
                {this.state.open && (
                    <div>
                    <button style={{ padding: "1em 3em 1em 3em", fontSize: "1.2em", fontWeight: "bold", backgroundColor: "pink" }} onClick={this.toggleStart.bind(this)}>Start</button>
                    </div>
                )}
                {this.state.start && (
                    <div style={{ backgroundColor: "purple" }}>
                        <h1>Component {this.props.nmb}</h1>
                        <h2>Time started: {this.msToTime(this.state.openStart)}</h2>
                        <button onClick={this.hasPassed.bind(this)}>Time/price untill now</button>
                            {this.state.hasPassed && (
                                <div>
                                    <h2>Time past: {this.msToTime(Date.now() - this.state.openStart)}</h2>
                                    <h2>Price: {this.openPriceTimer(Date.now() - this.state.openStart)}</h2>
                                </div>
                            )}
                        <button onClick={this.toggleEnd.bind(this)}>End</button>
                    </div>
                )}
                {this.state.end && (
                    <div style={{ backgroundColor: "purple" }}>
                        <h1>Component {this.props.nmb}</h1>
                        <h2>Started: {this.msToTime(this.state.openStart)}</h2>
                        <h2>Finished: {this.msToTime(this.state.openEnd)}</h2>
                        <h2>Time played: {this.msToTime(this.state.openEnd - this.state.openStart)}</h2>
                        <h2>Price: {this.openPrice(this.state.openEnd - this.state.openStart)}</h2>
                        <button onClick={this.toggleClose.bind(this)}>Close</button>
                </div>
                )}  

                {this.state.inputGreen && (
                      <div style={{ backgroundColor: "green" }}>
                      <h1>Component {this.props.nmb}</h1>
                      <h2>Time Start: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true  ? this.msToTime(localStorage.getItem(this.props.nmb + "normalStart")) : this.state.inputStart}</h2>
                      <h2>Time End: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice"))) : this.msToTime(this.normalPrice(this.state.inputValue))}</h2>
                      <h2>Price: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? localStorage.getItem(this.props.nmb + "timePrice") : this.state.inputValue}</h2>
                      <button onClick={this.toggleCloseInputGreen.bind(this)}>Hide</button>
                  </div>
                )}
                {this.state.inputYellow && (
                    <div style={{ backgroundColor: "yellow" }}>
                    <h1>Component {this.props.nmb}</h1>
                    <h2>Time Start: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true  ? this.msToTime(localStorage.getItem(this.props.nmb + "normalStart")) : this.state.inputStart}</h2>
                    <h2>Time End: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice"))) : this.msToTime(this.normalPrice(this.state.inputValue))}</h2>
                    <h2>Price: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? localStorage.getItem(this.props.nmb + "timePrice") : this.state.inputValue}</h2>
                    <button onClick={this.toggleCloseInputYellow.bind(this)}>Hide</button>
                    </div>
                )}
                {this.state.inputOrange && (
                    <div style={{ backgroundColor: "orange" }}>
                    <h1>Component {this.props.nmb}</h1>
                    <h2>Time Start: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true  ? this.msToTime(localStorage.getItem(this.props.nmb + "normalStart")) : this.state.inputStart}</h2>
                    <h2>Time End: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? this.msToTime(this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice"))) : this.msToTime(this.normalPrice(this.state.inputValue))}</h2>
                    <h2>Price: {localStorage.getItem(this.props.nmb + "normal") !== null && this.state.compDidMount === true ? localStorage.getItem(this.props.nmb + "timePrice") : this.state.inputValue}</h2>
                    <button onClick={this.toggleCloseInputOrange.bind(this)}>Hide</button>
                    </div>
                )}
         {/*      <button onClick={this.overTest}>OVERTEST {`${this.props.nmb}`}</button> */}
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

/*

 /*    const endGame = this.normalPriceLS(this.state.inputValue);
                
                let newDate = Date.now() + endGame;

                let newDateHours = new Date(newDate).getHours();
                
                if(localStorage.getItem(this.props.nmb + "reserved") !== null) {
                let getLS = localStorage.getItem(this.props.nmb + "reserved");
                let arr = getLS.split(',');
                let min = Math.min(...arr);

                if(localStorage.getItem(this.props.nmb + "reserved") && Number(min) <= Number(newDateHours)/* && Number(newDate.toFixed(0)) > Number(localStorage.getItem("overtime"))*//*) {
                    this.setState({
                        main: !this.state.main,
                        on: !this.state.on
                    })
                    return alert("Can not do that! This component is reserved at: " + min + " hours");
                 }
                }
               
                if(localStorage.getItem("overtime") && Number(newDate.toFixed(0)) > Number(localStorage.getItem("overtime"))) {
                       this.setState({
                           main: !this.state.main,
                           on: !this.state.on
                       })
                       return alert("Can not do that! It goes beyond last shift over.");
               }

                this.setState({
                on: !this.state.on,
                inputStartMillisec: Date.now(),
                inputStart: this.msToTime(Date.now()),
                value: this.props.value,
                mainBTN: !this.state.mainBTN
            })

            

            let nmbSuper = [localStorage.getItem(this.props.nmb)]; // get everything in LS for this component as array (for concat)

            localStorage.setItem(this.props.nmb, (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0)); // push to LS
            
            let nmb = [localStorage.getItem(this.props.nmb)]; // get just pushed to LS (this erase by default LS existed values) example: 3600000 from LS
            let nmbConcat = nmb.concat(nmbSuper); // concat pushed and existing values => 3600000 concat [if something has in LS]
            localStorage.setItem(this.props.nmb, nmbConcat); // set concated array to LS (all values)

            localStorage.setItem(this.props.nmb + "normal", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
           
            localStorage.setItem(this.props.nmb + "normalStart", Date.now());
            localStorage.setItem(this.props.nmb + "timePrice", (this.state.inputValue)); 

                let end = this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice"));
        
                let normalEnd = new Date(end).getHours();
                let normalEndMinutes = new Date(end).getMinutes();
                
                localStorage.setItem(this.props.nmb + "normalEnd", normalEnd + '.' + normalEndMinutes)
                
                if(Number(normalEnd) >= firstShiftStart && Number(normalEnd) < firstShiftEnd) {
                        let getEverything = [localStorage.getItem(this.props.nmb + "firstShift")].filter(n => n !== null);
                        localStorage.setItem(this.props.nmb + "firstShift", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
                        let getJustPushedToLS = [localStorage.getItem(this.props.nmb + "firstShift")];
                        let concatedValues = getJustPushedToLS.concat(getEverything).filter(n => n !== null);
                        localStorage.setItem(this.props.nmb + "firstShift", concatedValues); 
                }
                if(Number(normalEnd) >= secondShiftStart && Number (normalEnd) < secondShiftEnd) {
                    let getEverything = [localStorage.getItem(this.props.nmb + "secondShift")];
                    localStorage.setItem(this.props.nmb + "secondShift", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
                    let getJustPushedToLS = [localStorage.getItem(this.props.nmb + "secondShift")];
                    let concatedValues = getJustPushedToLS.concat(getEverything);
                    localStorage.setItem(this.props.nmb + "secondShift", concatedValues); 
                }
                if(Number(normalEnd) >= thirdShiftStart && Number(normalEnd) < 24 || Number(normalEnd) < thirdShiftEnd) {  
                    let getEverything = [localStorage.getItem(this.props.nmb + "thirdShift")];
                    localStorage.setItem(this.props.nmb + "thirdShift", (this.normalPrice(this.state.inputValue) - this.state.inputStartMillisec).toFixed(0));
                    let getJustPushedToLS = [localStorage.getItem(this.props.nmb + "thirdShift")];
                    let concatedValues = getJustPushedToLS.concat(getEverything);
                    localStorage.setItem(this.props.nmb + "thirdShift", concatedValues); 
                }   

                const time30 = async () => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(this.setState({
                                mainBTN: !this.state.mainBTN,
                                over30: !this.state.over30
                            }))
                        }, (this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")) - Date.now()) - 1800000)
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
                        }, (this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")) - Date.now()) - 600000)
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
                            })
                            );
                        }, this.normalPriceLS(localStorage.getItem(this.props.nmb + "timePrice")) - Date.now());
                    })
                }
                 const callAsync = async () => {
                    const result = await timeOver();
                }
                callAsync(); 

*/

<div style={{ textAlign: "center", paddingBottom: "1em" }}>
<h2>Add/remove component</h2>
<h3>First set (10 - 50)</h3>
<ButtonToolbar style={{ display: "flex", justifyContent: "center" }}>
    <Button variant="primary" onClick={this.addComponent} style={{ cursor: "pointer", textAlign: "center" }}>Add</Button>
    <Button variant="danger" onClick={this.removeComponent} style={{ cursor: "pointer", textAlign: "center" }}>Remove</Button>
</ButtonToolbar>
<h3>Second set (110 - 120)</h3>
<ButtonToolbar style={{ display: "flex", justifyContent: "center" }}>
    <Button variant="primary" onClick={this.addComponentSecond} style={{ cursor: "pointer", textAlign: "center" }}>Add</Button>
    <Button variant="danger" onClick={this.removeComponentSecond} style={{ cursor: "pointer", textAlign: "center" }}>Remove</Button>
</ButtonToolbar>
</div>

    /*   this.addComponent = () => { 
            let getMax = localStorage.getItem("propertiesMax"); // 20
            let plusOne = Number(getMax) + 1; // 21

            let el = document.getElementById(JSON.stringify(plusOne));
            el.classList.remove("none");
            el.classList.add("comp-div");

            localStorage.setItem(plusOne + "props", plusOne);

            let oldArr = localStorage.getItem("properties");
            localStorage.setItem(plusOne + "added", plusOne); // 21

            let getNew = localStorage.getItem(plusOne + "added");
            let arr = getNew.split(','); // [1]
            let oldArrSplit = oldArr.split(','); // ["1" ,"2" ...]
            let concat = oldArrSplit.concat(arr);

            localStorage.setItem("properties", concat);

            alert("Element number: " + plusOne + " is added!");

            window.location.reload();
        }

        this.addComponentSecond = () => {
            let getMax = localStorage.getItem("propertiesMaxSecond"); // 111
            let plusOne = Number(getMax) + 1; // 112

            let el = document.getElementById(JSON.stringify(plusOne));
            el.classList.remove("none");
            el.classList.add("comp-div-second");

            localStorage.setItem(plusOne + "props", plusOne);

            let oldArr = localStorage.getItem("propertiesSecond");
            localStorage.setItem(plusOne + "added", plusOne); // 21

            let getNew = localStorage.getItem(plusOne + "added");
            let arr = getNew.split(','); // [1]
            let oldArrSplit = oldArr.split(','); // ["1" ,"2" ...]
            let concat = oldArrSplit.concat(arr);

            localStorage.setItem("propertiesSecond", concat);

            alert("Element number: " + plusOne + " is added!");

            window.location.reload();
        }

        this.removeComponent = () => { 
            let getMax = localStorage.getItem("propertiesMax");
            let getMaxNum = Number(getMax);
           
            let el = document.getElementById(JSON.stringify(getMaxNum));
            el.classList.remove("comp-div");
            el.classList.add("none");

            localStorage.removeItem(getMaxNum + "props");
            localStorage.removeItem(getMaxNum + "added");

            let oldArr = localStorage.getItem("properties");

            let oldArrSplit = oldArr.split(',').filter((item) => item !== JSON.stringify(getMaxNum));

            localStorage.setItem("properties", oldArrSplit);

            alert("Element number: " + getMaxNum + " is erased!");

            window.location.reload();
        } 

        this.removeComponentSecond = () => { 
            let getMax = localStorage.getItem("propertiesMaxSecond");
            let getMaxNum = Number(getMax);
           
            let el = document.getElementById(JSON.stringify(getMaxNum));
            el.classList.remove("comp-div-second");
            el.classList.add("none");

            localStorage.removeItem(getMaxNum + "props");
            localStorage.removeItem(getMaxNum + "added");

            let oldArr = localStorage.getItem("propertiesSecond");

            let oldArrSplit = oldArr.split(',').filter((item) => item !== JSON.stringify(getMaxNum));

            localStorage.setItem("propertiesSecond", oldArrSplit);

            alert("Element number: " + getMaxNum + " is erased!");

            window.location.reload();
        } 
*/