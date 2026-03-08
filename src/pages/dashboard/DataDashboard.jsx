import React from 'react';
import styled from 'styled-components';

// --- STYLED COMPONENTS ---

const PageContainer = styled.div`
  background-color: #f8f8f6;
  min-height: calc(100vh - 100px);
  padding: 3rem 4rem;
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 2rem 0;
  color: #1a1a1a;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 160px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
  color: #1a1a1a;
`;

const PendingBadge = styled.span`
  background-color: #ffe3e6;
  color: #e01e48;
  border: 1px solid #ffdce0;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const CardValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const MainNumber = styled.span`
  font-size: 3rem;
  font-weight: 800;
  color: #d1a90c; /* RSAE Gold / Dark Yellow */
  line-height: 1;
`;

const SubText = styled.span`
  font-size: 1rem;
  color: #696969;
  font-weight: 500;
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; /* The left card takes 1 fraction, right takes 2 */
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr; /* Stacks on smaller screens */
  }
`;

const DistributionCard = styled(Card)`
  justify-content: flex-start;
  gap: 1.5rem;
`;

const DistItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const DistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a1a;
`;

const Track = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f3f4f6;
  border-radius: 10px;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  width: ${props => props.$percentage}%;
  background-color: rgba(244, 202, 37, ${props => props.$opacity});
  border-radius: 10px;
`;

const ChartPlaceholder = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-weight: 500;
  font-size: 1.2rem;
  min-height: 400px;
`;


// --- REUSABLE COMPONENTS ---

const StatCard = ({ title, pending, number, timeframe }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {pending && <PendingBadge>• {pending} pending</PendingBadge>}
    </CardHeader>
    <CardValueRow>
      <MainNumber>{number}</MainNumber>
      <SubText>{timeframe}</SubText>
    </CardValueRow>
  </Card>
);

const ProgressBar = ({ label, percentage, opacity }) => (
  <DistItem>
    <DistHeader>
      <span>{label}</span>
      <span>{percentage}%</span>
    </DistHeader>
    <Track>
      <Fill $percentage={percentage} $opacity={opacity} />
    </Track>
  </DistItem>
);


// --- MAIN PAGE RENDER ---

export default function DataDashboard() {
  return (
    <PageContainer>
      <Header>Dashboard Overview</Header>

      {/* TOP ROW: STAT CARDS */}
      <StatsRow>
        <StatCard 
          title="Total Submissions" 
          pending="20" 
          number="1,200" 
          timeframe="this month" 
        />
        <StatCard 
          title="Active Users" 
          pending="5" 
          number="842" 
          timeframe="this month" 
        />
        <StatCard 
          title="Total Interactions" 
          pending={null}
          number="10K" 
          timeframe="all time" 
        />
      </StatsRow>

      {/* BOTTOM ROW: DISTRIBUTION & CHART */}
      <BottomGrid>
        
        <DistributionCard>
          <Header style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Category Distribution</Header>
          
          <ProgressBar label="Housing" percentage={42} opacity={1.0} />
          <ProgressBar label="Health and Wellness" percentage={28} opacity={0.6} />
          <ProgressBar label="Economic Development" percentage={15} opacity={0.4} />
          <ProgressBar label="Art and Culture" percentage={10} opacity={0.2} />
          <ProgressBar label="Education" percentage={10} opacity={0.2} />
        </DistributionCard>

        <ChartPlaceholder>
          [ Interactive Chart Area Placeholder ]
        </ChartPlaceholder>

      </BottomGrid>

    </PageContainer>
  );
}