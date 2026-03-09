import { useMemo, useState } from 'react';

import { BiSearch } from 'react-icons/bi';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi';
import { MdOutlineDocumentScanner } from 'react-icons/md';
import styled from 'styled-components';

import PantryLogo from '@/assets/icons/pantry-logo.svg';

import CategorySection from './CategorySection';
import { MOCK_CATEGORIES } from './mockData';
import TabBar from './TabBar';

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #eef1f6;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #d6dce8;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

const PageTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #1a2b4a;
  margin: 0;
  white-space: nowrap;
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  max-width: 360px;
  background-color: #f0f3f8;
  border: 1px solid #d6dce8;
  border-radius: 24px;
  padding: 0 14px;
  gap: 8px;
`;

const SearchIcon = styled(BiSearch)`
  color: #6b7b95;
  font-size: 18px;
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 0;
  border: none;
  background: none;
  font-size: 14px;
  outline: none;
  color: #1a2b4a;

  &::placeholder {
    color: #8a97ad;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

const NavIcon = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  padding: 6px;
  color: #1a2b4a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #eef1f6;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
`;

const EmptyMessage = styled.p`
  color: #8a97ad;
  text-align: center;
  margin-top: 40px;
  font-size: 14px;
`;

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const foodCategories = useMemo(
    () => MOCK_CATEGORIES.filter((c) => c.parent_group === 'food'),
    [],
  );

  const nonFoodCategories = useMemo(
    () => MOCK_CATEGORIES.filter((c) => c.parent_group === 'non_food'),
    [],
  );

  const filteredCategories = useMemo(() => {
    let categories = MOCK_CATEGORIES;

    if (activeTab === 'food') {
      categories = categories.filter((c) => c.parent_group === 'food');
    } else if (activeTab === 'non_food') {
      categories = categories.filter((c) => c.parent_group === 'non_food');
    }

    if (selectedCategoryId) {
      categories = categories.filter((c) => c.id === selectedCategoryId);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      categories = categories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) =>
            item.name.toLowerCase().includes(query),
          ),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    return categories;
  }, [activeTab, selectedCategoryId, searchQuery]);

  const handleItemClick = (item) => {
    console.log('Item clicked:', item.name);
  };

  return (
    <PageWrapper>
      <TopBar>
        <LogoImg src={PantryLogo} alt="New Trier Township" />
        <PageTitle>New Trier Township Food Pantry Inventory</PageTitle>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search for an item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
        <NavIcons>
          <NavIcon title="Inventory"><BsGrid3X3GapFill /></NavIcon>
          <NavIcon title="Check In"><MdOutlineDocumentScanner /></NavIcon>
          <NavIcon title="Activity"><FiClock /></NavIcon>
          <NavIcon title="Profile"><HiOutlineUser /></NavIcon>
        </NavIcons>
      </TopBar>

      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        foodCategories={foodCategories}
        nonFoodCategories={nonFoodCategories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={setSelectedCategoryId}
      />

      <Content>
        {filteredCategories.length === 0 ? (
          <EmptyMessage>No categories found.</EmptyMessage>
        ) : (
          filteredCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onItemClick={handleItemClick}
            />
          ))
        )}
      </Content>
    </PageWrapper>
  );
}