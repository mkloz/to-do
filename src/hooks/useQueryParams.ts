import { useSearchParams } from 'react-router-dom';

function useQueryParam(key: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get(key);

  const setParam = (value: string) => {
    setSearchParams({ ...searchParams, [key]: value });
  };

  return [param, setParam] as const;
}
export default useQueryParam;
