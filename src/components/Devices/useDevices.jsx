import { useEffect, useState } from 'react';

const useDevices = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    let timeout;

    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8088/getDevice/');
        const json = await res.json();
        // The timeout simulates a delay to demonstrate the isLoading mechanism
        timeout = setTimeout(() => {
          setData(
            [json].filter((device, i) => {
              if (true) {
                return i <= 4;
              } else {
                return i > 4;
              }
            })
          );
          setIsLoading(false);
        }, 1500);
      } catch (e) {
        setIsError(e);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return { data, isError, isLoading };
};
export default useDevices;
