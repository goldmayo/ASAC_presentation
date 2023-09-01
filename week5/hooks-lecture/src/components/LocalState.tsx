"use client";

import { useEffect, useState } from "react";

interface ResultProfile {
  title: string;
  body: string;
}

export default function LocalState() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ResultProfile>(); // string or undefined
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/post/1")
      .then(async (result: Response) => {
        const resultBody: ResultProfile = await result.json();
        setLoading(false);
        setData(resultBody);
        setError(false);
      })
      .catch(() => {
        // call network connection lost
        setLoading(false);
        setData(undefined);
        setError(true);
      });
  }, []);
  return (
    <>
      {loading ? (
        <p>...loading</p>
      ) : (
        <div>
          <div>{data?.title ?? "default title"}</div>
          <div>{data?.body ?? "default body"}</div>
        </div>
      )}
      <p>{error ?? "Error Occured"}</p>
    </>
  );
}

/**
 * ts null guard
 * ?. : optional chaining
 * ! : 명시적으로 null값이 아님을 표기
 * ?? : default value 설정시
 * && : 앞 조건 true일 때 뒤를 반환
 */
