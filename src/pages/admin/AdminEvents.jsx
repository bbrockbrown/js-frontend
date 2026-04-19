import PageHeader from '@/common/components/atoms/PageHeader';
import React, { useEffect } from 'react'
import { BodyContainer } from '@/common/components/form/styles';
import {Button} from '@/common/components/atoms/Button';
import AddEvent from '@/common/components/form/AddEvent';
import { useState } from 'react';
import { auth } from '@/firebase-config';

const buildUrl = (endpoint) =>
  `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}${endpoint}`;

const AdminEvents = () => {
    const styleBody = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  };
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const addEventStyle = {
    display: 'none',
  };

  const loadEvents = async () => {
    try {
      setError('');
      const response = await fetch(buildUrl('/api/events'));
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json()
        : [];

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load events');
      }

      setEvents(Array.isArray(data) ? data : []);
    } catch (loadError) {
      setError(loadError.message);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowAddEvent(true);
  };
  const handleCloseAddEvent = () => {
    setShowAddEvent(false);
    setEditingEvent(null);
    console.log('Close Add Event form');
  };
  const handleEventCreated = () => {
    setShowAddEvent(false);
    setEditingEvent(null);
    loadEvents();
  };
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowAddEvent(true);
  };
  const handleDeleteEvent = async (eventId) => {
    try {
      const token = await auth.currentUser?.getIdToken();

      if (!token) {
        throw new Error('You must be logged in to delete an event.');
      }

      const response = await fetch(buildUrl(`/api/events/${eventId}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json()
        : { error: await response.text() };

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete event');
      }

      loadEvents();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };
  return (
    <div style={styleBody}>
      <PageHeader title="Events"/>
      <BodyContainer>
         <Button.Navy onClick={handleAddEvent}>+ New Event</Button.Navy>
         {error ? <p style={{ color: 'red' }}>{error}</p> : null}
         {events.length > 0 ? (
          <div style={{ width: '100%', marginTop: '20px' }}>
            {events.map((event) => (
              <div
                key={event.id}
                style={{
                  backgroundColor: '#fff',
                  padding: '16px',
                  marginBottom: '12px',
                  borderRadius: '10px',
                  boxShadow: '0px 1px 2px lightgray',
                }}
              >
                <h3 style={{ marginTop: '0' }}>{event.title}</h3>
                <p>{event.description || 'No description provided.'}</p>
                <p>Location: {event.location || 'Not provided'}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button.Secondary onClick={() => handleEditEvent(event)}>Edit</Button.Secondary>
                  <Button.Transparent onClick={() => handleDeleteEvent(event.id)}>Delete</Button.Transparent>
                </div>
              </div>
            ))}
          </div>
         ) : (
          <p>No events yet.</p>
         )}
         {showAddEvent ? 
            <AddEvent style={addEventStyle} open={showAddEvent} onClose={handleCloseAddEvent} onCreated={handleEventCreated} initialEvent={editingEvent}></AddEvent>
         : null}
      </BodyContainer>
         
    </div>

  )
}

export default AdminEvents
