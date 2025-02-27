import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((s) => s.user);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return {
    isLoading,
    data: data || {},
    isError,
  };
};
