import React,{useState} from 'react';
import {Button,Modal,Form} from 'react-bootstrap';

export default function CreateEvent(props){
    const [show, setShow] = useState(true);
    const [name,setName]=useState();
    const [location,setLocation]=useState();
    const [description,setDescription]=useState();
    const [price,setPrice]=useState();
    const [discount,setDiscount]=useState();



    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        const prevData=localStorage.getItem('eventData');
        const newEventData=[{
            name:name,
            description: description,
            venue: location,
            price: price,
            discount: discount
        }];
        const  eventData=prevData?[...JSON.parse(prevData),...newEventData]:newEventData;

        localStorage.setItem('eventData', JSON.stringify(eventData));
        props.setEvents([{ name:name,
            description: description,
            venue: location,
            price: price,
            discount: discount}])
        props.onHide();
      };

    const handleName =(event)=>{
       setName(event.target.value);
    }

    const handleDescription =(event)=>{
        setDescription(event.target.value);
     }

     const handleLocation =(event)=>{
        setLocation(event.target.value);
     }

     const handlePrice =(event)=>{
        setPrice(`${event.target.value}`);
     }

     const handleDiscount =(event)=>{
        setDiscount(`${event.target.value} %`);
     }

    return (
      <>
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
            props.onHide()}
          } 
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Create Event
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form  onSubmit={handleSubmit}>
  <Form.Group controlId="formBasicName">
    <Form.Label>Event Name</Form.Label>
    <Form.Control required type="string" placeholder="First Event" onChange={(e)=>handleName(e)} />
  </Form.Group>

  <Form.Group controlId="formBasicVenue">
    <Form.Label>Venue</Form.Label>
    <Form.Control type="String" placeholder="Bengaluru" onChange={e =>handleLocation(e)}/>
  </Form.Group>
  <Form.Group controlId="formBasicVenue">
    <Form.Label>Description</Form.Label>
    <Form.Control type="String" placeholder="Describe the event" onChange={e =>handleDescription(e)}/>
  </Form.Group>
  <Form.Group controlId="formBasicPrice">
    <Form.Label>Price</Form.Label>
    <Form.Control required type="number" placeholder="100" onChange={e =>handlePrice(e)}/>
     <Form.Text className="text-muted">
      Provide price eg.Rs.100
    </Form.Text>
  </Form.Group>
  <Form.Group controlId="formBasicDiscount">
    <Form.Label>Discount</Form.Label>
    <Form.Control type="number" placeholder="50" onChange={e =>handleDiscount(e)}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Add Event
  </Button>
   </Form>
          </Modal.Body>
        </Modal>
      </>
    );
}