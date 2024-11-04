import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmark } from "../actions/bookmarkAction";

export const useBookmarks = (id, refetchKey) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((s) => s.bookmark);

  useEffect(() => {
    dispatch(fetchBookmark(id));
  }, [id, refetchKey]);

  return {
    isLoading,
    data: data || [],
  };
};
