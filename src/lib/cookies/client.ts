export const getClientAuthCookies = () => {
  if (typeof document === "undefined") {
    return { token: null, username: null, email: null }; // ✅ Prevents error on server
  }

  const getCookie = (name: string) => {
    const value =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1] || null;
    return value ? decodeURIComponent(value) : null; // ✅ Decodes the value if it exists
  };

  return {
    token: getCookie("token"),
    username: getCookie("username"),
    email: getCookie("email"), // ✅ Now correctly displays "test@mail.com"
  };
};
