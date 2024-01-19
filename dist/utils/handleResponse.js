"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (props) => {
    const response = {
        success: props.statusCode < 400,
        message: props.message,
    };
    if (props.statusCode >= 400) {
        response.error = props.result;
    }
    else {
        response.data = props.result;
    }
    props.res.status(props.statusCode).send(response);
};
exports.sendResponse = sendResponse;
