import { IonButton, IonButtons } from '@ionic/react';
import './BottomNavBar.css';

interface BottomNavBarProps {
  onPintar?: () => void;
  onEditar?: () => void;
  onTurnos?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  onPintar,
  onEditar,
  onTurnos
}) => {
  return (
    <div className="bottom-nav-bar">
      <IonButtons>
        <IonButton className="nav-button" onClick={onPintar}>
          Pintar
        </IonButton>
        <IonButton className="nav-button" onClick={onEditar}>
          Editar
        </IonButton>
        <IonButton className="nav-button" onClick={onTurnos}>
          Turnos
        </IonButton>
      </IonButtons>
    </div>
  );
};
