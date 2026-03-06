import React from 'react'
import GreenVolunteers from '../../../assets/images/GreenVolunteers.png'
const Stats = () => {
  const statsDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: "12%",
    height: "auto",
    aspectRatio: "1/1",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0px 2px 4px gray",
    padding: "20px",
  }
  const statsTopStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: "#585858",
  }
  const statIconStyle = {
    width: "50px",
    height: "auto",
  }
  const statBGStyle = {
    height: "100%",
    width: "auto",
    aspectRatio: "1/1",
    backgroundColor: "#E3F8E9",
    borderRadius: "15px",
    display: "flex",
  }

  return (
    <div style={statsDivStyle}>
      <div style={statsTopStyle}>
        <div>TOTAL VOLUNTEERS</div>
        <div style={statBGStyle}>
          <img src={GreenVolunteers} alt="Green Volunteers" style={statIconStyle}/>
        </div>
      </div>
      <div>6</div>
      <div>4 active</div>

    </div>
  )
}

export default Stats