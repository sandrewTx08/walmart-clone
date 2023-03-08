import styled from "styled-components";
import Cart from "@/components/Product/Cart";

const A = styled.div``;

const B = styled.div``;

const CC = styled.div``;

const D = styled.div``;

export default function C({ product }) {
  return (
    <A>
      <B>{product.ProductPhotos}</B>

      <CC></CC>

      <D>
        <div></div>
        <div></div>
        <div></div>
        <Cart>
          <b>Add to Cart</b>
        </Cart>
      </D>
    </A>
  );
}
