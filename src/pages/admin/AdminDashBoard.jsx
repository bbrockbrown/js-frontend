import React from 'react';

import PageHeader from '@/common/components/atoms/PageHeader';
import { BodyContainer } from '@/common/components/form/styles';

import Stats from '../../common/components/dashboard/Stats';
import UpcomingEvents from '@/common/components/dashboard/UpcomingEvents';
const AdminDashBoard = () => {
  const styleBody = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  };
  return (
    <div style={styleBody}>
      <PageHeader title='Dashboard' />
      <BodyContainer>
        <div style={statsContainerStyle}>
          <Stats title="TOTAL VOLUNTEERS" number="6" bottomText="4 active" category="Volunteers"/>
          <Stats title="UPCOMING EVENTS" number="2" bottomText="Scheduled" category="Events"/>
          <Stats title="TOTAL HOURS" number="6" bottomText="Served" category="Hours"/>
          <Stats title="TOTAL SIGNUPS" number="7" bottomText="2 attended" category="Signups"/>
        </div>
        <div style={eventsVolunteerContainerStyle}>
        <div style={eventsContainerStyle}>
          <h3 style={styleEventsTitle}>Upcoming Events</h3>
          <UpcomingEvents EventTitle="Spring Holiday Meal Drive" tag="Holiday Event" currVol="2" volCap="25" date="Mar 27, 2026" time="8:00 AM - 2:00 PM" location="CW Foundation Community Center"/>
          <UpcomingEvents EventTitle="Grocery Giveaway" tag="Grocery Giveaway" currVol="0" volCap="15" date="Feb 27, 2026" time="9:00 AM - 12:00 PM" location="CW Foundation Community Center"/>
        </div>
        <div style={volunteerContainerStyle}>
          <h3>Recent Volunteers</h3>

          <RecentVolunteer initials="MY" name="Maddy Young" email="madeleineyoung2029@u.northwestern.edu" tag="active"/>
          <RecentVolunteer initials="HM" name="HayleyMcCormack" email="hayleymccormack@u.northwestern.edu" tag="pending"/>
          <RecentVolunteer initials="KX" name="Kayla Xu" email="kaylaxu@u.northwestern.edu" tag="inactive"/>
          <RecentVolunteer initials="DA" name="Danah Ansari" email="danahansari@u.northwestern.edu" tag="active"/>
          <RecentVolunteer initials= "AW" name="Alivia Wynn" email="aliviawynn@u.northwestern.edu" tag="pending"/>
          <RecentVolunteer initials="BI" name="Ben Isaac" email="benisaac@u.northwestern.edu" tag="inactive"/>
        </div>
        </div>
      </BodyContainer>
    </div>
  );
};

export default AdminDashBoard;
