module.exports = function(sequelize, DataTypes) {
    var Favorate = sequelize.define("Favs", {
        name: DataTypes.STRING,
        image_url: DataTypes.TEXT,
        page_url: DataTypes.STRING
    });
    return Favorate;
};