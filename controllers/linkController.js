const Link = require('../models/Link');

// יצירת קישור חדש
exports.createLink = async (req, res) => {
    const { originalUrl } = req.body;
    const { targetParamName } = req.body;
    console.log(originalUrl);
    const link = new Link({ originalUrl, targetParamName });
    await link.save();
    res.status(201).send(link);
};

// קבלת כל הקישורים
exports.getLinks = async (req, res) => {
    const links = await Link.find();
    res.send(links);
};

// עדכון קישור קיים
exports.updateLink = async (req, res) => {
    const { id } = req.params;
    const { originalUrl } = req.body;
    const link = await Link.findByIdAndUpdate(id, { originalUrl }, { new: true });
    if (!link) {
        return res.status(404).send({ message: 'Link not found' });
    }
    res.send(link);
};

// מחיקת קישור קיים
exports.deleteLink = async (req, res) => {
    const { id } = req.params;
    const link = await Link.findByIdAndDelete(id);
    if (!link) {
        return res.status(404).send({ message: 'Link not found' });
    }
    res.send({ message: 'Link deleted successfully' });
};


// הפניית קישור מקוצר לקישור המקורי ועדכון קליק
exports.redirectLink = async (req, res) => {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) {
        return res.status(404).send({ message: 'Link not found' });
    }

    // בדיקה ועיבוד של פרמטר ה-target ב-query string
    const targetParamName = link.targetParamName;
    console.log(targetParamName);
    const targetParamValue = req.query[targetParamName] || '';

    // הוספת קליק
    link.clicks.push({ ipAddress: req.ip, targetParamValue });
    await link.save();

    res.send(link.originalUrl);
    //  res.redirect(link.originalUrl)
}

