import mongoose from 'mongoose';

await mongoose.connect('mongodb://localhost:27017/portfolio');

const id = '68e5dafbc0a2d8714a309302';
const Settings = mongoose.model('Settings', new mongoose.Schema({}, {strict: false, collection: 'settings'}));

const found = await Settings.findById(id);
console.log('Found by ID:', found);

const all = await Settings.find();
console.log('\nAll settings IDs:');
all.forEach(s => console.log('  -', s._id.toString()));

process.exit(0);
