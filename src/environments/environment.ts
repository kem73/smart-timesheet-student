export const environment = {
  envName: 'development',
  production: false,
  apiBaseUrl: 'http://localhost:3000',
  endpoints: {
    students: '/students',
    timetable: '/timetable',
  } as const,
  apiVersion: 'v1'
} as const;
