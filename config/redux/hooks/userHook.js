import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/userAction";

export const useUser = (token) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(
    (s) => s.user
  );

  useEffect(() => {
    dispatch(getUser(token));
  }, [token]);

  return {
    isLoading,
    data: data || {},
  };
};
