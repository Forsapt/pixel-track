const {Sequelize} = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.database_url,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: config.database_ssl,
        rejectUnauthorized: false
      }
    }
  }
)

const modelDefiners = [
  require("./user"),
  require("./tracker"),
  require("./record"),
  require("./refreshToken")
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

let {tracker, record, user, refreshToken} = sequelize.models;

user.hasMany(tracker, {
  foreignKey: {allowNull: false},
  onDelete: "CASCADE",
});


user.hasMany(refreshToken, {
  foreignKey: {allowNull: false},
  onDelete: "CASCADE",
});

tracker.hasMany(record, {
  foreignKey: {allowNull: false},
  onDelete: "CASCADE",
});

if (process.env.ACTION === "create_database") {
  sequelize.sync({force: true});
}

module.exports = sequelize;
