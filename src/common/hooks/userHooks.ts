import localStore from "@utils/localStore";

const userHooks = {
  loadUserProfile: () => {
    const token = localStore.get("token");
    console.log("ACCESS_TOKEN", token);
  },
};

export default userHooks;
