const bcrypt = require('bcrypt');
const User = require('../api/user/user.model');

async function createDefaultAdmin() {
    const existingAdmin = await User.findOne({ email: 'admin@techbyte.com' });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('Admin@123', 10); // change for production
        const adminUser = new User({
            name: 'Super Admin',
            email: 'admin@techbyte.com',
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log('✅ Default admin account created.');
    } else {
        console.log('ℹ️ Admin account already exists.');
    }
}

module.exports = createDefaultAdmin;
