import { LoginForm } from './component/loginForm/loginForm';
import { StartScreenComponent } from './component/startScreen/startScreen';
import { CommonPage } from './pages/commonPage';
import { Header } from './component/header/header';
import { gameStore } from './state/store';

export class App {
  public start(): void {
    const commonPage = new CommonPage(null);
    const screen = gameStore.isLoggedIn()
      ? new StartScreenComponent(commonPage)
      : new LoginForm(commonPage);
    commonPage.setPage(new Header(commonPage), screen);
  }
}

export default App;
