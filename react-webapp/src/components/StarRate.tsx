import { Fragment } from "react";
import { RiStarLine, RiStarFill } from "react-icons/ri";

export default function (props: { rate: number }) {
  switch (props.rate.toPrecision()[0]) {
    case "1":
      return (
        <Fragment>
          <RiStarFill />
          <RiStarLine />
          <RiStarLine />
          <RiStarLine />
          <RiStarLine />
        </Fragment>
      );

    case "2":
      return (
        <Fragment>
          <RiStarFill />
          <RiStarFill />
          <RiStarLine />
          <RiStarLine />
          <RiStarLine />
        </Fragment>
      );

    case "3":
      return (
        <Fragment>
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarLine />
          <RiStarLine />
        </Fragment>
      );

    case "4":
      return (
        <Fragment>
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarFill />
          <RiStarLine />
        </Fragment>
      );
    case "5":
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
