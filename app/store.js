import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter-slice";

// fucking sign with reducer
import selfSignReducer from "../features/sign/self-sign.slice";
import requestFromOthersReducer from "../features/sign/request-from-others.slice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    selfSign: selfSignReducer,
    requestFromOthers: requestFromOthersReducer,
  },
});
