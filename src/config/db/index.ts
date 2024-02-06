import mongoose from 'mongoose';

async function connect(): Promise<void> {
    try {
        await mongoose.connect('mongodb://127.0.0.1/mgdb_test_dev');
        console.log('Connect DB okela');
    } catch (err) {
        console.log('Connect DB fail with error:', err);
    }
}

export { connect };