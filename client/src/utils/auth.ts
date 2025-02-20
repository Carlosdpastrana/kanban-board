import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return false;
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }

  login(idToken: string) {
    localStorage.setItem('jwtToken', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('jwtToken');
    window.location.assign('/login');
  }
}

export default new AuthService();