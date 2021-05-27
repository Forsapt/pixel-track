import instance from "./instance";

async function getUser() {
  let trackers = await instance.get("user")
  return trackers.data

}

const user = {
  getUser
}

export default user
