import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const SESSION_HEADER = 'sessionID';

function generateSessionId(studentId?: string): string {
  const timestamp = Date.now();
  return btoa(`${timestamp}:${studentId ?? ''}`);
}

export const sessionInterceptor: HttpInterceptorFn = (req, next) => {
  const { apiBaseUrl } = environment;
  if (!req.url.startsWith(apiBaseUrl)) {
    return next(req);
  }
  if (req.method !== 'POST') {
    return next(req);
  }
  const body = req.body as { id?: string } | null;
  const studentId = body?.id ?? '';

  const sessionID = generateSessionId(studentId);

  const cloned = req.clone({
    setHeaders: {
      [SESSION_HEADER]: sessionID,
      // 'Content-Type': 'application/json'
    }
  });

  return next(cloned);
};
