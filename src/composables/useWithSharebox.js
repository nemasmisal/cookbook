export function useHrefs(id) {
  const hrefs = {
    fb:
      'https://www.facebook.com/sharer.php?u=http://localhost:8080/details/' +
      id,
    twit:
      'https://twitter.com/intent/tweet?url=http://localhost:8080/details/' +
      id +
      '&text=',
    pint:
      'https://pinterest.com/pin/create/button/?url=http://localhost:8080/details/' +
      id +
      '&media=&description=',
  };
  return { hrefs };
}
