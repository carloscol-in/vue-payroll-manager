import { auth, reauthenticateWithCredential, EmailAuthProvider } from './firebase';

export function reauthenticate(password) {
  const user = auth.currentUser;
  const credentials = EmailAuthProvider.credential(
    user.email,
    password,
  );
  return reauthenticateWithCredential(user, credentials);
}
