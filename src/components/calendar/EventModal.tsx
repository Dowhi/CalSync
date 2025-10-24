import { useState, useEffect } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonText
} from '@ionic/react';
import { close, save, trash } from 'ionicons/icons';
import { CalendarEvent, EventFormData, EventCategory } from '@/types';
import { EVENT_CATEGORIES } from '@/utils/constants';
import { toISODateString, formatDateTime } from '@/utils/dateUtils';
import './EventModal.css';

interface EventModalProps {
  isOpen: boolean;
  event: CalendarEvent | null;
  initialStart?: Date;
  initialEnd?: Date;
  canEdit: boolean;
  onClose: () => void;
  onSave: (data: EventFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  event,
  initialStart,
  initialEnd,
  canEdit,
  onClose,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    start: '',
    end: '',
    description: '',
    category: 'personal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (event) {
      // Editar evento existente
      setFormData({
        title: event.title,
        start: toISODateString(new Date(event.start)),
        end: toISODateString(new Date(event.end)),
        description: event.description || '',
        category: event.category
      });
    } else if (initialStart && initialEnd) {
      // Crear nuevo evento
      setFormData({
        title: '',
        start: toISODateString(initialStart),
        end: toISODateString(initialEnd),
        description: '',
        category: 'personal'
      });
    }
  }, [event, initialStart, initialEnd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error al guardar evento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este evento?');
    if (confirmed) {
      setIsSubmitting(true);
      try {
        await onDelete();
        onClose();
      } catch (error) {
        console.error('Error al eliminar evento:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isNewEvent = !event;
  const modalTitle = isNewEvent ? 'Nuevo Evento' : canEdit ? 'Editar Evento' : 'Detalles del Evento';

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="event-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{modalTitle}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!isNewEvent && !canEdit && (
          <div className="event-info-banner">
            <IonText color="medium">
              <p>
                Evento creado por: <strong>{event.userName}</strong>
                <br />
                {formatDateTime(event.createdAt)}
              </p>
            </IonText>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Título *</IonLabel>
            <IonInput
              value={formData.title}
              onIonChange={(e) => setFormData({ ...formData, title: e.detail.value! })}
              required
              disabled={!canEdit && !isNewEvent}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Categoría</IonLabel>
            <IonSelect
              value={formData.category}
              onIonChange={(e) =>
                setFormData({ ...formData, category: e.detail.value as EventCategory })
              }
              disabled={!canEdit && !isNewEvent}
            >
              {Object.entries(EVENT_CATEGORIES).map(([key, config]) => (
                <IonSelectOption key={key} value={key}>
                  {config.icon} {config.label}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Inicio *</IonLabel>
            <IonInput
              type="datetime-local"
              value={formData.start}
              onIonChange={(e) => setFormData({ ...formData, start: e.detail.value! })}
              required
              disabled={!canEdit && !isNewEvent}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Fin *</IonLabel>
            <IonInput
              type="datetime-local"
              value={formData.end}
              onIonChange={(e) => setFormData({ ...formData, end: e.detail.value! })}
              required
              disabled={!canEdit && !isNewEvent}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Descripción</IonLabel>
            <IonTextarea
              value={formData.description}
              onIonChange={(e) => setFormData({ ...formData, description: e.detail.value! })}
              rows={4}
              disabled={!canEdit && !isNewEvent}
            />
          </IonItem>

          {(canEdit || isNewEvent) && (
            <div className="modal-buttons">
              <IonButton
                expand="block"
                type="submit"
                disabled={isSubmitting}
                className="ion-margin-top"
              >
                <IonIcon slot="start" icon={save} />
                {isNewEvent ? 'Crear Evento' : 'Guardar Cambios'}
              </IonButton>

              {!isNewEvent && onDelete && (
                <IonButton
                  expand="block"
                  color="danger"
                  fill="outline"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  <IonIcon slot="start" icon={trash} />
                  Eliminar Evento
                </IonButton>
              )}
            </div>
          )}
        </form>
      </IonContent>
    </IonModal>
  );
};

