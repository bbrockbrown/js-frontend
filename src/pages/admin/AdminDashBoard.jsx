import PageHeader from '@/common/components/atoms/PageHeader'
import React from 'react'
import { BodyContainer } from '@/common/components/form/styles'
import Stats from '../../common/components/dashboard/Stats'
const AdminDashBoard = () => {
  const styleBody = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
  return (
    <div style={styleBody}>
    <PageHeader title="Dashboard" />
    <BodyContainer>
      <Stats>
      </Stats>
    </BodyContainer>
    </div>
  )
}

export default AdminDashBoard