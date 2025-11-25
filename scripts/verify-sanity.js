const { createClient } = require('next-sanity')

const client = createClient({
    projectId: 'ee8uuao3',
    dataset: 'production',
    apiVersion: '2024-02-25',
    useCdn: false
})

console.log('Fetching from Sanity...')
client.fetch('*[_type == "post"][0]')
    .then(res => console.log('Success:', res))
    .catch(err => console.error('Error:', err))
