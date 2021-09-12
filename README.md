
# RealSync
> Execute Server Functions from Client side
 
![banner](https://user-images.githubusercontent.com/31907722/132995756-a13db366-2502-4b30-bec8-2f0ccd1ddfb7.png)

 
## Usage

### Server
Here is a sample code for your Server, you can use Express if you want.
```javascript
const http = require('http')
const app = http.createServer()
const { RealSync } = require('../packages/server/lib')

const realsync = new RealSync(app, '*')

realsync.register('profile/setup', async (client) => {
    const firstName = await client.run('profile/firstname')
    const lastName = await client.run('profile/lastname')

    return { firstName, lastName }
})

app.listen(8080, () => {
    console.log('8080')
})
```

### Client
```js
import { RealSync } from '@realsync/react'
const realsync = new RealSync('http://localhost:8080')

function App() {
    useEffect(() => {
        // this will register services

        realsync.register('profile/firstname', () => {
            return prompt('Enter first name')
        })

        realsync.register('profile/lastname', () => {
            return prompt('Enter last name')
        })
    }, [])

    const Start = async () => {
        const profile = await realsync.service('profile/setup')
        console.log('profile', profile)
    }

    return (
        <div>
            <button onClick={Start}>Start</button>
        </div>
    )
}
```
