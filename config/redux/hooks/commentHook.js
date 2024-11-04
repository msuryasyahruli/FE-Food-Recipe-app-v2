import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListComment } from "../actions/commentAction";

export const useListComment = (id, refetchKey) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((s) => s.comment);

  useEffect(() => {
    dispatch(fetchListComment(id));
  }, [id, refetchKey]);

  return {
    isLoading,
    data: data || [],
  };
};
