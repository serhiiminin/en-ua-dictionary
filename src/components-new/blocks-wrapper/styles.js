import styled from 'styled-components';

const BlockWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${props => props.theme.main.padding.large};
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export default { BlockWrapper };