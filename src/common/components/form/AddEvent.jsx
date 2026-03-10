import React from 'react'
import { Form, FormTitle } from '@/common/components/form/Form';
import SubmitButton from './SubmitButton';
import { Input } from '@/common/components/form/Input';
import { useState } from 'react';
import { Button } from '../atoms/Button';
import { auth } from '@/firebase-config';

const buildUrl = (endpoint) =>
  `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}${endpoint}`;

const AddEvent = ({onClose, onCreated, initialEvent}) => {
    const [formState, setFormState] = useState({
        eventTitle: initialEvent?.title || '',
        eventDescription: initialEvent?.description || '',
        eventType: '',
        eventDate: initialEvent?.start_time ? new Date(initialEvent.start_time).toISOString().split('T')[0] : '',
        startTime: initialEvent?.start_time ? new Date(initialEvent.start_time).toTimeString().slice(0, 5) : '',
        endTime: initialEvent?.end_time ? new Date(initialEvent.end_time).toTimeString().slice(0, 5) : '',
        location: initialEvent?.location || '',
        volunteerCapacity: initialEvent?.capacity ? String(initialEvent.capacity) : '',
      });
      const [error, setError] = useState('');
      const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formState.eventTitle || !formState.eventDate || !formState.startTime || !formState.endTime) {
      setError('Please fill in the required event fields.');
      return;
    }

    const token = await auth.currentUser?.getIdToken();

    if (!token) {
      setError('You must be logged in to manage events.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(buildUrl(initialEvent ? `/api/events/${initialEvent.id}` : '/api/events'), {
        method: initialEvent ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formState.eventTitle,
          description: formState.eventDescription || null,
          location: formState.location || null,
          capacity: formState.volunteerCapacity
            ? Number(formState.volunteerCapacity)
            : 20,
          start_time: new Date(`${formState.eventDate}T${formState.startTime}`).toISOString(),
          end_time: new Date(`${formState.eventDate}T${formState.endTime}`).toISOString(),
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json()
        : { error: await response.text() };

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save event');
      }

      if (onCreated) {
        onCreated(data.event);
      }

      onClose();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setError('');

  }
  const handleClose = () => {
    onClose();
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
        <FormTitle>{initialEvent ? 'Edit Event' : 'Create New Event'}</FormTitle>
        <button type='button' style={xStyle} onClick={handleClose}>x</button>
        </div>
        {error ? <div style={{ color: 'red', textAlign: 'left' }}>{error}</div> : null}
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
            <select id="eventType" name="eventType" style={divRowSplitStyle} value={formState.eventType} onChange={handleChange}>
                <option value="groceryGiveaway">Grocery Giveaway</option>
                <option value="holidayEvent">Holiday Event</option>
                <option value="other">Other</option>
            </select>
            </div>
            <div style={divRowLabelStyle}>
                <label htmlFor="eventDate">Event Date</label>
            <input type="date" style={divRowSplitStyle} name="eventDate" value={formState.eventDate} onChange={handleChange}/>
            </div>
            </div> 
            <div style={divRowStyle}>
                <div style={divRowLabelStyle}>
                    <label htmlFor="startTime">Start Time</label>
                    <input type="time" style={divRowSplitStyle} name="startTime" value={formState.startTime} onChange={handleChange}/>
                </div>
                <div style={divRowLabelStyle}>
                    <label htmlFor="endTime">End Time</label>
                    <input type="time" style={divRowSplitStyle} name="endTime" value={formState.endTime} onChange={handleChange}/>
                </div>
            
            </div>
            <div style={divRowStyle}>
            <div style={divRowSplitStyle2}>
            <Input.Text
                      title='Location'
                      name='location'
                      placeholder='CW Foundation'
                      value={formState.location}
                      onChange={handleChange}
                      
                    />
            </div>
            <div style={divRowSplitStyle2}>
            <Input.Text
                      title='Volunteer Capacity'
                      name='volunteerCapacity'
                      placeholder='Optional'
                      value={formState.volunteerCapacity}
                      onChange={handleChange}
                    />
                    </div>
                    </div>
        <div style={endButtonStyle}>
        <Button.Transparent type='button' style={cancelButtonStyle} onClick={handleClose}>Cancel</Button.Transparent>
        <SubmitButton style={submitButtonStyle} disabled={isLoading}>
          {isLoading ? (initialEvent ? 'Saving...' : 'Creating...') : (initialEvent ? 'Save Event' : 'Create Event')}
        </SubmitButton>
        </div>
    </Form>
  )
}

export default AddEvent
