import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import styled from "styled-components";

const Carousel = styled.section`
  display: flex;
  height: 10em;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  box-shadow: var(--SOFT-SHADOW);
  background-color: black;

  img {
    max-width: 100%;
    position: relative;
  }
`;

const CarouselButton = styled.button`
  position: relative;
  background-color: #0071dc;
  border: 1px solid #ffffff00;
  border-radius: 3em;
  width: 5em;
  height: 5em;
  display: block;

  svg {
    color: white;
    font-size: xx-large;
  }
`;

export default function () {
  return (
    <Carousel>
      <CarouselButton>
        <MdOutlineNavigateBefore />
      </CarouselButton>
      <img src="/walmartLogoMedium.svg" />
      <CarouselButton>
        <MdOutlineNavigateNext />
      </CarouselButton>
    </Carousel>
  );
}
