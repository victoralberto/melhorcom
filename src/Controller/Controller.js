const Celular = require('../Models/Celular');

exports.createCelular = (req, res) => {
    if (req.body) {
        if (req.body.price > 0) {
            if (req.body.model.length >= 2 && req.body.model.length <= 255) {
                if (req.body.brand.length >= 2 && req.body.brand.length <= 255) {
                    if (req.body.code.length == 8) {
                        var verifyCode = Celular.findAll({
                            where: {
                                code: req.body.code
                            }
                        }).then(data => {
                            if (data == 0) {

                                var date = new Date("2018-12-25");

                                var starDate = new Date(req.body.startDate);
                                var newStartDate = new Date();
                                newStartDate.setDate(starDate.getDate());
                                newStartDate.setMonth(starDate.getMonth());
                                newStartDate.setFullYear(starDate.getFullYear());

                                var endDate = new Date(req.body.endDate)
                                var newEndDate = new Date();
                                newEndDate.setDate(endDate.getDate());
                                newEndDate.setMonth(endDate.getMonth());
                                newEndDate.setFullYear(endDate.getFullYear());

                                if (newEndDate.toISOString() > newStartDate.toISOString() && newStartDate.toISOString() > date.toISOString()) {
                                    var celular = {
                                        model: req.body.model.replace(/\s/g, '').toUpperCase(),
                                        price: req.body.price,
                                        brand: req.body.brand.replace(/\s/g, '').toUpperCase(),
                                        startDate: req.body.startDate,
                                        endDate: req.body.endDate,
                                        colorId: req.body.colorId,
                                        code: req.body.code.replace(/\s/g, '').toUpperCase()
                                    };

                                    Celular.create(celular)
                                        .then(data => {
                                            res.send("Segue os dados cadastrados no sistema: " + JSON.stringify(data));
                                        }).catch(err => {
                                        err.message || "Some error ocurred while creating the Celular."
                                    });
                                } else {
                                    res.json({message: "A data do início da venda deve ser posterior " +
                                    "ao dia 25/12/2018, e a data de fim da venda deve ser posterior a data de início."})
                                }
                            } else {
                                res.json({message: "Dados inválidos. Código do produto já existe."})
                            }
                        }).catch(err => {
                            res.json(err.message || {message: "Some error ocurred while creating the Celular."})
                        })

                    } else {
                        res.json({message: "Dados inválidos. O código do celular deve ter apenas 8 caracteres."})
                    }
                } else {
                    res.json({message: "Dados inválidos. A marca do celular deve conter no mínimo 2 caracteres e no máximo 255."})
                }
            } else {
                res.json({message: "Dados inválidos. O modelo do celular deve conter no mínimo 2 caracteres e no máximo 255"})
            }
        } else {
            res.json({message: "Dados inválidos. O preço do produto deve ser maior do que R$0000,00"})
        }
    } else {
        res.json({message: "O conteúdo não pode estar vazio."})
    }
};

exports.showCelular = (req, res) => {

    Celular.findAll().then(data => {

        if (data == 0) {
            res.json({message: "Não há dados."})
        }

        var json = {};
        for (let i = 0; i < data.length; i++) {

            var createdAt = new Date(data[i].createdAt);
            var updatedAt = new Date(data[i].updatedAt);
            var startDate = new Date(data[i].startDate);
            var endDate = new Date(data[i].endDate);
            var startDateFormat = ((startDate.getDate() )) + "/" + ((startDate.getMonth() +1)) + "/" + ((startDate.getFullYear()) );
            var endDateFormat = ((startDate.getDate() )) + "/" + ((startDate.getMonth() +1)) + "/" + startDate.getFullYear();
            var createdAtFormat = ((createdAt.getDate() )) + "/" + ((createdAt.getMonth() +1)) + "/" + createdAt.getFullYear();
            var updatedAtFormat = ((updatedAt.getDate() )) + "/" + ((updatedAt.getMonth() +1)) + "/" + updatedAt.getFullYear();

            json[i] = {
                "id": data[i].id,
                "model": data[i].model,
                "price": data[i].price,
                "brand": data[i].brand,
                "startDate": startDateFormat,
                "endDate": endDateFormat,
                "colorId": data[i].colorId,
                "code": data[i].code,
                "createdAt": createdAtFormat,
                "updatedAt": updatedAtFormat
            }
        }
        res.json(json);
    })

}

exports.findOneCelular = (req, res) => {

    const id = req.params.id;
    Celular.findByPk(id).then(data => {

        var createdAt = new Date(data.createdAt);
        var updatedAt = new Date(data.updatedAt);
        var startDate = new Date(data.startDate);
        var endDate = new Date(data.endDate);
        var startDateFormat = ((startDate.getDate() )) + "/" + ((startDate.getMonth() +1)) + "/" + ((startDate.getFullYear()) );
        var endDateFormat = ((startDate.getDate() )) + "/" + ((startDate.getMonth() +1)) + "/" + startDate.getFullYear();
        var createdAtFormat = ((createdAt.getDate() )) + "/" + ((createdAt.getMonth() +1)) + "/" + createdAt.getFullYear();
        var updatedAtFormat = ((updatedAt.getDate() )) + "/" + ((updatedAt.getMonth() +1)) + "/" + updatedAt.getFullYear();

        var json = {
            "id": data.id,
            "model": data.model,
            "price": data.price,
            "brand": data.brand,
            "startDate": startDateFormat,
            "endDate": endDateFormat,
            "colorId": data.colorId,
            "code": data.code,
            "createdAt": createdAtFormat,
            "updatedAt": updatedAtFormat
        }
        res.json(json);
    }).catch(err => {
        res.status(404).json({message: "Dados do celular não encontrados."})
    });

}

exports.updateCelular = (req, res) => {

    const id = req.params.id;

    if (req.body) {
        if (req.body.price > 0) {
            if (req.body.model.length >= 2 && req.body.model.length <= 255) {
                if (req.body.brand.length >= 2 && req.body.brand.length <= 255) {
                    if (req.body.code.length == 8) {
                        var verifyCode = Celular.findAll({
                            where: {
                                code: req.body.code
                            }
                        }).then(data => {

                            Celular.findByPk(id).then(found => {

                                if (data == 0 || found.code == req.body.code) {

                                    var date = new Date("2018-12-25");

                                    var starDate = new Date(req.body.startDate);
                                    var newStartDate = new Date();
                                    newStartDate.setDate(starDate.getDate());
                                    newStartDate.setMonth(starDate.getMonth());
                                    newStartDate.setFullYear(starDate.getFullYear());

                                    var endDate = new Date(req.body.endDate)
                                    var newEndDate = new Date();
                                    newEndDate.setDate(endDate.getDate());
                                    newEndDate.setMonth(endDate.getMonth());
                                    newEndDate.setFullYear(endDate.getFullYear());

                                    if (newEndDate.toISOString() > newStartDate.toISOString() && newStartDate.toISOString() > date.toISOString()) {
                                        var celular = {
                                            model: req.body.model.replace(/\s/g, '').toUpperCase(),
                                            price: req.body.price,
                                            brand: req.body.brand.replace(/\s/g, '').toUpperCase(),
                                            startDate: req.body.startDate,
                                            endDate: req.body.endDate,
                                            colorId: req.body.colorId,
                                            code: req.body.code.replace(/\s/g, '').toUpperCase()
                                        };

                                        Celular.update(celular, {
                                            where: {
                                                id: id
                                            }
                                        }).then(data => {
                                            if (data == 1) {
                                                res.json({
                                                    message: "Celular atualizado com sucesso!!"
                                                });
                                            } else {
                                                res.json({
                                                    message: "Não foi possível atualizar o Celular. Celular não encontrado " +
                                                        "ou não possui dados suficientes para atualizá-lo."
                                                })
                                            }
                                        }).catch(err => {
                                            res.json("Erro ao tentar atualizar celular.")
                                        });
                                    } else {
                                        res.json({message: "A data do início da venda deve ser posterior " +
                                                "ao dia 25/12/2018, e a data de fim da venda deve ser posterior a data de início."})
                                    }
                                } else {
                                    res.json({message: "Dados inválidos. Código do produto já existe."})
                                }
                            }).catch(err => {
                                res.status(404).send(err.message)
                            });

                        }).catch(err => {
                            res.json(err.message || {message: "Algum erro ocrreu ao tentar atualizar o celular."});
                        });

                    } else {
                        res.json({message: "Dados inválidos. O código do celular deve ter apenas 8 caracteres."})
                    }
                } else {
                    res.json({message: "Dados inválidos. A marca do celular deve conter no mínimo 2 caracteres e no " +
                            "máximo 255."});
                }
            } else {
                res.json({message: "Dados inválidos. O modelo do celular deve conter no mínimo 2 caracteres e no máximo 255"});
            }
        } else {
            res.json({message: "Dados inválidos. O preço do produto deve ser maior do que R$0000,00"});
        }
    } else {
        res.json({message: "O conteúdo não pode estar vazio."});
    }

}

exports.deleteCelular = (req, res) => {

    const id = req.params.id;

    Celular.destroy({
        where: {
            id: id
        }
    }).then(data => {
            if (data == 1) {
                res.send({message: "Celular foi deletado com sucesso!!"})
            } else {
                res.send({message: "Não foi possível deletar o celular. Celular não encontrado."})
            }
        }).catch(err => {
            res.status(404).json({
                message: "Não foi possível deleter o celular com id=" + id
            })
        })
}
