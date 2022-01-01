import { PORT } from "./utils/config";

import { httpServer } from "./src/server"

httpServer.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`)
});
