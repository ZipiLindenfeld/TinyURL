const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// יצירת משתמש חדש
router.post('/users', userController.createUser);

// קבלת כל המשתמשים
router.get('/users', userController.getUsers);

// עדכון משתמש קיים
router.put('/users/:id', userController.updateUser);

// מחיקת משתמש קיים
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
