import mongoose from 'mongoose'
let ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema
const conn = mongoose.createConnection(
    process.env.MONGODB_URL!
)
conn.on('open', () => console.log('数据库连接成功'))
conn.on('error', (error) => console.log(error))
const CategorySchema = new Schema({
    name: String
})
const CategoryModel = conn.model('Category', CategorySchema)

const ProductSchema = new Schema({
    name: String,
    category: {
        type: ObjectId,
        ref: 'Category'
    }
})
const ProductModel = conn.model('Product', ProductSchema)

export {
    CategoryModel,
    ProductModel
}