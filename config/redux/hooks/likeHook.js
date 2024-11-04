import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLike } from "../actions/likeActions";

export const useLikes = (id, refetchKey) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((s) => s.like);

  useEffect(() => {
    dispatch(fetchLike(id));
  }, [id, refetchKey]);

  return {
    isLoading,
    data: data || [],
  };
};
