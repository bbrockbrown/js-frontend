import React from 'react'
import { Form, FormTitle } from '@/common/components/form/Form';
import SubmitButton from './SubmitButton';
import { Input } from '@/common/components/form/Input';
import { useState } from 'react';
import { Button } from '../atoms/Button';
const AddEvent = ({onClose}) => {
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        eventType: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        volunteerCap: '',
      });
const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit the new event goes here
    console.log('Event submitted');
  };
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });

  }
  const handleClose = () => {
    // Logic to close the form goes here
    onClose();
    console.log('Close button clicked');
  };
  const formStyle = {
    zIndex: '100',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '50%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'block',
  }
  const divRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  const divRowSplitStyle = {
    width: '100%',
    }
    const divRowSplitStyle2 = {
        width: '48%',
    }
    const divRowLabelStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '48%',
    }
    const cancelButtonStyle = {
        border: 'none',
        fontWeight: 'bold',
    }
    const endButtonStyle = {
        display: 'flex',
        justifyContent: 'flex-end',

    }
    const submitButtonStyle = {
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        margin: 'none',
    }
    const xStyle = {
        border: 'none',
        background: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
    }
  return (
    <Form onSubmit={handleSubmit} style={formStyle}>
        <div style={divRowStyle}>
        <FormTitle>Create New Event</FormTitle>
        <button style={xStyle} onClick={handleClose}>x</button>
        {/* make components required in next iteration 
        */}
        </div>
            <Input.Text
                      title='Event Title'
                      name='eventTitle'
                      placeholder='Food Drive'
                      value={formState.eventTitle}
                      onChange={handleChange}
                      
                    />
            <Input.Text
                      title='Event Description'
                      name='eventDescription'
                      placeholder='Event description goes here'
                      value={formState.eventDescription}
                      onChange={handleChange}
                      
                    />
            <div style={divRowStyle}>
            <div style={divRowLabelStyle}>
                <label htmlFor="eventType">Event Type</label>
            <select id="eventType" name="eventType" style={divRowSplitStyle}>
                <option value="groceryGiveaway">Grocery Giveaway</option>
                <option value="holidayEvent">Holiday Event</option>
                <option value="other">Other</option>
            </select>
            </div>
            <div style={divRowLabelStyle}>
                <label htmlFor="eventDate">Event Date</label>
            <input type="date" style={divRowSplitStyle} name="eventDate"/>
            </div>
            </div> 
            <div style={divRowStyle}>
                <div style={divRowLabelStyle}>
                    <label htmlFor="startTime">Start Time</label>
                    <input type="time" style={divRowSplitStyle} name="startTime"/>
                </div>
                <div style={divRowLabelStyle}>
                    <label htmlFor="endTime">End Time</label>
                    <input type="time" style={divRowSplitStyle} name="endTime"/>
                </div>
            
            </div>
            <div style={divRowStyle}>
            <div style={divRowSplitStyle2}>
            <Input.Text
                      title='Location'
                      name='location'
                      placeholder='CW Foundation'
                      value={formState.eventTitle}
                      onChange={handleChange}
                      
                    />
            </div>
            <div style={divRowSplitStyle2}>
            <Input.Text
                      title='Volunteer Capacity'
                      name='volunteerCapacity'
                      placeholder='Optional'
                      value={formState.eventDescription}
                      onChange={handleChange}
                    />
                    </div>
                    </div>
        <div style={endButtonStyle}>
        <Button.Transparent style={cancelButtonStyle}>Cancel</Button.Transparent>
        <SubmitButton style={submitButtonStyle}>Create Event</SubmitButton>
        </div>
    </Form>
  )
}

export default AddEvent