let online = 0;

export default function handler(req, res) {
  // on request enhance the online count and send it back to the client
  online++;
  console.log(online);
  res.status(200).json({ online });
}
