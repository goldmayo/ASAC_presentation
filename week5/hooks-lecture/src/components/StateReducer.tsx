"use client";

import { useEffect, useReducer } from "react";

interface ResultProfile {
  title: string;
  body: string;
}

type Action = { type: "SUCCESS"; payload: ResultProfile } | { type: "ERROR" };

interface ResponseForReducer {
  loading: boolean;
  data: ResultProfile | null;
  error: boolean;
}
const initialState: ResponseForReducer = {
  loading: true,
  data: null,
  error: false,
};

const reducer = (state: ResponseForReducer, action: Action): ResponseForReducer => {
  switch (action.type) {
    case "SUCCESS":
      return {
        loading: false,
        data: action.payload,
        error: false,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: true,
      };
    default:
      return state;
  }
};

export default function LocalState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/post/1")
      .then(async (res: Response) => {
        const data: ResultProfile = await res.json();
        dispatch({ type: "SUCCESS", payload: data });
      })
      .catch(() => {
        // call network connection lost
        dispatch({ type: "ERROR" });
      });
  }, []);

  return (
    <>
      {state.loading ? (
        <p>...loading</p>
      ) : (
        <div>
          <div>{state.data?.title ?? "default title"}</div>
          <div>{state.data?.body ?? "default body"}</div>
        </div>
      )}
      <p>{state.error ?? "Error Occured"}</p>
    </>
  );
}
