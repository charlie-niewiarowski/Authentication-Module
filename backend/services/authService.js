const driver = require('../config/neo4j')
const { identifyUser } = require('./userService')

const authenticateUser = async (identifier, password) => {
    const session = driver.session()
    try {
        const user = await identifyUser(identifier, password)
        if (!user) {
            return null
        }
          
        const isMatch = await bcrypt.compare(password, user.hashedPassword);

        return isMatch ? user : null; 
    } catch (error) {
        console.error("Error authenticating user: ", error)
        throw error
    } finally {
        await session.close()
    }
}

module.exports = { authenticateUser }