import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function main() {
  await mongoose.connect(config.database_url as string)
  try {
    console.log('Database connection successful')

    app.listen(config.port, () => {
      console.log(`Application app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('failed database connection ', err)
  }
}
main()
