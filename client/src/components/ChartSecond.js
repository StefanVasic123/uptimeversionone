import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class ChartSecond extends Component {
    constructor(props) {
        super(props);
        const comp101 = localStorage.getItem("101promoHour") !== null ? Number(localStorage.getItem("101normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("101normalEnd");
        const comp102 = localStorage.getItem("102promoHour") !== null ? Number(localStorage.getItem("102normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("102normalEnd");
        const comp103 = localStorage.getItem("103promoHour") !== null ? Number(localStorage.getItem("103normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("103normalEnd");
        const comp104 = localStorage.getItem("104promoHour") !== null ? Number(localStorage.getItem("104normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("104normalEnd");
        const comp105 = localStorage.getItem("105promoHour") !== null ? Number(localStorage.getItem("105normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("105normalEnd");
        const comp106 = localStorage.getItem("106promoHour") !== null ? Number(localStorage.getItem("106normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("106normalEnd");
        const comp107 = localStorage.getItem("107promoHour") !== null ? Number(localStorage.getItem("107normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("107normalEnd");
        const comp108 = localStorage.getItem("108promoHour") !== null ? Number(localStorage.getItem("108normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("108normalEnd");
        const comp109 = localStorage.getItem("109promoHour") !== null ? Number(localStorage.getItem("109normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("109normalEnd");
        const comp110 = localStorage.getItem("110promoHour") !== null ? Number(localStorage.getItem("110normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("110normalEnd");
        const comp111 = localStorage.getItem("111promoHour") !== null ? Number(localStorage.getItem("111normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("111normalEnd");
        const comp112 = localStorage.getItem("112promoHour") !== null ? Number(localStorage.getItem("112normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("112normalEnd");
        const comp113 = localStorage.getItem("113promoHour") !== null ? Number(localStorage.getItem("113normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("113normalEnd");
        const comp114 = localStorage.getItem("114promoHour") !== null ? Number(localStorage.getItem("114normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("114normalEnd");
        const comp115 = localStorage.getItem("115promoHour") !== null ? Number(localStorage.getItem("115normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("115normalEnd");
        const comp116 = localStorage.getItem("116promoHour") !== null ? Number(localStorage.getItem("116normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("116normalEnd");
        const comp117 = localStorage.getItem("117promoHour") !== null ? Number(localStorage.getItem("117normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("117normalEnd");
        const comp118 = localStorage.getItem("118promoHour") !== null ? Number(localStorage.getItem("118normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("118normalEnd");
        const comp119 = localStorage.getItem("119promoHour") !== null ? Number(localStorage.getItem("119normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("119normalEnd");
        const comp120 = localStorage.getItem("120promoHour") !== null ? Number(localStorage.getItem("120normalEnd")) + Number(localStorage.getItem("promoHours")) : localStorage.getItem("120normalEnd"); 
        
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
                            comp101,
                            comp102,
                            comp103,
                            comp104,
                            comp105,
                            comp106,
                            comp107,
                            comp108,
                            comp109,
                            comp110,
                            comp111,
                            comp112,
                            comp113,
                            comp114,
                            comp115,
                            comp116,
                            comp117,
                            comp118,
                            comp119,
                            comp120
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

export default ChartSecond;