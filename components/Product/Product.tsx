import styled from "styled-components";
import Cart from "@/components/Product/Cart";

const A = styled.div``;

const B = styled.div``;

const CC = styled.div``;

const D = styled.div``;

const E = styled.img``;

export default function C({ product }) {
  console.log(product);

  return (
    <A>
      <B>
        {product.ProductPhotos.map(({ Photos }) => (
          <E src={Photos.path} key={Photos.id} />
        ))}
      </B>

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
