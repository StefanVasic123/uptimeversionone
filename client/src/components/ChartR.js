import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class ChartR extends Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem("1reserved") !== null) {
            const getLS1 = localStorage.getItem("1reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min1", min1);
        }
        if(localStorage.getItem("2reserved") !== null) {
            const getLS2 = localStorage.getItem("2reserved");
            let arr2 = getLS2.split(',');
            let min2 = Math.min(...arr2);
            localStorage.setItem("min2", min2);
        }
        if(localStorage.getItem("3reserved") !== null) {
            const getLS3 = localStorage.getItem("3reserved");
            let arr3 = getLS3.split(',');
            let min3 = Math.min(...arr3);
            localStorage.setItem("min3", min3);
        }
        if(localStorage.getItem("4reserved") !== null) {
            const getLS4 = localStorage.getItem("4reserved");
            let arr4 = getLS4.split(',');
            let min4 = Math.min(...arr4);
            localStorage.setItem("min4", min4);
        }
        if(localStorage.getItem("5reserved") !== null) {
            const getLS5 = localStorage.getItem("5reserved");
            let arr5 = getLS5.split(',');
            let min5 = Math.min(...arr5);
            localStorage.setItem("min5", min5);
        }
        if(localStorage.getItem("6reserved") !== null) {
            const getLS6 = localStorage.getItem("6reserved");
            let arr6 = getLS6.split(',');
            let min6 = Math.min(...arr6);
            localStorage.setItem("min6", min6);
        }
        if(localStorage.getItem("7reserved") !== null) {
            const getLS7 = localStorage.getItem("7reserved");
            let arr7 = getLS7.split(',');
            let min7 = Math.min(...arr7);
            localStorage.setItem("min7", min7);
        }
        if(localStorage.getItem("8reserved") !== null) {
            const getLS8 = localStorage.getItem("8reserved");
            let arr8 = getLS8.split(',');
            let min8 = Math.min(...arr8);
            localStorage.setItem("min8", min8);
        }
        if(localStorage.getItem("9reserved") !== null) {
            const getLS9 = localStorage.getItem("9reserved");
            let arr9 = getLS9.split(',');
            let min9 = Math.min(...arr9);
            localStorage.setItem("min9", min9);
        }
        if(localStorage.getItem("10reserved") !== null) {
            const getLS10 = localStorage.getItem("10reserved");
            let arr10 = getLS10.split(',');
            let min10 = Math.min(...arr10);
            localStorage.setItem("min10", min10);
        }
        if(localStorage.getItem("11reserved") !== null) {
            const getLS1 = localStorage.getItem("11reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min11", min1);
        }
        if(localStorage.getItem("12reserved") !== null) {
            const getLS1 = localStorage.getItem("12reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min12", min1);
        }
        if(localStorage.getItem("13reserved") !== null) {
            const getLS1 = localStorage.getItem("13reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min13", min1);
        }
        if(localStorage.getItem("14reserved") !== null) {
            const getLS1 = localStorage.getItem("14reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min14", min1);
        }
        if(localStorage.getItem("15reserved") !== null) {
            const getLS1 = localStorage.getItem("15reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min15", min1);
        }
        if(localStorage.getItem("16reserved") !== null) {
            const getLS1 = localStorage.getItem("16reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min16", min1);
        }
        if(localStorage.getItem("17reserved") !== null) {
            const getLS1 = localStorage.getItem("17reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min17", min1);
        }
        if(localStorage.getItem("18reserved") !== null) {
            const getLS1 = localStorage.getItem("18reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min18", min1);
        }
        if(localStorage.getItem("19reserved") !== null) {
            const getLS1 = localStorage.getItem("19reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min19", min1);
        }
        
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
                            localStorage.getItem("min1"),
                            localStorage.getItem("min2"),
                            localStorage.getItem("min3"),
                            localStorage.getItem("min4"),
                            localStorage.getItem("min5"),
                            localStorage.getItem("min6"),
                            localStorage.getItem("min7"),
                            localStorage.getItem("min8"),
                            localStorage.getItem("min9"),
                            localStorage.getItem("min10"),
                            localStorage.getItem("min11"),
                            localStorage.getItem("min12"),
                            localStorage.getItem("min13"),
                            localStorage.getItem("min14"),
                            localStorage.getItem("min15"),
                            localStorage.getItem("min16"),
                            localStorage.getItem("min17"),
                            localStorage.getItem("min18"),
                            localStorage.getItem("min19"),
                            localStorage.getItem("min20"),
                        ],
                        backgroundColor: "green",                        
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

export default ChartR;