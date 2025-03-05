const driver = require('../config/neo4j')
const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

const registerUser = async (username, email, password) => {
    const session = driver.session()
    try {
        const hashedPassword = await hashPassword(password)
        const result = await session.run(
            `CREATE (user:User { 
                userID: apoc.create.uuid(), 
                username: $username, 
                email: $email, 
                password: $hashedPassword, 
                createdAt: datetime() 
                }) 
                RETURN user.userID AS userID`,
            { username, email, hashedPassword }
        )
        
        return result.records[0]?.get("userID")
    } catch (error) {
        console.error("Error creating user:", error)
        throw error
    } finally {
        await session.close()
    }
}

const identifyUser = async (identifier) => {
    const session = driver.session()
    try {
        const result = await session.run(
            `MATCH(user:USER)
            WHERE user.email = $identifier OR user.username = $identifier OR user.userID = $identifier
            return user`,
            { identifier }
        )

        return result.records.length > 0 ? result.records[0] : null;
    } catch (error) {
        console.error("Error finding user: ", error)
        throw error
    } finally {
        await session.close()
    }
}

module.exports = { registerUser, identifyUser }