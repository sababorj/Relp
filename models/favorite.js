module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
        name: DataTypes.STRING,
        image_url: DataTypes.TEXT,
        page_url: DataTypes.STRING
    });
    return Favorite;
};