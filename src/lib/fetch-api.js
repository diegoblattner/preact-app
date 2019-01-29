const apiUrl = 'https://jsonplaceholder.typicode.com';
const simpleCache = {};
const cacheSpan = 300000; // five minutes

const setCache = (key, data) => {
  simpleCache[key] = {
    data,
    time: new Date(),
  };
};

const clearCache = (key) => {
  delete simpleCache[key];
};

const getFromCache = (key) => {
  const cachedData = simpleCache[key];
  if (cachedData && new Date() - cachedData.time < cacheSpan) {
    return cachedData.data;
  }

  clearCache(key);
  return false;
};

const fetchApi = async (url, returnOnError) => {
  try {
    const cachedData = getFromCache(url);
    if (cachedData) {
      return cachedData;
    }

    const result = await fetch(`${apiUrl}${url}`);
    const parsedResult = await result.json();
    setCache(url, parsedResult);
    return parsedResult;
  } catch (e) {
    // TODO: log api error
    console.error(`api call ${url}`, e);
    return returnOnError;
  }
};

export { fetchApi };
