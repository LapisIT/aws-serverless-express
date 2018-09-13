import app from './app';
const port = process.env.ADMIN_API_PORT || 3001

app.listen(port)
console.log(`listening on http://localhost:${port}`)
