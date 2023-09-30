import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes.router,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/users', UserRoutes);
// router.use('/academic-semester', AcademicSemesterRoutes.router);
export default router;
