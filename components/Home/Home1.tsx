import styled from "styled-components";

const A = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
`;

const CC = styled.img`
  display: block;
  height: auto;
  width: 100%;
  margin-bottom: 1em;
`;

const B = styled.div`
  padding: 2em;
  margin: 1em;
`;

export default function C() {
  return (
    <A>
      <B className="shadow-soft">
        <CC src="https://picsum.photos/seed/465/300" />
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
        delectus, dolores excepturi repudiandae soluta tempora in deleniti porro
        quis aperiam, praesentium nihil ad dignissimos consequuntur
        reprehenderit expedita atque incidunt!
      </B>

      <B className="shadow-soft">
        <CC src="https://picsum.photos/seed/556/300" />
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
        delectus, dolores excepturi repudiandae soluta tempora in deleniti porro
        quis aperiam, praesentium nihil ad dignissimos consequuntur
        reprehenderit expedita atque incidunt!
      </B>

      <A>
        <B className="shadow-soft">
          <CC src="https://picsum.photos/seed/654/300" />
          <h2>Lorem ipsum dolor sit amet.</h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
        </B>

        <B className="shadow-soft">
          <CC src="https://picsum.photos/seed/5642/300" />
          <h2>Lorem ipsum dolor sit amet.</h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
        </B>
      </A>

      <B className="shadow-soft">
        <CC src="https://picsum.photos/seed/769/300" />
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni
      </B>
    </A>
  );
}
