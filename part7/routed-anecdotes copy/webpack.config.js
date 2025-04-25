import path from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = (env, argv) => {
    console.log('argv', argv.mode)
  
    const backend_url = argv.mode === 'production'
      ? 'https://notes2023.fly.dev/api/notes'
      : 'http://localhost:3001/notes'
  
    return {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
      },
      devServer: {
        static: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
      },
      devtool: 'source-map',
      module: {
        // ...
      },
      plugins: [
        new webpack.DefinePlugin({
          BACKEND_URL: JSON.stringify(backend_url)
        })
      ]
    }
  }

export default config