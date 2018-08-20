var LessonModel = require('../models/LessonModel.js');

/**
 * LessonController.js
 *
 * @description :: Server-side logic for managing Lessons.
 */
module.exports = {

    /**
     * LessonController.list()
     */
    list: function (req, res) {
        var category = req.query.category;
        var lessonNumber = req.query.lessonNumber;
        var previous = req.query.previous;
        var next = req.query.next;
        var queryParams = "{";
        if(category)
        {
            queryParams = queryParams + "\"categories\":" + "\"" + category + "\"";
        }
        if(lessonNumber)
        {
            if(queryParams != '{')
            {
                queryParams = queryParams + ",";
            }
            queryParams = queryParams + "\"lessonNumber\":" + "\"" + lessonNumber + "\"";
        }
        if(previous)
        {
            if(queryParams != '{')
            {
                queryParams = queryParams + ",";
            }
            queryParams = queryParams + "\"previous\":" + "\"" + previous + "\"";
        }
        if(next)
        {
            if(queryParams != '{')
            {
                queryParams = queryParams + ",";
            }
            queryParams = queryParams + "\"next\":" + "\"" + next + "\"";
        }
        queryParams = queryParams + '}';
        if(queryParams != "{}")
        {
            var lessonQuery = JSON.parse(queryParams);
            LessonModel.find(lessonQuery, function (err, Lesson) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Lesson.',
                        error: err
                    });
                }
                if (!Lesson) {
                    return res.status(404).json({
                        message: 'No such Lesson'
                    });
                }
                return res.json(Lesson);
            });
        }
        else{
            LessonModel.find(function (err, Lessons) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Lesson.',
                        error: err
                    });
                }
                return res.json(Lessons);
            });
        }
    },

    /**
     * LessonController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        LessonModel.findOne({_id: id}, function (err, Lesson) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Lesson.',
                    error: err
                });
            }
            if (!Lesson) {
                return res.status(404).json({
                    message: 'No such Lesson'
                });
            }
            return res.json(Lesson);
        });
    },

    /**
     * LessonController.show_via_lessonNumber()
     */
    show_via_lessonNumber: function (req, res) {
        var lessonNumber = req.params.lessonNumber;
        LessonModel.findOne({lessonNumber:lessonNumber}, function (err, Lesson) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Lesson.',
                    error: err
                });
            }
            if (!Lesson) {
                return res.status(404).json({
                    message: 'No such Lesson'
                });
            }
            return res.json(Lesson);
        });
    },

   /**
     * LessonController.create()
     */
    create: function (req, res) {
        var Lesson = new LessonModel({
			lessonNumber : req.body.lessonNumber,
			name : req.body.name,
			prompt : req.body.prompt,
			code : req.body.code,
			categories : req.body.categories,
			next : req.body.next,
			previous : req.body.previous

        });

        Lesson.save(function (err, Lesson) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Lesson',
                    error: err
                });
            }
            return res.status(201).json(Lesson);
        });
    },

    /**
     * LessonController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        LessonModel.findOne({_id: id}, function (err, Lesson) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Lesson',
                    error: err
                });
            }
            if (!Lesson) {
                return res.status(404).json({
                    message: 'No such Lesson'
                });
            }

            Lesson.lessonNumber = req.body.lessonNumber ? req.body.lessonNumber : Lesson.lessonNumber;
			Lesson.name = req.body.name ? req.body.name : Lesson.name;
			Lesson.prompt = req.body.prompt ? req.body.prompt : Lesson.prompt;
			Lesson.code = req.body.code ? req.body.code : Lesson.code;
			Lesson.categories = req.body.categories ? req.body.categories : Lesson.categories;
			Lesson.next = req.body.next ? req.body.next : Lesson.next;
			Lesson.previous = req.body.previous ? req.body.previous : Lesson.previous;
			
            Lesson.save(function (err, Lesson) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Lesson.',
                        error: err
                    });
                }

                return res.json(Lesson);
            });
        });
    },

    /**
     * LessonController.update_via_lessonNumber()
     */
    update_via_lessonNumber: function (req, res) {
        var lessonNumber = req.params.lessonNumber;
        LessonModel.findOne({lessonNumber:lessonNumber}, function (err, Lesson) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Lesson',
                    error: err
                });
            }
            if (!Lesson) {
                return res.status(404).json({
                    message: 'No such Lesson'
                });
            }

            Lesson.lessonNumber = req.body.lessonNumber ? req.body.lessonNumber : Lesson.lessonNumber;
			Lesson.name = req.body.name ? req.body.name : Lesson.name;
			Lesson.prompt = req.body.prompt ? req.body.prompt : Lesson.prompt;
			Lesson.code = req.body.code ? req.body.code : Lesson.code;
			Lesson.categories = req.body.categories ? req.body.categories : Lesson.categories;
			Lesson.next = req.body.next ? req.body.next : Lesson.next;
			Lesson.previous = req.body.previous ? req.body.previous : Lesson.previous;
			
            Lesson.save(function (err, Lesson) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Lesson.',
                        error: err
                    });
                }

                return res.json(Lesson);
            });
        });
    },

    /**
     * LessonController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        LessonModel.findByIdAndRemove(id, function (err, Lesson) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Lesson.',
                    error: err
                });
            }
            return res.status(200).json();
        });
    }
};