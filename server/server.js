const express = require('express');
const multer = require('multer');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

// Sequelize configuration
// const sequelize = new Sequelize('pictopia', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql'
// });
const sequelize = new Sequelize('be6axegwinxc7baavyk7', 'ueedchmdqfnvwyv1', 'f95pKdsST0VJrBpG0OjL', {
    host: 'be6axegwinxc7baavyk7-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});

// Define Image model
const Image = sequelize.define('Image', {
    username: {
        type: DataTypes.STRING
    },
    caption: {
        type: DataTypes.STRING
    },
    filename: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.BLOB('long')
    }
});

// Synchronize the model with the database
sequelize.sync();

// Multer configuration for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Route for handling image uploads with username and caption
app.post('/api/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const { username, caption } = req.body;

    try {
        // Save image and additional data to the database
        const savedImage = await Image.create({
            username: username,
            caption: caption,
            filename: req.file.originalname,
            data: req.file.buffer
        });

        res.json({ message: 'Data uploaded successfully' });
    } catch (error) {
        console.error('Error saving data to database:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for fetching all data from the database
// Route for fetching all data from the database
// Route for fetching all data from the database
app.get('/api/images', async (req, res) => {
    try {
        // Fetch all data from the database using raw SQL query
        const query = 'SELECT * FROM Images';
        const allData = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(allData);
    } catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
