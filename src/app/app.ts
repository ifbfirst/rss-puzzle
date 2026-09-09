import { StartScreenComponent } from './component/startScreen/startScreen';
import { CommonPage } from './pages/commonPage';
import { Header } from './component/header/header';

export class App {
  public start(): void {
    const commonPage = new CommonPage(null);
    commonPage.setPage(
      new Header(commonPage),
      new StartScreenComponent(commonPage),
    );
  }
}

export default App;
