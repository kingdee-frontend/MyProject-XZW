/*
 Navicat MySQL Data Transfer

 Source Server         : neiwang
 Source Server Type    : MySQL
 Source Server Version : 50710
 Source Host           : 127.0.0.1
 Source Database       : zhiwei_blog

 Target Server Type    : MySQL
 Target Server Version : 50710
 File Encoding         : utf-8

 Date: 04/30/2017 16:33:49 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pic_url` varchar(100) DEFAULT NULL,
  `userId` int(100) DEFAULT NULL,
  `upload_date` varchar(13) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `abstract` text,
  `collection` varchar(100) DEFAULT NULL,
  `read_num` int(100) DEFAULT NULL,
  `reply_num` int(100) DEFAULT NULL,
  `like_num` int(100) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('1', '/pic/page-bg.png', '3', null, '如何拓宽视野、刷新三观？这些书请你一定记得读', '我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。', '历史', '2055', '24', '216', null), ('2', '/pic/page-bg.png', '3', null, '如何拓宽视野、刷新三观？这些书请你一定记得读', '我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。', '历史', '2055', '24', '216', null), ('3', '/pic/page-bg.png', '3', null, '如何拓宽视野、刷新三观？这些书请你一定记得读', '我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。', '历史', '2055', '24', '216', null), ('4', '/pic/page-bg.png', '3', null, '如何拓宽视野、刷新三观？这些书请你一定记得读', '我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。', '历史', '2055', '24', '216', null), ('5', '/pic/page-bg.png', '3', null, '如何拓宽视野、刷新三观？这些书请你一定记得读', '我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。', '旅行·在路上', '2055', '24', '216', null), ('6', '/pic/page-bg.png', '3', null, '如何拓宽视野、刷新三观？这些书请你一定记得读', '我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。', '历史', '2055', '24', '216', null), ('7', '/pic/page-bg.png', '3', null, '如何拓宽视野、刷新三观？这些书请你一定记得读', '我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。', '历史', '2055', '24', '216', null), ('18', 'http://localhost:9999/upload/858589103720108032.png', '14', '1493538570423', '测试文章', '啊实打实的', '历史', null, null, null, '<p>阿萨德<img src=\"http://localhost:9999/upload/858589103720108032.png\" title=\"\" alt=\"大咖面对面封面修改.png\"/></p>'), ('19', '/pic/page-bg.png', '14', '1493538586820', '啊实打实大', '阿萨德阿萨德', '其他', null, null, null, '<p>啊实打实的</p>');
COMMIT;

-- ----------------------------
--  Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `time` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `comment`
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES ('11', '19', '14', '很棒的文章', '1493540384489');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('2', 'david2', '123456'), ('3', 'david', '123456'), ('4', 'david', '123456'), ('5', 'david', '123456'), ('6', 'david', '123456'), ('7', 'undefined', '123'), ('8', 'david123', '123'), ('9', 'jimmy', '123456'), ('10', 'ji', '123'), ('11', 'david1', '11'), ('12', '123', '333'), ('13', 'zhiwei', 'zhiwei'), ('14', '测试', '123456');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
