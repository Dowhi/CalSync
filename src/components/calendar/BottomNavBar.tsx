import { IonButton, IonButtons } from '@ionic/react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const handleTurnosClick = () => {
    if (onTurnos) {
      onTurnos();
    }
    history.push('/turnos');
  };

  return (
    <div className="bottom-nav-bar">
      <IonButtons>
        <IonButton className="nav-button" onClick={onPintar}>
          Pintar
        </IonButton>
        <IonButton className="nav-button" onClick={onEditar}>
          Editar
        </IonButton>
        <IonButton className="nav-button" onClick={handleTurnosClick}>
          Turnos
        </IonButton>
      </IonButtons>
    </div>
  );
};

