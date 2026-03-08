import PageHeader from '@/common/components/atoms/PageHeader';
import React from 'react'
import { BodyContainer } from '@/common/components/form/styles';
import {Button} from '@/common/components/atoms/Button';
import AddEvent from '@/common/components/form/AddEvent';
import { useState } from 'react';
const AdminEvents = () => {
    const styleBody = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  };
  const [showAddEvent, setShowAddEvent] = useState(false);
  const addEventStyle = {
    display: 'none',
  };
  const handleAddEvent = () => {
    // Logic to add a new event goes here
    setShowAddEvent(true);
    console.log('Add Event button clicked');
  };
  const handleCloseAddEvent = () => {
    setShowAddEvent(false);
    console.log('Close Add Event form');
  };
  return (
    <div style={styleBody}>
      <PageHeader title="Events"/>
      <BodyContainer>
         <Button.Navy onClick={handleAddEvent}>+ New Event</Button.Navy>
         {showAddEvent ? 
            <AddEvent style={addEventStyle} open={showAddEvent} onClose={handleCloseAddEvent}></AddEvent>
         : null}
      </BodyContainer>
         
    </div>

  )
}

export default AdminEvents