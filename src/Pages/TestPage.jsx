import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-areas:
    'header header header header header header'
    'menu main main main right right'
    'menu footer footer footer footer footer';
  gap: 10px;
  background-color: #2196F3;
  padding: 10px;
`;

const GridItem = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
`;

function FrontPage() {
  return (
    <GridContainer>
      <GridItem style={{ gridArea: 'header' }}>Header</GridItem>
      <GridItem style={{ gridArea: 'menu' }}>Menu</GridItem>
      <GridItem style={{ gridArea: 'main' }}>Main</GridItem>
      <GridItem style={{ gridArea: 'right' }}>Right</GridItem>
      <GridItem style={{ gridArea: 'footer' }}>Footer</GridItem>
    </GridContainer>
  );
}

export default FrontPage;