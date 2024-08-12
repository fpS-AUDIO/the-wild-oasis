import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Heading from "./ui/Heading";
import Row from "./ui/Row";
import Button from "./ui/Button";
import Input from "./ui/Input";

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  // <GlobalStyles /> doesn't accept children, it used as a sibling
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="horizonal">
          <Heading as="h1">The Wild Oasis</Heading>

          <div>
            <Heading as="h2">Check in and out</Heading>
            <Button variation="primary" size="medium">
              Check In
            </Button>
            <Button variation="secondary" size="small">
              Check Out
            </Button>
          </div>
        </Row>

        <Row type="vertical">
          <Heading as="h3">Form</Heading>
          <form>
            <Input type="number" placeholder="Number of guests" />
            <Input type="number" placeholder="Number of guests" />
          </form>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
