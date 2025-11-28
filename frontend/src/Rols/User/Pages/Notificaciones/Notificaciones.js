import NotificacionesPublic from '../../../Public/Pages/notifications/notificaciones';

// Wrapper to expose the public Notificaciones component at the User path
export default function Notificaciones(props) {
  return <NotificacionesPublic {...props} />;
}
