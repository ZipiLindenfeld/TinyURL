const User = require('../models/User');
const Link = require('../models/Link');

// יצירת משתמש חדש עם רשימת מזהים של קישורים
exports.createUser = async (req, res) => {
  const { name, email, password, linkIds } = req.body;

  // אימות שהקישורים קיימים
  const links = await Link.find({ _id: { $in: linkIds } });
  if (links.length !== linkIds.length) {
    return res.status(400).send({ message: 'One or more links not found' });
  }

  // יצירת משתמש חדש עם מזהי הקישורים שנמצאו
  const user = new User({ name, email, password, links: linkIds });
  await user.save();
  res.status(201).send(user);
};

// קבלת כל המשתמשים
exports.getUsers = async (req, res) => {
  const users = await User.find().populate('links');
  res.send(users);
};

// עדכון משתמש קיים
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, linkIds } = req.body;

  // אימות שהקישורים קיימים
  const links = await Link.find({ _id: { $in: linkIds } });
  if (links.length !== linkIds.length) {
    return res.status(400).send({ message: 'One or more links not found' });
  }

  const user = await User.findByIdAndUpdate(id, { name, email, password, links: linkIds }, { new: true });
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  res.send(user);
};

// מחיקת משתמש קיים
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  res.send({ message: 'User deleted successfully' });
};
