import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAvatar,
  IonText,
  IonButton
} from '@ionic/react';
import { calendarOutline, personCircleOutline, logOutOutline, informationCircleOutline } from 'ionicons/icons';
import { useAuth } from '@/hooks/useAuth';
import './Menu.css';

export const Menu: React.FC = () => {
  const { user, logout } = useAuth();

  const handleChangeUser = () => {
    logout(); // Esto ahora limpia el usuario y vuelve al selector
  };

  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>CalSync</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="menu-user-info">
          <IonAvatar className="user-avatar">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'Usuario'} />
            ) : (
              <IonIcon icon={personCircleOutline} />
            )}
          </IonAvatar>
          <IonText>
            <h2>{user?.displayName || 'Usuario'}</h2>
            <p>{user?.email}</p>
          </IonText>
        </div>

        <IonList>
          <IonItem button routerLink="/calendar" routerDirection="none">
            <IonIcon slot="start" icon={calendarOutline} />
            <IonLabel>Calendario</IonLabel>
          </IonItem>

          <IonItem button lines="none">
            <IonIcon slot="start" icon={informationCircleOutline} />
            <IonLabel>
              <h3>Acerca de CalSync</h3>
              <p className="menu-version">Versión 1.0.0</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <div className="menu-footer">
          <IonButton expand="block" color="primary" fill="outline" onClick={handleChangeUser}>
            <IonIcon slot="start" icon={logOutOutline} />
            Cambiar Usuario
          </IonButton>
        </div>
      </IonContent>
    </IonMenu>
  );
};

