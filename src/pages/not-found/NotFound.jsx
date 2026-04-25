import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function NotFound() {
  return (
    <Container>
      <h1>Page not found</h1>
    </Container>
  );
}
