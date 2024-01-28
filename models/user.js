const { DataTypes } = require("sequelize");
const db = require("../config/database.js");

const Users = db.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  image_profile: {
    type: DataTypes.STRING(115),
    defaultValue: null,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  no_whatsapp: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(115),
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(115),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(15),
    defaultValue: "user",
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationCode: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  isActive_payment: {
    type: DataTypes.STRING,
    defaultValue: "passive",
  },
  reset_password_token: {
    type: DataTypes.STRING(115),
    defaultValue: null,
  },
});

module.exports = Users;

(async () => {
  await Users.sync({ alter: true }).then(() => {
    console.log("User Database & tables created!");
  });
})();
