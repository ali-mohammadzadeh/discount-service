
let {sequelize,DataTypes,Model}=require('./../database/database')



class discounts extends Model {

}

discounts.init({
    id:{
        type:DataTypes.STRING(255),
        allowNull:false,
        primaryKey:true
    },
    count:DataTypes.INTEGER(11),
    amount:DataTypes.INTEGER(11),
    code: DataTypes.STRING(100),
    status: DataTypes.STRING(20),
    title: DataTypes.STRING(100),
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,

},{
    timestamps:true,
    sequelize
})

require("../hooks/discount/discountHooks")(discounts)

module.exports =discounts;
