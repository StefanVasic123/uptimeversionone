import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class ChartR extends Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem("101reserved") !== null) {
            const getLS1 = localStorage.getItem("101reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min101", min1);
        }
        if(localStorage.getItem("102reserved") !== null) {
            const getLS2 = localStorage.getItem("102reserved");
            let arr2 = getLS2.split(',');
            let min2 = Math.min(...arr2);
            localStorage.setItem("min102", min2);
        }
        if(localStorage.getItem("103reserved") !== null) {
            const getLS3 = localStorage.getItem("103reserved");
            let arr3 = getLS3.split(',');
            let min3 = Math.min(...arr3);
            localStorage.setItem("min103", min3);
        }
        if(localStorage.getItem("104reserved") !== null) {
            const getLS4 = localStorage.getItem("104reserved");
            let arr4 = getLS4.split(',');
            let min4 = Math.min(...arr4);
            localStorage.setItem("min104", min4);
        }
        if(localStorage.getItem("105reserved") !== null) {
            const getLS5 = localStorage.getItem("105reserved");
            let arr5 = getLS5.split(',');
            let min5 = Math.min(...arr5);
            localStorage.setItem("min105", min5);
        }
        if(localStorage.getItem("106reserved") !== null) {
            const getLS6 = localStorage.getItem("106reserved");
            let arr6 = getLS6.split(',');
            let min6 = Math.min(...arr6);
            localStorage.setItem("min106", min6);
        }
        if(localStorage.getItem("107reserved") !== null) {
            const getLS7 = localStorage.getItem("107reserved");
            let arr7 = getLS7.split(',');
            let min7 = Math.min(...arr7);
            localStorage.setItem("min107", min7);
        }
        if(localStorage.getItem("108reserved") !== null) {
            const getLS8 = localStorage.getItem("108reserved");
            let arr8 = getLS8.split(',');
            let min8 = Math.min(...arr8);
            localStorage.setItem("min108", min8);
        }
        if(localStorage.getItem("109reserved") !== null) {
            const getLS9 = localStorage.getItem("109reserved");
            let arr9 = getLS9.split(',');
            let min9 = Math.min(...arr9);
            localStorage.setItem("min109", min9);
        }
        if(localStorage.getItem("110reserved") !== null) {
            const getLS10 = localStorage.getItem("110reserved");
            let arr10 = getLS10.split(',');
            let min10 = Math.min(...arr10);
            localStorage.setItem("min110", min10);
        }
        if(localStorage.getItem("111reserved") !== null) {
            const getLS1 = localStorage.getItem("111reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min111", min1);
        }
        if(localStorage.getItem("112reserved") !== null) {
            const getLS1 = localStorage.getItem("112reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min112", min1);
        }
        if(localStorage.getItem("113reserved") !== null) {
            const getLS1 = localStorage.getItem("113reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min113", min1);
        }
        if(localStorage.getItem("114reserved") !== null) {
            const getLS1 = localStorage.getItem("114reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min114", min1);
        }
        if(localStorage.getItem("115reserved") !== null) {
            const getLS1 = localStorage.getItem("115reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min115", min1);
        }
        if(localStorage.getItem("116reserved") !== null) {
            const getLS1 = localStorage.getItem("116reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min116", min1);
        }
        if(localStorage.getItem("117reserved") !== null) {
            const getLS1 = localStorage.getItem("117reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min117", min1);
        }
        if(localStorage.getItem("118reserved") !== null) {
            const getLS1 = localStorage.getItem("118reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min118", min1);
        }
        if(localStorage.getItem("119reserved") !== null) {
            const getLS1 = localStorage.getItem("119reserved");
            let arr1 = getLS1.split(',');
            let min1 = Math.min(...arr1);
            localStorage.setItem("min119", min1);
        }
        
        const label = () => {
            let compBasic = localStorage.getItem("propertiesSecond");
            let compBasicArr = compBasic.split(',');

            let compAdded = localStorage.getItem("propertiesNowSecond") !== null ? localStorage.getItem("propertiesNowSecond") : "null";
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
                            localStorage.getItem("min101"),
                            localStorage.getItem("min102"),
                            localStorage.getItem("min103"),
                            localStorage.getItem("min104"),
                            localStorage.getItem("min105"),
                            localStorage.getItem("min106"),
                            localStorage.getItem("min107"),
                            localStorage.getItem("min108"),
                            localStorage.getItem("min109"),
                            localStorage.getItem("min110"),
                            localStorage.getItem("min111"),
                            localStorage.getItem("min112"),
                            localStorage.getItem("min113"),
                            localStorage.getItem("min114"),
                            localStorage.getItem("min115"),
                            localStorage.getItem("min116"),
                            localStorage.getItem("min117"),
                            localStorage.getItem("min118"),
                            localStorage.getItem("min119")
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