import React from 'react';
import Card from 'react-bootstrap/Card';

export default class EventCard extends React.Component{
render(){
    const{event={}}=this.props;
    return(
        <Card  bg={this.props.color.toLowerCase()}
        text={this.props.color.toLowerCase() === 'light' ? 'dark' : 'white'}
        style={{ width: '18rem', minHeight:'210px' }}
        className="mb-2">
    <Card.Header as="h5">{event.name}</Card.Header>
        <Card.Body>
            {[0,'free'].includes(event.price)&&
            <Card.Title>Absolutely Free</Card.Title>
            }
           {event.discount &&<Card.Title> {event.discount} off</Card.Title>}
        <Card.Text>
        <div>{event.description}</div>
        <div>{event.venue}</div>
        <div>&#x20b9; {event.price}</div>
        </Card.Text>
  </Card.Body>
</Card>
    )
}
}