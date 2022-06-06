import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  // align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    padding-right: 0.25rem;
    display: block;
  }
`;

const Intro = (params) => {
  return (
    <StyledSection>
      <div className="pl-20 space-y-5">
        <h1 className="text-6xl sm:text-8xl">Full Stack Developer.</h1>
        <p>Build some software</p>
        <p>Like to reinventing the wheel</p>
      </div>
    </StyledSection>
  );
};

export default Intro;
