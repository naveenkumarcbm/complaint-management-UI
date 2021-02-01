function getUserDetail() {
  try {
      const token = sessionStorage.getItem("TOKEN");
      console.log(token);
      const payload = token && token.split(".")[1];
      const user = JSON.parse(atob(payload));
      return user;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export { getUserDetail };
