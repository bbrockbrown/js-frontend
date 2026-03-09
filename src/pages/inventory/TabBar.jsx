import { useState, useRef, useEffect } from 'react';

import { FiFilter, FiPlus } from 'react-icons/fi';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #d6dce8;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#1a2b4a' : '#6b7b95')};
  border-bottom: 3px solid ${({ $active }) => ($active ? '#1a2b4a' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  white-space: nowrap;
  transition: all 0.15s;

  &:hover {
    color: #1a2b4a;
  }
`;

const RightSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AddButton = styled.button`
  background-color: #2a4d8f;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s;

  &:hover {
    background-color: #1e3a6e;
  }
`;

const FilterAllButton = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #6b7b95;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 6px;

  &:hover {
    color: #1a2b4a;
    background-color: #f0f3f8;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: #ffffff;
  border: 1px solid #d6dce8;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  min-width: 220px;
  z-index: 10;
  padding: 4px 0;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 10px 16px;
  font-size: 13px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#1a2b4a' : '#374151')};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  background-color: ${({ $active }) => ($active ? '#eef1f6' : 'transparent')};

  &:hover {
    background-color: #f0f3f8;
  }
`;

export default function TabBar({
  activeTab,
  onTabChange,
  foodCategories,
  nonFoodCategories,
  selectedCategoryId,
  onCategorySelect,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tab) => {
    if (tab === 'all') {
      onTabChange('all');
      onCategorySelect(null);
      setOpenDropdown(null);
    } else if (tab === 'food') {
      if (openDropdown === 'food') {
        setOpenDropdown(null);
      } else {
        onTabChange('food');
        setOpenDropdown('food');
      }
    } else if (tab === 'non_food') {
      if (openDropdown === 'non_food') {
        setOpenDropdown(null);
      } else {
        onTabChange('non_food');
        setOpenDropdown('non_food');
      }
    }
  };

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
    setOpenDropdown(null);
  };

  return (
    <TabContainer ref={dropdownRef}>
      <Tab $active={activeTab === 'all'} onClick={() => handleTabClick('all')}>
        All Items
      </Tab>

      <DropdownWrapper>
        <Tab
          $active={activeTab === 'food'}
          onClick={() => handleTabClick('food')}
        >
          Food Items ▾
        </Tab>
        {openDropdown === 'food' && (
          <Dropdown>
            <DropdownItem
              $active={!selectedCategoryId}
              onClick={() => handleCategoryClick(null)}
            >
              All Food Items
            </DropdownItem>
            {foodCategories.map((cat) => (
              <DropdownItem
                key={cat.id}
                $active={selectedCategoryId === cat.id}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </DropdownWrapper>

      <DropdownWrapper>
        <Tab
          $active={activeTab === 'non_food'}
          onClick={() => handleTabClick('non_food')}
        >
          Non-Food Items ▾
        </Tab>
        {openDropdown === 'non_food' && (
          <Dropdown>
            <DropdownItem
              $active={!selectedCategoryId}
              onClick={() => handleCategoryClick(null)}
            >
              All Non-Food Items
            </DropdownItem>
            {nonFoodCategories.map((cat) => (
              <DropdownItem
                key={cat.id}
                $active={selectedCategoryId === cat.id}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </DropdownWrapper>

      <RightSection>
        <AddButton title="Add Category"><FiPlus /></AddButton>
        <FilterAllButton><span>Filter All</span> <FiFilter size={14} /></FilterAllButton>
      </RightSection>
    </TabContainer>
  );
}

TabBar.propTypes = {
  activeTab: PropTypes.oneOf(['all', 'food', 'non_food']).isRequired,
  onTabChange: PropTypes.func.isRequired,
  foodCategories: PropTypes.array.isRequired,
  nonFoodCategories: PropTypes.array.isRequired,
  selectedCategoryId: PropTypes.number,
  onCategorySelect: PropTypes.func.isRequired,
};