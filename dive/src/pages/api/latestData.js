let latestName = "André Jacoby";
let latestStar = "1 Star";
let onboardingState = 0;

export default function handler(req, res) {
  // if post, set the latest name to the name in the body
  if (req.method === "POST") {

    console.log(req.body);

    if (req.body.name) {
      latestName = req.body.name;
      (latestStar =
        (Math.floor(Math.random() * 2) + 1 === 1 ? "1" : "3") + " Star"),
        console.log(latestName, latestStar);
    } else {
      onboardingState++;
    }
  } else {

    // if query for onboarding, send the onboarding state back to the client
    if (req.query.onboarding) {
      res.status(200).json({ onboarding: onboardingState });

      console.log("onboarding state: " + onboardingState);

      return;
    }

    // if get, send the latest name back to the client
    res.status(200).json({ name: latestName, star: latestStar });
  }
}
