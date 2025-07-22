export default {
  name: 'token',
  title: 'Tokens',
  type: 'document',
  fields: [
    { name: 'symbol', title: 'Symbol', type: 'string' },
    { name: 'address', title: 'Contract Address', type: 'string' },
    { name: 'chain', title: 'Blockchain', type: 'string' }
  ]
}