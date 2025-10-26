import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonRange,
  IonSegment,
  IonSegmentButton,
  IonIcon
} from '@ionic/react';
import { colorPalette } from 'ionicons/icons';
import { Turno, TurnoFormData } from '@/types';
import './TurnoConfigPage.css';

interface TurnoConfigPageProps {
  turno?: Turno | null;
  onSave: (formData: TurnoFormData) => Promise<void>;
  onCancel: () => void;
}

const COLORES_FONDO = [
  '#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#C71585',
  '#FFE4E1', '#FFA07A', '#FF6347', '#FF4500', '#DC143C'
];

const COLORES_TEXTO = [
  '#000000', '#2C3E50', '#34495E', '#7F8C8D', '#95A5A6',
  '#FFFFFF', '#ECF0F1', '#BDC3C7', '#D35400', '#E74C3C'
];

export const TurnoConfigPage: React.FC<TurnoConfigPageProps> = ({
  turno,
  onSave,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState<'aspecto' | 'horarios' | 'acciones'>('aspecto');
  const [formData, setFormData] = useState<TurnoFormData>({
    nombre: turno?.nombre || 'Nuevo',
    abreviatura: turno?.abreviatura || 'Nuevo',
    colorFondo: turno?.colorFondo || '#FFB6C1',
    colorTexto: turno?.colorTexto || '#000000',
    tamañoTexto: turno?.tamañoTexto || 12,
    horarioInicio: turno?.horarioInicio || '',
    horarioFin: turno?.horarioFin || ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      onCancel();
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>CONFIGURACIÓN DE TURNOS</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="turno-config-content">
        {/* Nombre del turno */}
        <div className="turno-nombre-section">
          <IonItem lines="none">
            <IonLabel position="stacked" className="section-label">
              Nombre del turno
            </IonLabel>
            <IonInput
              value={formData.nombre}
              onIonInput={(e) => setFormData({ ...formData, nombre: e.detail.value || '' })}
              placeholder="Nombre del turno"
              className="turno-nombre-input"
            />
          </IonItem>
          <div 
            className="turno-preview-badge"
            style={{
              backgroundColor: formData.colorFondo,
              color: formData.colorTexto
            }}
          >
            {formData.nombre}
          </div>
        </div>

        {/* Tabs */}
        <IonSegment 
          value={activeTab} 
          onIonChange={(e) => setActiveTab(e.detail.value as any)}
          className="turno-tabs"
        >
          <IonSegmentButton value="aspecto">
            <IonLabel>ASPECTO</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="horarios">
            <IonLabel>HORARIOS</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="acciones">
            <IonLabel>ACCIONES</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Contenido de tabs */}
        <div className="tab-content">
          {activeTab === 'aspecto' && (
            <div className="aspecto-tab">
              {/* Abreviatura */}
              <div className="form-section">
                <IonLabel className="section-title">ABREVIATURA</IonLabel>
                <IonInput
                  value={formData.abreviatura}
                  onIonInput={(e) => setFormData({ ...formData, abreviatura: e.detail.value || '' })}
                  placeholder="Abreviatura"
                  className="abreviatura-input"
                />
              </div>

              {/* Color de fondo */}
              <div className="form-section">
                <IonLabel className="section-title">COLOR DE FONDO</IonLabel>
                <div className="color-picker">
                  <button className="color-palette-btn">
                    <IonIcon icon={colorPalette} />
                  </button>
                  <div className="color-options">
                    {COLORES_FONDO.map((color) => (
                      <button
                        key={color}
                        className={`color-option ${formData.colorFondo === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData({ ...formData, colorFondo: color })}
                      >
                        {formData.colorFondo === color && (
                          <span className="check-mark">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button className="color-nav-btn">›</button>
                </div>
              </div>

              {/* Color de texto */}
              <div className="form-section">
                <IonLabel className="section-title">COLOR DE TEXTO</IonLabel>
                <div className="color-picker">
                  <button className="color-palette-btn">
                    <IonIcon icon={colorPalette} />
                  </button>
                  <div className="color-options">
                    {COLORES_TEXTO.map((color) => (
                      <button
                        key={color}
                        className={`color-option ${formData.colorTexto === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData({ ...formData, colorTexto: color })}
                      >
                        {formData.colorTexto === color && (
                          <span className="check-mark">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button className="color-nav-btn">›</button>
                </div>
              </div>

              {/* Tamaño del texto */}
              <div className="form-section">
                <IonLabel className="section-title">TAMAÑO DEL TEXTO</IonLabel>
                <div className="range-container">
                  <span className="range-value">{formData.tamañoTexto}</span>
                  <IonRange
                    min={8}
                    max={24}
                    value={formData.tamañoTexto}
                    onIonChange={(e) => setFormData({ ...formData, tamañoTexto: e.detail.value as number })}
                    className="text-size-range"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'horarios' && (
            <div className="horarios-tab">
              <IonItem>
                <IonLabel position="stacked">Horario de inicio</IonLabel>
                <IonInput
                  type="time"
                  value={formData.horarioInicio}
                  onIonInput={(e) => setFormData({ ...formData, horarioInicio: e.detail.value || '' })}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Horario de fin</IonLabel>
                <IonInput
                  type="time"
                  value={formData.horarioFin}
                  onIonInput={(e) => setFormData({ ...formData, horarioFin: e.detail.value || '' })}
                />
              </IonItem>
            </div>
          )}

          {activeTab === 'acciones' && (
            <div className="acciones-tab">
              <IonLabel>Acciones adicionales próximamente...</IonLabel>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="action-buttons">
          <IonButton
            expand="block"
            fill="outline"
            color="medium"
            onClick={onCancel}
            disabled={isSaving}
            className="cancel-button"
          >
            CANCELAR
          </IonButton>
          <IonButton
            expand="block"
            color="primary"
            onClick={handleSave}
            disabled={isSaving}
            className="save-button"
          >
            {isSaving ? 'GUARDANDO...' : 'GUARDAR'}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

