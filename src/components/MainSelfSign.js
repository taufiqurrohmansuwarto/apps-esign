// this motherfucker with redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSign,
  changePage,
  changePagination,
  fetchSignSymbol,
  removeSign,
  setDocumentProperty,
  showSign,
  updateFrame,
} from "../../features/sign/self-sign.slice";
import SelfSign from "./SelfSign";

// viewer
const MailSelfSign = ({ id }) => {
  const data = useSelector((state) => state.selfSign);
  const dispatch = useDispatch();

  const changePageDocument = (payload) => {
    dispatch(changePage(payload));
  };
  const loadPageSuccess = (payload) => {
    dispatch(setDocumentProperty(payload));
  };
  const changePaginations = (payload) => {
    dispatch(changePagination(payload));
    dispatch(showSign());
  };

  const addSignDocument = () => {
    dispatch(
      addSign({
        frame: {
          height: 175,
          width: 350,
          translate: [0, 0, 0],
        },
      })
    );
  };

  const updateFrameDocument = (payload) => {
    dispatch(updateFrame(payload));
  };

  const removeSignDocument = (id) => {
    dispatch(removeSign(id));
  };

  useEffect(() => {
    dispatch(fetchSignSymbol(id));
  }, []);

  return (
    <>
      <SelfSign
        changePageDocument={changePageDocument}
        loadPageSuccess={loadPageSuccess}
        changePagination={changePaginations}
        addSign={addSignDocument}
        updateFrame={updateFrameDocument}
        removeSign={removeSignDocument}
        {...data}
      />
    </>
  );
};

export default MailSelfSign;
