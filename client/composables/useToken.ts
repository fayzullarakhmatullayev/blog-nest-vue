export const useToken = () => {
  const TOKEN_KEY = 'access_token';
  const token = useCookie(TOKEN_KEY);

  const getToken = () => token.value;

  return {
    getToken
  };
};
