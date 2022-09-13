
let {sequelize,DataTypes}=require('./../database/database')




module.exports = sequelize.define("user_discounts",{
    id:{
        type:DataTypes.STRING(255),
        allowNull:false,
        primaryKey:true
    },
    amount:DataTypes.INTEGER(11),
    discountId: DataTypes.STRING(100),
    trackingCode: DataTypes.STRING(100),
    username: DataTypes.STRING(100),
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,


},{
    timestamps:true
})