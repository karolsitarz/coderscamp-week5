export default (route = '/', params = {}) => {
  const url = new URL(`https://api.themoviedb.org/3${route}`);
  url.search = new URLSearchParams({
    api_key: '2dd3b00d866c8671ff45876cf7a0f52c',
    include_adult: false,
    include_video: false,
    ...params
  });

  return window.fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .catch(rej => rej);
};
