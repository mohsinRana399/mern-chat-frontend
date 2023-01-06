import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useApi = (apiError, apiResponse, successMessage, resetFunction) => {
  const dispatch = useDispatch();
  const [isSuccessful, setIsSuccessful] = useState(null);
  useEffect(() => {
    // console.log({ apiError });
    if (apiError) {
      toast.error(apiError?.message, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetFunction());
      setIsSuccessful(null);
    }
    // eslint-disable-next-line
  }, [apiError]);
  useEffect(() => {
    // console.log({ apiResponse });
    if (apiResponse) {
      toast.success(successMessage, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetFunction());
      setIsSuccessful(apiResponse);
    }
    // eslint-disable-next-line
  }, [apiResponse]);
  return isSuccessful;
};

export default useApi;
