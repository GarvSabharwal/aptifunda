﻿

exports.index = function (req, res) {
    res.render('index', { title: 'Welcome to APTIFUNDA.com', year: new Date().getFullYear() });
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};
