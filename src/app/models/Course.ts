import mongoose, { Schema } from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const CourseSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    slug: { type: String, slug: 'name', unique: true }
});

const CourseModel = mongoose.model('Course', CourseSchema);

export default CourseModel;
