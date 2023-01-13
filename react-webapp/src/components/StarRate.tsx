import { Fragment } from "react";
import { RiStarHalfFill, RiStarLine, RiStarFill } from "react-icons/ri";

export default function (props: { rate: string }) {
  const rate = Number(
    props.rate[0] +
      "." +
      (Number(Number(props.rate).toFixed(2)[2]) >= 5 ? "5" : "0")
  );

  switch (rate) {
    case 1:
      return (
        <Fragment>
          <RiStarFill />
          <RiStarLine />
          <RiStarLine />
          <RiStarLine />
          <RiStarLine />
        </Fragment>
      );

    case 1.5:
      return (
        <Fragment>
          <RiStarFill />
          <RiStarLine />
          <RiStarHalfFill />
          <RiStarLine />
          <RiStarLine />
        </Fragment>
      );

    case 2:
      return (
        <Fragment>
          <RiStarFill />
          <RiStarFill />
          <RiStarLine />
          <RiStarLine />
          <RiStarLine />
        </Fragment>
      );

    case 2.5:
      return (
        <Fragment>
          <RiStarFill />
          <RiStarFill />
          <RiStarHalfFill />
          <RiStarLine />
          <RiStarLine />
        </Fragment>
      );

    case 3:
      return (
        <Fragment>
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarLine />
          <RiStarLine />
        </Fragment>
      );

    case 3.5:
      return (
        <Fragment>
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarHalfFill />
          <RiStarLine />
        </Fragment>
      );

    case 4:
      return (
        <Fragment>
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarLine />
        </Fragment>
      );

    case 4.5:
      return (
        <Fragment>
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarHalfFill />
        </Fragment>
      );

    case 5:
      return (
        <Fragment>
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
        </Fragment>
      );

    default:
      return (
        <Fragment>
          <RiStarLine />
          <RiStarLine />
          <RiStarLine />
          <RiStarLine />
          <RiStarLine />
        </Fragment>
      );
  }
}
