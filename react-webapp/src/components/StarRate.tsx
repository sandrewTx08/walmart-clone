import { Fragment } from "react";
import { RiStarLine, RiStarFill } from "react-icons/ri";

export default function (props: { rate: number }) {
  return props.rate.toPrecision()[0] == "1" ? (
    <Fragment>
      <RiStarFill />
      <RiStarLine />
      <RiStarLine />
      <RiStarLine />
      <RiStarLine />
    </Fragment>
  ) : props.rate.toPrecision()[0] == "2" ? (
    <Fragment>
      <RiStarFill />
      <RiStarFill />
      <RiStarLine />
      <RiStarLine />
      <RiStarLine />
    </Fragment>
  ) : props.rate.toPrecision()[0] == "3" ? (
    <Fragment>
      <RiStarFill />
      <RiStarFill />
      <RiStarFill />
      <RiStarLine />
      <RiStarLine />
    </Fragment>
  ) : props.rate.toPrecision()[0] == "4" ? (
    <Fragment>
      <RiStarFill />
      <RiStarFill />
      <RiStarFill />
      <RiStarFill />
      <RiStarLine />
    </Fragment>
  ) : props.rate.toPrecision()[0] == "5" ? (
    <Fragment>
      <RiStarFill />
      <RiStarFill />
      <RiStarFill />
      <RiStarFill />
      <RiStarFill />
    </Fragment>
  ) : (
    <Fragment>
      <RiStarLine />
      <RiStarLine />
      <RiStarLine />
      <RiStarLine />
      <RiStarLine />
    </Fragment>
  );
}
