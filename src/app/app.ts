import { LoginForm } from './component/loginForm/loginForm';
import { StartScreenComponent } from './component/startScreen/startScreen';
import { CommonPage } from './pages/commonPage';
import { Header } from './component/header/header';
import { checkCache } from './helpers/checkLogin';

export class App {
  constructor() {}

  public start(): void {
    const commonPage = new CommonPage(null);
    let component;
    if (checkCache()) {
      component = new LoginForm(commonPage);
    } else {
      component = new StartScreenComponent(commonPage);
    }
    commonPage.setPage(new Header(commonPage), component);
  }
}

export default App;
