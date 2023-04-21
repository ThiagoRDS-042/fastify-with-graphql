import { app } from "@app";
import { env } from "@env";

app.listen(
  {
    port: env.PORT,
    host: "0.0.0.0",
  },
  (error) => {
    if (error) {
      app.log.error(error);
      process.exit(1);
    }
  }
);
