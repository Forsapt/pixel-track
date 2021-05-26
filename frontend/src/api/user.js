import instance from "./instance";

async function getUser() {
  let trackers = await instance.get("user")
  return trackers.data

}

export default {
  getUser
}
