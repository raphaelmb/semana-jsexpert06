import { Service } from "./service.js";
import { logger } from "./util.js";

export class Controller {
  constructor() {
    this.service = new Service();
  }

  async handleCommand({ command }) {
    logger.info(`Command received: ${command}`);
    const result = { result: "ok" };
    const cmd = command.toLowerCase();

    if (cmd.includes("start")) {
      this.service.startStreamming();
      return result;
    }

    if (cmd.includes("stop")) {
      this.service.stopStreamming();
      return result;
    }
  }

  async getFileStream(fileName) {
    return this.service.getFileStream(fileName);
  }

  createClientStream() {
    const { id, clientStream } = this.service.createClientStream();

    const onClose = () => {
      logger.info(`Closing connection of ${id}`);
      this.service.removeClientStream(id);
    };

    return {
      stream: clientStream,
      onClose,
    };
  }
}
