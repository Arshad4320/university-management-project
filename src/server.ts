import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
async function main() {
  try {
    await mongoose.connect(config.database_uri as string)
    console.log('🎆😍 database connection successfully')
    app.listen(config.port, () => {
      console.log(`listening port on ${config.port}`)
    })
  } catch (error) {
    console.log('😒 database connection error', error)
  }
}
main()
