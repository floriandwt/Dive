let latestName = "André Jacoby";
let latestStar = "1 Star";
let onboardingState = 0;

export default function handler(req, res) {
  // if post, set the latest name to the name in the body
  if (req.method === "POST") {
    if (req.body.name && req.body.name !== "" && req.body.name === undefined) {
      latestName = req.body.name;
      (latestStar =
        (Math.floor(Math.random() * 2) + 1 === 1 ? "1" : "3") + " Star"),
        console.log(latestName, latestStar);
    } else {
        onboardingState++;
    }
  } else {
    // if get, send the latest name back to the client
    res.status(200).json({ name: latestName, star: latestStar });
  }
}
