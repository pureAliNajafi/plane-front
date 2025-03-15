export const getPublicAuthData = () => {
  const getCookie = (name: string) => {
    const value =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1] || null;
    return value ? decodeURIComponent(value) : null; // ✅ Decodes the value if it exists
  };

  return {
    expire: parseInt(getCookie("expire") || ""), // ✅ Convert to number //returns null or NaN
    username: getCookie("username"),
    email: getCookie("email"),
  };
};
