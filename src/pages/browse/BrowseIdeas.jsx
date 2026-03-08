import React, { useState } from 'react';
import styled from 'styled-components';
import ProposalEntry from '@/common/components/cards/ProposalEntry';
import ProposalModal from '@/common/components/modals/ProposalModal'; 

const PageContainer = styled.div`
  background-color: #f8f8f6;
  min-height: 100vh;
  padding: 3rem 4rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
`;

const SearchInput = styled.input`
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  border: 1px solid #dfdfdf;
  width: 300px;
  font-size: 1rem;
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr; /* 300px sidebar, the rest for cards */
  gap: 4rem;
`;

// --- SIDEBAR STYLES ---

const Sidebar = styled.aside`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 2rem;
  height: fit-content;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.03);
`;

const SidebarLabel = styled.h4`
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 15px;
  border: 1px solid #dfdfdf;
  background-color: #fafafa;
  font-weight: 500;
`;

// --- DUMMY DATA ---

const dummyProposals = [
  {
    id: 1,
    title: "Health Proposal",
    category: "Health & Wellness",
    date: "Mon Feb 14",
    votes: 20,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 2,
    title: "New Public Park",
    category: "Economic Development",
    date: "Wed Feb 16",
    votes: 85,
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
  },
  {
    id: 3,
    title: "After School Arts Program",
    category: "Arts & Culture",
    date: "Fri Feb 18",
    votes: 12,
    description: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet."
  }
];


export default function BrowseIdeas() {
  // controls modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // tracks when proposal entry clicked
  const [selectedProposal, setSelectedProposal] = useState(null);

  const handleOpenModal = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Browse</Title>
        <SearchInput type="text" placeholder="Search..." />
      </PageHeader>

      <LayoutGrid>
        {/* SIDEBAR */}
        <Sidebar>
          <Dropdown>
            <option>Filter By Category</option>
            <option>Housing</option>
            <option>Health & Wellness</option>
          </Dropdown>
          <Dropdown>
            <option>Filter By Date</option>
            <option>Newest First</option>
            <option>Oldest First</option>
          </Dropdown>

          <SidebarLabel style={{ marginTop: '2rem' }}>Tags</SidebarLabel>
          <p style={{ color: '#7f7f7f', fontSize: '0.9rem' }}>Will implement later!!</p>
        </Sidebar>

        {/* MAIN FEED */}
        <div>
          {dummyProposals.map((proposal) => (
            <ProposalEntry 
              key={proposal.id}
              title={proposal.title}
              category={proposal.category}
              description={proposal.description}
              date={proposal.date}
              votes={proposal.votes}
              // When "Comment" is clicked, pass THIS proposal data to the modal
              onCommentClick={() => handleOpenModal(proposal)} 
            />
          ))}
        </div>
      </LayoutGrid>

    {isModalOpen && (
        <ProposalModal 
           proposalData={selectedProposal} 
           onClose={() => setIsModalOpen(false)} 
        />
      )}

    </PageContainer>
  );
}