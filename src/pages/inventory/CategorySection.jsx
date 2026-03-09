import { useState } from 'react';

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { FiFilter, FiLock } from 'react-icons/fi';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ItemRow from './ItemRow';

const Wrapper = styled.div`
  margin-bottom: 12px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #c8d0dc;
  background-color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #1e3158;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
`;

const CategoryName = styled.span`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const HeaderButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  padding: 0 2px;
  display: flex;
  align-items: center;
`;

const ItemList = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const EmptyMessage = styled.div`
  padding: 12px 16px;
  font-size: 13px;
  color: #8a97ad;
  font-style: italic;
`;

export default function CategorySection({ category, onItemClick }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Wrapper>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <CategoryName>{category.name}</CategoryName>
        <HeaderActions>
          <HeaderButton onClick={(e) => e.stopPropagation()}>
            Edit <FiLock size={11} />
          </HeaderButton>
          <HeaderButton onClick={(e) => e.stopPropagation()}>
            Filter <FiFilter size={11} />
          </HeaderButton>
          <CollapseButton>
            {isOpen ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}
          </CollapseButton>
        </HeaderActions>
      </Header>
      <ItemList $isOpen={isOpen}>
        {category.items.length === 0 ? (
          <EmptyMessage>No items in this category</EmptyMessage>
        ) : (
          category.items.map((item, index) => (
            <ItemRow key={item.id} item={item} onClick={onItemClick} index={index} />
          ))
        )}
      </ItemList>
    </Wrapper>
  );
}

CategorySection.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func,
};