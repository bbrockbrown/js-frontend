import PropTypes from 'prop-types';
import styled from 'styled-components';

const getRowBackground = (status, index) => {
  if (status === 'out_of_stock') return '#f8b4b4';
  if (status === 'low_stock') return '#fde68a';
  return index % 2 === 0 ? '#ffffff' : '#eef1f6';
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: ${({ $bg }) => $bg};
  border-bottom: 1px solid #e8ecf2;
  cursor: pointer;
  transition: opacity 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const ItemName = styled.span`
  font-size: 14px;
  color: #1a2b4a;
`;

const Quantity = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1a2b4a;
  min-width: 50px;
  text-align: right;
`;

export default function ItemRow({ item, onClick, index }) {
  return (
    <Row
      $bg={getRowBackground(item.status, index)}
      onClick={() => onClick?.(item)}
    >
      <ItemName>{item.name}</ItemName>
      <Quantity>{item.total_quantity}</Quantity>
    </Row>
  );
}

ItemRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    total_quantity: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['out_of_stock', 'low_stock', 'normal']).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  index: PropTypes.number,
};