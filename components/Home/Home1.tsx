import Link from "next/link";
import styled from "styled-components";
import Card from "@/components/Product/Card1";

const Container = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 340px 1fr;
  gap: 1em;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
  }
`;

const Img = styled.img`
  display: block;
  height: auto;
  width: 100%;
  margin: 1em 0;
  border-radius: 50%;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 2em;
  border-radius: 1em;
  flex-direction: column;
`;

export default function C({ product }) {
  return (
    <Container>
      <Wrapper
        className="shadow-soft"
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 3,
          backgroundImage: 'url("https://picsum.photos/seed/700/400")',
          backgroundPosition: "center",
          fontWeight: "bolder",
          fontSize: "xx-large",
          color: "white",
          opacity: ".8",
        }}
      >
        Buy online now the best products
      </Wrapper>

      <div style={{ margin: "auto" }}>
        <Card product={product} />
      </div>

      <Wrapper className="shadow-soft">
        <div>
          <h3>Top departments</h3>

          <Link href="/all-departments">See all</Link>

          <div style={{ display: "flex", gap: 12, margin: "auto 0" }}>
            <Img src="https://picsum.photos/seed/562/300" />
            <Img src="https://picsum.photos/seed/654742/300" />
            <Img src="https://picsum.photos/seed/567657/300" />
          </div>
        </div>

        <div>
          <h3>Trend departments</h3>

          <Link href="/all-departments">See all</Link>

          <div style={{ display: "flex", gap: 12, margin: "auto 0" }}>
            <Img src="https://picsum.photos/seed/456/300" />
            <Img src="https://picsum.photos/seed/167/300" />
            <Img src="https://picsum.photos/seed/231/300" />
          </div>
        </div>
      </Wrapper>

      <Wrapper
        className="shadow-soft"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          fontSize: "smaller",
          textAlign: "center",
        }}
      >
        <div>
          <Img src="https://picsum.photos/seed/33432/300" />
          Sweet price
        </div>

        <div>
          <Img src="https://picsum.photos/seed/974358978/300" />
          Discount 80%
        </div>

        <div>
          <Img src="https://picsum.photos/seed/7638/300" />
          Save 1$ for each item
        </div>

        <div>
          <Img src="https://picsum.photos/seed/213/300" />
          Digit the cupom for discount
        </div>
      </Wrapper>

      <Wrapper
        className="shadow-soft"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          fontSize: "smaller",
          textAlign: "center",
        }}
      >
        <div>
          <Img src="https://picsum.photos/seed/65478/300" />
          Gift for a friend
        </div>

        <div>
          <Img src="https://picsum.photos/seed/8689/300" />
          Holidays gift
        </div>

        <div>
          <Img src="https://picsum.photos/seed/9885/300" />
          Special discount on card
        </div>

        <div>
          <Img src="https://picsum.photos/seed/566/300" />
          Digit the cupom for discount
        </div>
      </Wrapper>
    </Container>
  );
}
