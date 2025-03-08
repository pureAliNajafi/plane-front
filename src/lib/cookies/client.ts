export const getClientAuthCookies = () => {
  if (typeof document === "undefined") return { token: null, username: null, email: null }; // ✅ Prevents error on server

  const getCookie = (name: string) =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1] || null;

  return {
    token: getCookie("token"),
    username: getCookie("username"),
    email: getCookie("email"),
  };
};
