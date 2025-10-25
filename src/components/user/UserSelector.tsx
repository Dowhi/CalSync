import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAvatar
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { PREDEFINED_USERS } from '@/utils/constants';
import { User } from '@/types';
import './UserSelector.css';

interface UserSelectorProps {
  onSelectUser: (user: User) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({ onSelectUser }) => {
  const handleUserSelect = (user: User) => {
    console.log('👤 Click en usuario:', user.displayName);
    onSelectUser(user);
    console.log('📤 onSelectUser ejecutado');
  };

  console.log('🎨 UserSelector renderizado');
  console.log('📋 Usuarios disponibles:', PREDEFINED_USERS.length);

  return (
    <IonPage>
      <IonContent className="user-selector-content" fullscreen>
        <div className="user-selector-container">
          <div className="user-selector-header">
            <IonIcon icon={personCircleOutline} className="user-selector-logo" />
            <h1>CalSync</h1>
            <p>Selecciona tu usuario para continuar</p>
          </div>

          <IonCard className="user-selector-card">
            <IonCardHeader>
              <IonCardTitle>Elige tu Usuario</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {PREDEFINED_USERS.map((user) => (
                  <IonItem
                    key={user.uid}
                    button
                    onClick={() => handleUserSelect(user)}
                    className="user-item"
                  >
                    <IonAvatar slot="start" className="user-avatar">
                      <IonIcon icon={personCircleOutline} />
                    </IonAvatar>
                    <IonLabel>
                      <h2>{user.displayName}</h2>
                      <p>{user.email}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

