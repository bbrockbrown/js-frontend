import React, { useState } from 'react';
import styled from 'styled-components';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import StaffLoginModal from '@/common/components/navigation/StaffLoginModal';
import ForgotPasswordModal from '@/common/components/navigation/ForgotPasswordModal';

const CategoryData = [
  { name: 'Education', value: 20, fill: '#6b21a8' },
  { name: 'Community Support', value: 72, fill: '#1d4ed8' },
  { name: 'Legal', value: 28, fill: '#9a8348' },
  { name: 'Operations', value: 45, fill: '#4a5568' },
  { name: 'Special Projects', value: 60, fill: '#15803d' },
];

const StateData = [
  { name: 'FL', value: 58.72, percent: 15.89, fill: '#4a5568' },
  { name: 'TX', value: 33.2, percent: 9.3, fill: '#f4a0a0' },
  { name: 'AL', value: 10.44, percent: 2.92, fill: '#1e3a5f' },
  { name: 'NC', value: 91.06, percent: 25.5, fill: '#ffa500' },
  { name: 'SC', value: 22, percent: 6.16, fill: '#2f4f4f' },
  { name: 'IL', value: 78.84, percent: 22.08, fill: '#166534' },
  { name: 'MN', value: 64.78, percent: 18.14, fill: '#9370db' },
];

const TOTAL_FUNDS = 852324;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--rsae-bg);
  font-family: var(--font-agenda);
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.25rem 2rem;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const LogoImg = styled.img`
  height: 58px;
  width: auto;
  display: block;
  justify-self: start;
`;

const TitleCenter = styled.h1`
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--rsae-gold);
  margin: 0;
  white-space: nowrap;
  text-align: center;
  justify-self: center;
`;

const StaffLoginBtn = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 10px;
  background-color: var(--rsae-light-blue);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-agenda);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Main = styled.main`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 2rem;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const TotalFunds = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 1rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f6f1 100%);
  border-radius: 16px;
  border: 1px solid rgba(154, 131, 72, 0.2);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
`;

const TotalFundsLabel = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  color: #4a5568;
  font-family: var(--font-agenda);
  margin-bottom: 0.5rem;
`;

const TotalFundsAmount = styled.span`
  font-weight: 700;
  font-size: 2.5rem;
  color: var(--rsae-gold);
  font-family: var(--font-agenda);
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  grid-column: 1 / -1;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  min-height: 460px;
`;

const ChartTitle = styled.h2`
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--rsae-black);
  font-family: var(--font-agenda);
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function PublicView() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleStaffLoginClick = () => setLoginModalOpen(true);
  const handleShowForgotPassword = () => setForgotModalOpen(true);

  const totalFormattedWithComma = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(TOTAL_FUNDS);

  return (
    <PageWrapper>
      <Header>
        <LogoImg
          src="/rsae-logo.png"
          alt="Reparations Stakeholders Authority Evanston"
        />
        <TitleCenter>Public Funds and Donation Dashboard</TitleCenter>
        <HeaderRight>
          <StaffLoginBtn onClick={handleStaffLoginClick}>
            Staff Log In
          </StaffLoginBtn>
        </HeaderRight>
      </Header>

      <Main>
        <ChartsSection>
          <TotalFunds>
            <TotalFundsLabel>Total Funds</TotalFundsLabel>
            <TotalFundsAmount>{totalFormattedWithComma}</TotalFundsAmount>
          </TotalFunds>

          <ChartsGrid>
          <ChartCard>
            <ChartTitle>Fund Breakdown By Category</ChartTitle>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={CategoryData} margin={{ top: 12, right: 12, left: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} horizontal={true} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#4a5568', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-agenda)' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  tickMargin={12}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tick={{ fill: '#4a5568', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-agenda)' }}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={4}
                  width={36}
                />
                <Tooltip
                  contentStyle={{
                    fontFamily: 'var(--font-agenda)',
                    borderRadius: 12,
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={80}>
                  {CategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard>
            <ChartTitle>Fund Breakdown By State</ChartTitle>
            <ResponsiveContainer width="100%" height={420}>
              <PieChart margin={{ right: 100 }}>
                <Pie
                  data={StateData}
                  cx="42%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={175}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                  labelLine={false}
                  label={({ cx, cy, index }) =>
                    index === 0 ? (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          fill: '#4a5568',
                          fontFamily: 'var(--font-agenda)',
                        }}
                      >
                        {totalFormattedWithComma}
                      </text>
                    ) : null
                  }
                >
                  {StateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value} (${props.payload.percent}%)`,
                    name,
                  ]}
                  contentStyle={{
                    fontFamily: 'var(--font-agenda)',
                    borderRadius: 12,
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    color: '#4a5568',
                  }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{
                    fontFamily: 'var(--font-agenda)',
                    color: '#4a5568',
                    fontSize: 15,
                    lineHeight: 1.8,
                  }}
                  iconType="circle"
                  iconSize={12}
                  iconGap={10}
                  itemGap={14}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </ChartsGrid>
        </ChartsSection>
      </Main>

      <StaffLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onShowForgotPassword={handleShowForgotPassword}
      />
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
      />
    </PageWrapper>
  );
}
