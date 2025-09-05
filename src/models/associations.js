import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import Article from "../models/article.model.js";
import Tag from "../models/tag.model.js";
import articleTag from "../models/articletag.model.js";

User.hasOne(Profile, {
  foreignKey: "user_id",
  as: "profile",
});

Profile.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Relaciones entre User y Article
User.hasMany(Article, {
  foreignKey: "user_id",
  as: "articles",
});

Article.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});


Article.belongsToMany(Tag, {
  through: articleTag,
  foreignKey: "article_id",
  as: "tags",
  onDelete: "CASCADE",
});

Tag.belongsToMany(Article, {
  through: articleTag,
  foreignKey: "tag_id",
  as: "articles",
  onDelete: "CASCADE",
});
