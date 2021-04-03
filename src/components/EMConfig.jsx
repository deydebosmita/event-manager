import React from 'react';
import EventCard from './EventCard';
import Filter from './Filter';
import {Button} from 'react-bootstrap';
import CreateEvent from './CreateEvent';
import './Card.css';

const EVENTS=[{
    name:'React Webinar',
    description:'Discussions about React, React-hooks and others',
    venue:'Bengaluru/Remote',
    price: 100,
    discount: '10%'

},
{
    name:'Stand up comedy',
    description:'Hillarious comedy by cool comedians must attend',
    venue:'Bengaluru',
    price: 200,
    discount: '20%'

},
{
    name:'Interview',
    description:'Recruiting React developers',
    venue:'Bengaluru',
    price: 0,
},
{
    name:'Hiking',
    description:'Join hiking with other people',
    venue:'Bengaluru',
    price: 200,
}
];

const CARD_COLORS=[
    'Primary',
    'Secondary',
    'Success',
    'Danger',
    'Warning',
    'Info',
    'Dark',
  ];

export default class Events extends React.Component{

    constructor(){
        super();
        this.state={
            cardType:'',
            showModal: false,
            events:EVENTS
        }
    }

    componentDidMount(){
        const data=JSON.parse(localStorage.getItem('eventData'));
        if(data){
            this.setState({events:this.state.events.concat(data)})
        }
    }

    getEvents=()=>{
        let events=[];
        switch(this.state.cardType){
            case 'free': { 
                events=this.state.events.filter(event=>[0,'free'].includes(event.price));
                break;
            }
            case 'discounted': { 
                events=this.state.events.filter(event=>event.discount);
                break;
            }
            case 'noDiscount': { 
                events=this.state.events.filter(event=>!event.discount &&![0,'free'].includes(event.price) );
                break;
            }
            default: events=this.state.events
        }
                return events;
    }

    render(){
        const FilterAction=[
            {name:'Free', action:()=>this.setState({cardType:'free'})},
            {name:'Discounted', action:()=>this.setState({cardType:'discounted'})},
            {name:'No Discount', action:()=>this.setState({cardType:'noDiscount'})},
            {name:'No Filter', action:()=>this.setState({cardType:''})}
        ];

        const modifiedEvents=this.getEvents();
        return(
            <div className="event-body">
                {this.state.showModal && <CreateEvent onHide={()=>{this.setState({showModal:false})}} setEvents={(events)=>this.setState({events:[...this.state.events,...events]})}/>}
                <div className="button-wrapper">
                <Button
                   variant="primary"
                   onClick={()=>{this.setState({showModal:true})}}
                >              
                Create Event
                </Button>
                <div className="filter"><Filter FilterAction={FilterAction}/></div>
                </div>
                <div>
            {modifiedEvents.map((eventObj,i)=>{
            return<div key={`${eventObj.name}_${eventObj.price}`} className="card-wrapper"><EventCard event={eventObj} color={CARD_COLORS[i%(CARD_COLORS.length-1)]}/></div> 
            })}
            </div>
            </div>
            
        )
    }

}