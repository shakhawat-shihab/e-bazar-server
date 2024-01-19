import { Response } from "express";
import IResponse from "../interfaces/http/responseInterface";

type responseProps = {
  res: Response;
  statusCode: number;
  message: string;
  result?: any;
};

const sendResponse = (props: responseProps) => {
  const response: IResponse = {
    success: props.statusCode < 400,
    message: props.message,
  };

  if (props.statusCode >= 400) {
    response.error = props.result;
  } else {
    response.data = props.result;
  }

  props.res.status(props.statusCode).send(response);
};

export { sendResponse };
