import User from "./user.model";
import Profile from "./profile.model";
import Article from "./article.model";
import Tag from "./tag.model";
import articleTag from "./articletag.model";

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
