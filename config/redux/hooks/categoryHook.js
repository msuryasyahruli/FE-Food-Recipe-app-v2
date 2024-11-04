import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../actions/categoryAction";

export const useCategories = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((s) => s.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return {
    isLoading,
    data: data || [],
  };
};
