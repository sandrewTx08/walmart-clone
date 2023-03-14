import styled from "styled-components";

const Container = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
`;

const Img = styled.img`
  display: block;
  height: auto;
  width: 100%;
  margin-bottom: 1em;
  border-radius: 1em;
`;

const Wrapper = styled.div`
  padding: 2em;
  margin: 1em;
  border-radius: 1em;
`;

export default function C() {
  return (
    <Container>
      <Wrapper className="shadow-soft">
        <Img src="https://picsum.photos/seed/465/300" />
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
      </Wrapper>

      <Wrapper className="shadow-soft">
        <Img src="https://picsum.photos/seed/556/300" />
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
        delectus, dolore
      </Wrapper>

      <Container>
        <Wrapper className="shadow-soft">
          <Img src="https://picsum.photos/seed/654/300" />
          <h2>Lorem ipsum dolor sit amet.</h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
          delectus, dolore
        </Wrapper>

        <Wrapper className="shadow-soft">
          <Img src="https://picsum.photos/seed/5642/300" />
          <h2>Lorem ipsum dolor sit amet.</h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
          delectus, dolore
        </Wrapper>
      </Container>

      <Wrapper className="shadow-soft">
        <Img src="https://picsum.photos/seed/769/300" />
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
        delectus, dolore
      </Wrapper>

      <Wrapper className="shadow-soft">
        <Img src="https://picsum.photos/seed/854/300" />
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
        delectus, dolore
      </Wrapper>

      <Wrapper className="shadow-soft">
        <Img src="https://picsum.photos/seed/7809/300" />
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
        delectus, dolore
      </Wrapper>
    </Container>
  );
}
