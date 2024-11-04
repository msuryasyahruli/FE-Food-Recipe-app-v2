import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailRecipe, fetchListRecipe, fetchListUserRecipe } from "../actions/recipeAction";

export const useListRecipe = (params, refetchKey) => {
  const dispatch = useDispatch();
  const { data, pagination, isLoading } = useSelector(
    (s) => s.recipe.listRecipes
  );

  useEffect(() => {
    dispatch(fetchListRecipe(params));
  }, [JSON.stringify(params), refetchKey]);

  return {
    isLoading,
    data: data || [],
    pagination,
  };
};

export const useListUserRecipe = (id, refetchKey) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(
    (s) => s.recipe.userRecipes
  );

  useEffect(() => {
    dispatch(fetchListUserRecipe(id));
  }, [id, refetchKey]);

  return {
    isLoading,
    data: data || [],
  };
};

export const useDetailRecipe = (id) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(
    (s) => s.recipe.detailRecipe
  );

  useEffect(() => {
    dispatch(fetchDetailRecipe(id));
  }, [id]);

  return {
    isLoading,
    data: data || [],
  };
};
