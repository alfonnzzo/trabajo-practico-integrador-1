import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import Article from "../models/article.model.js";
import Tag from "../models/tag.model.js";
import ArticleTag from "../models/articletag.model.js"
// --------------------
// Relación 1:1 User ↔ Profile
// --------------------
User.hasOne(Profile, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});
Profile.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// --------------------
// Relación 1:N User ↔ Article
// --------------------
User.hasMany(Article, {
  foreignKey: "user_id",
  as: "articles",
  onDelete: "CASCADE",
});
Article.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});

// --------------------
// Relación N:M Article ↔ Tag (tabla pivote ArticleTag)
// --------------------
Article.belongsToMany(Tag, {
  through: ArticleTag,
  foreignKey: "article_id",
  otherKey: "tag_id",
  as: "tags",
  onDelete: "CASCADE",
});

Tag.belongsToMany(Article, {
  through: ArticleTag,
  foreignKey: "tag_id",
  otherKey: "article_id",
  as: "articles",
  onDelete: "CASCADE",
});
