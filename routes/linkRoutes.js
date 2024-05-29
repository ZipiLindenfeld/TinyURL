const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// יצירת קישור חדש
router.post('/links', linkController.createLink);

// קבלת כל הקישורים
router.get('/links', linkController.getLinks);

// עדכון קישור קיים
router.put('/links/:id', linkController.updateLink);

// מחיקת קישור קיים
router.delete('/links/:id', linkController.deleteLink);

router.get('/links/redirect/:id', linkController.redirectLink)

module.exports = router;
