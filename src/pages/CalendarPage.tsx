import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonLoading,
  IonToast
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { CalendarView } from '@/components/calendar/CalendarView';
import { EventModal } from '@/components/calendar/EventModal';
import { BottomNavBar } from '@/components/calendar/BottomNavBar';
import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvents';
import { CalendarEvent, EventFormData } from '@/types';
import './CalendarPage.css';

export const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const { events, isLoading, error, createEvent, updateEvent, deleteEvent, canEditEvent } =
    useEvents(user?.uid || null);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newEventDates, setNewEventDates] = useState<{ start: Date; end: Date } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setNewEventDates(null);
    setIsModalOpen(true);
  };

  const handleDateSelect = (start: Date, end: Date) => {
    setSelectedEvent(null);
    setNewEventDates({ start, end });
    setIsModalOpen(true);
  };

  const handleNewEvent = () => {
    const now = new Date();
    const end = new Date(now.getTime() + 60 * 60 * 1000); // +1 hora
    setSelectedEvent(null);
    setNewEventDates({ start: now, end });
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (formData: EventFormData) => {
    try {
      if (selectedEvent) {
        // Editar evento existente
        await updateEvent(selectedEvent.id, formData);
        setToastMessage('Evento actualizado correctamente');
      } else {
        // Crear nuevo evento
        await createEvent(formData, user?.displayName || 'Usuario');
        setToastMessage('Evento creado correctamente');
      }
      setShowToast(true);
    } catch (err: any) {
      setToastMessage(err.message || 'Error al guardar el evento');
      setShowToast(true);
      throw err;
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      await deleteEvent(selectedEvent.id);
      setToastMessage('Evento eliminado correctamente');
      setShowToast(true);
    } catch (err: any) {
      setToastMessage(err.message || 'Error al eliminar el evento');
      setShowToast(true);
      throw err;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setNewEventDates(null);
  };

  const canEdit = selectedEvent ? canEditEvent(selectedEvent) : true;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>CalSync</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="calendar-page-content">
        <IonLoading isOpen={isLoading} message="Cargando eventos..." />
        <CalendarView
          events={events}
          currentUserId={user?.uid || ''}
          onEventClick={handleEventClick}
          onDateSelect={handleDateSelect}
        />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleNewEvent}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <EventModal
          isOpen={isModalOpen}
          event={selectedEvent}
          initialStart={newEventDates?.start}
          initialEnd={newEventDates?.end}
          canEdit={canEdit}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          onDelete={canEdit && selectedEvent ? handleDeleteEvent : undefined}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
          color={error ? 'danger' : 'success'}
        />

        <BottomNavBar
          onPintar={() => console.log('Pintar clicked')}
          onEditar={() => console.log('Editar clicked')}
          onTurnos={() => console.log('Turnos clicked')}
        />
      </IonContent>
    </IonPage>
  );
};

