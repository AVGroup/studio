-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 06 2013 г., 14:05
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `studio`
--

-- --------------------------------------------------------

--
-- Структура таблицы `photo`
--

CREATE TABLE IF NOT EXISTS `photo` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `idp` int(5) NOT NULL,
  `photo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `photo`
--

INSERT INTO `photo` (`id`, `idp`, `photo`) VALUES
(1, 1, '/templates/img.png '),
(2, 2, '/templates/img.png '),
(3, 1, '/studio/templates/img.png '),
(4, 2, '/studio/templates/img.png '),
(5, 2, '/studio/templates/img.png'),
(6, 2, '/studio/templates/img.png');

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `desc` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `name`, `desc`, `photo`) VALUES
(1, 'проект 1', 'описание проекта 1', 'templates/imgpr/img1.png'),
(2, 'sdff', 'dsffds', 'templates/imgpr/img2.png'),
(3, 'sdff', 'dsffds', '/templates/imgpr/img3.png'),
(4, 'fefe', 'feefef', '/templates/imgpr/img4.png'),
(5, 'templates/img.png', 'templates/img.png', 'templates/img.png'),
(6, 'fefe', 'feefef', 'templates/img.png'),
(7, 'templates/img.png', 'templates/img.png', 'templates/img.png');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
