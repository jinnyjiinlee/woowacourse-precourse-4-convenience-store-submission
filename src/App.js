import { MainController } from './Controller/controller.js';

class App {
  async run() {
    const controller = new MainController();
    await controller.ProgramStart();
  }
}

export default App;
