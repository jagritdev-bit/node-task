const express = require('express');
require('dotenv/config')
// const bodyParser = require('body-parser');

const app = express();

// middleware to parse JSON request body
app.use(express.json());

const port = process.env.PORT || 3000; 

const user_id = process.env.UID || "john_doe_17091999";
const email = process.env.EMAIL || "john@xyz.com";
const roll_number = process.env.ROLL || "ABCD123";

app.get('/',(req, res) => {
    res.send('Server root. <h1>Welcome!</h1> Post to <code>/bhfl</code> for more ')
})

app.post('/bfhl', (req, res) => {
  const data = req.body.data;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid request body' });
  }

  const even_numbers = [];
  const odd_numbers = [];
  const alphabets = [];

  data.forEach((value) => {
    
    if (value.match(/[0-9]+/)) {
      if (value % 2 === 0) {
        even_numbers.push(value.toString());
      } else {
        odd_numbers.push(value.toString());
      }
    } else if (typeof value === 'string') {
      const chars = value.split('');
      let isAlpha = true;
      chars.forEach((char) => {
        if ((char < 'A' || char > 'Z') && (char < 'a' || char > 'z')) {
          isAlpha = false;
        }
      });
      if (isAlpha) {
        alphabets.push(value.toUpperCase());
      }
    }
  });

  const response = {
    is_success: true,
    user_id: user_id,
    email: email,
    roll_number: roll_number,
    even_numbers: even_numbers,
    odd_numbers: odd_numbers,
    alphabets: alphabets
  };

  res.json(response);
});

app.get('*',(req,res) => {
    res.status(404).send("Page not found. <a href='/'>Go Home</a>")
})

app.use("*",(req, res) => {
    res.status(404).json({message:"Invalid Endpoint"})
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});