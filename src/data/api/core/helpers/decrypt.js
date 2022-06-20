class Decryptor {
  decrypt(rawResponse) {
    let decryptedRes = null
    //TODO: process rawResponse to decrypted response
    console.log('>>>DECRYPTOR: running...')
    decryptedRes = rawResponse
    console.log('>>>DECRYPTOR: ended...')

    return decryptedRes
  }
}

const decryptor = new Decryptor()
export default decryptor
