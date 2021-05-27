import instance from "./instance";

async function getTrackers() {
  let trackers = await instance.get("tracker")
  return trackers.data

}

async function getTracker(id) {
  let trackers = await instance.get("tracker/" + id)
  return trackers.data

}

async function deleteTracker(id) {
  let trackers = await instance.delete("tracker/" + id)
  return trackers.data
}

async function addTracker(params) {
  let tracker = await instance.post(
    "tracker/",
    params
  )
  return tracker.data
}

async function editTracker(params) {
  let tracker = await instance.put(
    "tracker/" + params.id,
    {
      name: params.name,
      url: params.url
    }
  )
  return tracker.data
}

const tracker = {
  getTrackers,
  deleteTracker,
  addTracker,
  editTracker,
  getTracker
}

export default tracker
