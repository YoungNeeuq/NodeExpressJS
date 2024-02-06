export const mongoosesToObject = (mongooses: any[]): any[] => {
    return mongooses.map((mongoose) => mongoose.toObject());
};

export const mongooseToObject = (mongoose: any): any => {
    return mongoose.toObject();
};
