import { env } from "./config/env.js";
import { app } from "./app.js";

app.listen(env.PORT, () => {
  console.info(`CareBridge API is running at http://localhost:${env.PORT}`);
});
