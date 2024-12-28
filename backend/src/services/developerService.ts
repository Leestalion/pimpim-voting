const DEVELOPER_PASSWORD = "Test_Password";

export const verifyPassword = async (password: string) => {
  return password === DEVELOPER_PASSWORD;
};
