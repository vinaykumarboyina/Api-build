module.exports=(sequelize,DataTypes)=>{
    const Users=sequelize.define("user",{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        firstname:{
            type:DataTypes.STRING,
            allowNull:false 
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false 
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
        
    },{
        timestamps:false,
        
    })
    return Users
}