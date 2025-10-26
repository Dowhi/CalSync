import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonModal,
  IonToast,
  IonActionSheet,
  IonButtons,
  IonBackButton,
  IonLoading
} from '@ionic/react';
import { menuOutline, addOutline, cloudDownloadOutline, chevronDown } from 'ionicons/icons';
import { useTurnos } from '@/hooks/useTurnos';
import { TurnoConfigPage } from './TurnoConfigPage';
import { Turno, TurnoFormData } from '@/types';
import { TURNOS_DEFAULT } from '@/utils/turnosDefault';
import './TurnosPage.css';

export const TurnosPage: React.FC = () => {
  const { turnos, isLoading, error, createTurno, updateTurno, deleteTurno } = useTurnos();
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState<Turno | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [actionSheetTurno, setActionSheetTurno] = useState<Turno | null>(null);
  const [showHeaderExpanded, setShowHeaderExpanded] = useState(false);

  const handleCreateTurno = () => {
    setSelectedTurno(null);
    setIsConfigModalOpen(true);
  };

  const handleEditTurno = (turno: Turno) => {
    setSelectedTurno(turno);
    setIsConfigModalOpen(true);
    setActionSheetTurno(null);
  };

  const handleDeleteTurno = async (turno: Turno) => {
    try {
      await deleteTurno(turno.id);
      setToastMessage('Turno eliminado correctamente');
      setShowToast(true);
      setActionSheetTurno(null);
    } catch (err) {
      setToastMessage('Error al eliminar el turno');
      setShowToast(true);
    }
  };

  const handleSaveTurno = async (formData: TurnoFormData) => {
    try {
      if (selectedTurno) {
        await updateTurno(selectedTurno.id, formData);
        setToastMessage('Turno actualizado correctamente');
      } else {
        await createTurno(formData);
        setToastMessage('Turno creado correctamente');
      }
      setShowToast(true);
      setIsConfigModalOpen(false);
      setSelectedTurno(null);
    } catch (err: any) {
      setToastMessage(err.message || 'Error al guardar el turno');
      setShowToast(true);
      throw err;
    }
  };

  const handleCancelConfig = () => {
    setIsConfigModalOpen(false);
    setSelectedTurno(null);
  };

  const handleImportDefaults = async () => {
    try {
      setToastMessage('Importando turnos predefinidos...');
      setShowToast(true);
      
      for (const turno of TURNOS_DEFAULT) {
        await createTurno(turno);
      }
      
      setToastMessage(`${TURNOS_DEFAULT.length} turnos importados correctamente`);
      setShowToast(true);
    } catch (err) {
      setToastMessage('Error al importar turnos');
      setShowToast(true);
    }
  };

  const formatHorario = (turno: Turno) => {
    if (turno.horarioInicio && turno.horarioFin) {
      return `(${turno.horarioInicio}-${turno.horarioFin})`;
    }
    return '';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/calendar" text="" />
          </IonButtons>
          <IonTitle>TURNOS DISPONIBLES</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowHeaderExpanded(!showHeaderExpanded)}>
              <IonIcon icon={chevronDown} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="turnos-page-content">
        <IonLoading isOpen={isLoading} message="Cargando turnos..." />

        {/* Header expandible con botones */}
        <div className={`turnos-header ${showHeaderExpanded ? 'expanded' : ''}`}>
          <div className="turnos-actions">
            <IonButton
              expand="block"
              className="action-btn create-btn"
              onClick={handleCreateTurno}
            >
              <IonIcon icon={addOutline} slot="start" />
              CREAR TURNO NUEVO
            </IonButton>
            <IonButton
              expand="block"
              fill="outline"
              className="action-btn import-btn"
              onClick={handleImportDefaults}
            >
              <IonIcon icon={cloudDownloadOutline} slot="start" />
              IMPORTAR TURNOS...
            </IonButton>
          </div>
        </div>

        {/* Lista de turnos */}
        <IonList className="turnos-list">
          {turnos.map((turno) => (
            <IonItem
              key={turno.id}
              className="turno-item"
              button
              onClick={() => handleEditTurno(turno)}
            >
              <div
                className="turno-badge"
                style={{
                  backgroundColor: turno.colorFondo,
                  color: turno.colorTexto,
                  fontSize: `${turno.tamañoTexto}px`
                }}
              >
                {turno.abreviatura}
              </div>
              <IonLabel className="turno-info">
                <h2 className="turno-nombre">{turno.nombre}</h2>
                {formatHorario(turno) && (
                  <p className="turno-horario">{formatHorario(turno)}</p>
                )}
              </IonLabel>
              <IonButton
                fill="clear"
                slot="end"
                onClick={(e) => {
                  e.stopPropagation();
                  setActionSheetTurno(turno);
                }}
              >
                <IonIcon icon={menuOutline} />
              </IonButton>
            </IonItem>
          ))}

          {turnos.length === 0 && !isLoading && (
            <div className="empty-state">
              <p>No hay turnos disponibles</p>
              <div className="empty-state-buttons">
                <IonButton onClick={handleCreateTurno}>
                  Crear primer turno
                </IonButton>
                <IonButton onClick={handleImportDefaults} fill="outline">
                  Importar turnos predefinidos
                </IonButton>
              </div>
            </div>
          )}
        </IonList>

        {/* Modal de configuración */}
        <IonModal
          isOpen={isConfigModalOpen}
          onDidDismiss={handleCancelConfig}
          className="turno-config-modal"
        >
          <TurnoConfigPage
            turno={selectedTurno}
            onSave={handleSaveTurno}
            onCancel={handleCancelConfig}
          />
        </IonModal>

        {/* Action Sheet para opciones del turno */}
        <IonActionSheet
          isOpen={!!actionSheetTurno}
          onDidDismiss={() => setActionSheetTurno(null)}
          buttons={[
            {
              text: 'Editar',
              handler: () => {
                if (actionSheetTurno) handleEditTurno(actionSheetTurno);
              }
            },
            {
              text: 'Eliminar',
              role: 'destructive',
              handler: () => {
                if (actionSheetTurno) handleDeleteTurno(actionSheetTurno);
              }
            },
            {
              text: 'Cancelar',
              role: 'cancel'
            }
          ]}
        />

        {/* Toast para mensajes */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
          color={error ? 'danger' : 'success'}
        />
      </IonContent>
    </IonPage>
  );
};

