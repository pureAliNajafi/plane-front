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
    username: getCookie("username"),
    email: getCookie("email"), // ✅ Now correctly displays "test@mail.com"
  };
};
