import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

//koliko u lokal storage-u, toliko ovde => u label-u

class Chart extends Component {
    constructor(props) {
        super(props);
        const comp1 = localStorage.getItem("1promoHour") !== null ? Number(localStorage.getItem("1normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("1normalEnd");
        const comp2 = localStorage.getItem("2promoHour") !== null ? Number(localStorage.getItem("2normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("2normalEnd");
        const comp3 = localStorage.getItem("3promoHour") !== null ? Number(localStorage.getItem("3normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("3normalEnd");
        const comp4 = localStorage.getItem("4promoHour") !== null ? Number(localStorage.getItem("4normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("4normalEnd");
        const comp5 = localStorage.getItem("5promoHour") !== null ? Number(localStorage.getItem("5normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("5normalEnd");
        const comp6 = localStorage.getItem("6promoHour") !== null ? Number(localStorage.getItem("6normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("6normalEnd");
        const comp7 = localStorage.getItem("7promoHour") !== null ? Number(localStorage.getItem("7normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("7normalEnd");
        const comp8 = localStorage.getItem("8promoHour") !== null ? Number(localStorage.getItem("8normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("8normalEnd");
        const comp9 = localStorage.getItem("9promoHour") !== null ? Number(localStorage.getItem("9normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("9normalEnd");
        const comp10 = localStorage.getItem("10promoHour") !== null ? Number(localStorage.getItem("10normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("10normalEnd");
        const comp11 = localStorage.getItem("11promoHour") !== null ? Number(localStorage.getItem("11normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("11normalEnd");
        const comp12 = localStorage.getItem("12promoHour") !== null ? Number(localStorage.getItem("12normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("12normalEnd");
        const comp13 = localStorage.getItem("13promoHour") !== null ? Number(localStorage.getItem("13normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("13normalEnd");
        const comp14 = localStorage.getItem("14promoHour") !== null ? Number(localStorage.getItem("14normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("14normalEnd");
        const comp15 = localStorage.getItem("15promoHour") !== null ? Number(localStorage.getItem("15normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("15normalEnd");
        const comp16 = localStorage.getItem("16promoHour") !== null ? Number(localStorage.getItem("16normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("16normalEnd");
        const comp17 = localStorage.getItem("17promoHour") !== null ? Number(localStorage.getItem("17normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("17normalEnd");
        const comp18 = localStorage.getItem("18promoHour") !== null ? Number(localStorage.getItem("18normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("18normalEnd");
        const comp19 = localStorage.getItem("19promoHour") !== null ? Number(localStorage.getItem("19normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("19normalEnd");
        const comp20 = localStorage.getItem("20promoHour") !== null ? Number(localStorage.getItem("20normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("20normalEnd");
        const comp21 = localStorage.getItem("21promoHour") !== null ? Number(localStorage.getItem("21normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("21normalEnd");
        const comp22 = localStorage.getItem("22promoHour") !== null ? Number(localStorage.getItem("22normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("22normalEnd");
        const comp23 = localStorage.getItem("23promoHour") !== null ? Number(localStorage.getItem("23normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("23normalEnd");
        const comp24 = localStorage.getItem("24promoHour") !== null ? Number(localStorage.getItem("24normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("24normalEnd");
        const comp25 = localStorage.getItem("25promoHour") !== null ? Number(localStorage.getItem("25normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("25normalEnd");
        const comp26 = localStorage.getItem("26promoHour") !== null ? Number(localStorage.getItem("26normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("26normalEnd");
        const comp27 = localStorage.getItem("27promoHour") !== null ? Number(localStorage.getItem("27normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("27normalEnd");
        const comp28 = localStorage.getItem("28promoHour") !== null ? Number(localStorage.getItem("28normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("28normalEnd");
        const comp29 = localStorage.getItem("29promoHour") !== null ? Number(localStorage.getItem("29normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("29normalEnd");
        
        const label = () => {
            let compBasic = localStorage.getItem("properties");
            let compBasicArr = compBasic.split(',');

            let compAdded = localStorage.getItem("propertiesNow") !== null ? localStorage.getItem("propertiesNow") : "null";
            let compAddedArr = compAdded.split(',');

            let compConcated = compBasicArr.concat(compAddedArr);

            let compAll = Array.from(new Set(compConcated)).filter((item) => item !== "null");
            return compAll;
        }
        
        this.state = {
            chartData: {
            labels: label(),
                datasets: [
                    {
                        data: [
                            comp1,
                            comp2,
                            comp3,
                            comp4,
                            comp5,
                            comp6,
                            comp7,
                            comp8,
                            comp9,
                            comp10,
                            comp11,
                            comp12,
                            comp13,
                            comp14,
                            comp15,
                            comp16,
                            comp17,
                            comp18,
                            comp19,
                            comp20,
                            comp21,
                            comp22,
                            comp23,
                            comp24,
                            comp25,
                            comp26,
                            comp27,
                            comp28,
                            comp29,
                        ],
                        backgroundColor: "blue",   
                    }
                ],
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,   
                        }
                      }],
                   }
            }
        }
    }
    render() {
        return (
            <div>
                <Bar 
                    data={this.state.chartData}
                    options={{
                        legend: {
                            display: false
                        },
                        tooltips: {
                            callbacks: {
                               label: function(tooltipItem) {
                                      return tooltipItem.yLabel;
                               }
                            }
                        },
                        animation: {
                            duration: 0 // general animation time
                        },
                        hover: {
                            animationDuration: 0 // duration of animations when hovering an item
                        },
                        responsiveAnimationDuration: 0, // animation duration after a resize
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}

export default Chart;