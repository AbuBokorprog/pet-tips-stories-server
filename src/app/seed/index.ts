import config from '../config';
import { userModel } from '../Modules/User/user.model';

const adminUser = {
  username: 'Super Admin',
  email: config.admin_email,
  password: config.admin_password,
  profilePicture:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NIXc73ZgxZfbifJP3Bsv35sekQyklo-9JA&s',
  role: 'admin',
};

export const AdminSeed = async () => {
  const isExistAdmin = await userModel.findOne({
    email: 'superadmin@gmail.com',
  });

  if (!isExistAdmin) {
    await userModel.create(adminUser);
  }
};
