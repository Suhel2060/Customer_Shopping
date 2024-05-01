const express = require('express')
var cors=require('cors');
const app = express()
//As my react and backend is in different port we need to use cors
app.use(cors())
const port = 5000
app.use(express.json())
app.use('/items',require('./routes/fetchitems'));
app.use('/package',require('./routes/generatepackage'));
// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports=app;