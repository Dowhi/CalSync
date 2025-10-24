import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { CalendarPage } from '@/pages/CalendarPage';
import { Menu } from '@/components/layout/Menu';
import { UserSelector } from '@/components/user/UserSelector';
import { useAuth } from '@/hooks/useAuth';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* FullCalendar styles */
import '@fullcalendar/core/index.js';

setupIonicReact();

const App: React.FC = () => {
  const { isAuthenticated, isLoading, selectUser } = useAuth();

  if (isLoading) {
    return null; // O un componente de loading
  }

  if (!isAuthenticated) {
    return (
      <IonApp>
        <UserSelector onSelectUser={selectUser} />
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main-content">
          <Menu />
          <IonRouterOutlet id="main-content">
            <Route exact path="/calendar" component={CalendarPage} />
            <Route exact path="/">
              <Redirect to="/calendar" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
