import { configureStore } from "@reduxjs/toolkit";

// fucking sign with reducer
import requestFromOthersReducer from "../features/sign/request-from-others.slice";
import selfSignReducer from "../features/sign/self-sign.slice";

export default configureStore({
  reducer: {
    selfSign: selfSignReducer,
    requestFromOthers: requestFromOthersReducer,
  },
});
