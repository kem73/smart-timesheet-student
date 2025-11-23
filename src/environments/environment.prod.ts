export const environment = {
  envName: 'production',
  production: true,
  apiBaseUrl: 'https://api.myapp.com',
  endpoints: {
    students: '/students',
    timetable: '/timetable',
  } as const,
  apiVersion: 'v1'
} as const;
