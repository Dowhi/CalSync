import { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { EventClickArg, DateSelectArg } from '@fullcalendar/core';
import { CalendarEvent } from '@/types';
import { EVENT_COLORS, CALENDAR_CONFIG } from '@/utils/constants';
import './CalendarView.css';

interface CalendarViewProps {
  events: CalendarEvent[];
  currentUserId: string;
  onEventClick: (event: CalendarEvent) => void;
  onDateSelect: (start: Date, end: Date) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  currentUserId,
  onEventClick,
  onDateSelect
}) => {
  const calendarRef = useRef<FullCalendar>(null);

  console.log('📅 CalendarView: Eventos recibidos:', events.length);
  console.log('📅 CalendarView: Eventos:', events);
  console.log('📅 CalendarView: currentUserId:', currentUserId);

  // Convertir eventos al formato de FullCalendar
  const calendarEvents = events.map((event) => {
    console.log('📅 CalendarView: Procesando evento:', event.title, 'para usuario:', event.userId);
    return {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      backgroundColor: event.userId === currentUserId ? EVENT_COLORS.own : EVENT_COLORS.others,
      borderColor: event.userId === currentUserId ? EVENT_COLORS.own : EVENT_COLORS.others,
      extendedProps: {
        ...event
      }
    };
  });

  console.log('📅 CalendarView: Eventos convertidos para FullCalendar:', calendarEvents.length);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event.extendedProps as CalendarEvent;
    onEventClick({
      ...event,
      id: clickInfo.event.id
    });
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    onDateSelect(selectInfo.start, selectInfo.end);
    
    // Limpiar selección
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  };

  // Ajustar altura del calendario en móvil
  useEffect(() => {
    const handleResize = () => {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        if (window.innerWidth < 768) {
          calendarApi.setOption('height', 'auto');
        } else {
          calendarApi.setOption('height', '100%');
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
        locale={esLocale}
        firstDay={CALENDAR_CONFIG.firstDay}
        slotMinTime={CALENDAR_CONFIG.slotMinTime}
        slotMaxTime={CALENDAR_CONFIG.slotMaxTime}
        slotDuration={CALENDAR_CONFIG.slotDuration}
        height="auto"
        events={calendarEvents}
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        eventClick={handleEventClick}
        select={handleDateSelect}
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          list: 'Agenda'
        }}
        nowIndicator={true}
        allDaySlot={true}
        navLinks={true}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
      />
    </div>
  );
};

