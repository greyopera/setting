define([
    'jquery'
], function ($) {
    "use strict";

    var spaceAPI = {

        isTransaction: false,
        /**
         * Space 카테고리 가져오기
         * @returns {Promise}
         */
        getCategory: function () {

            var model;

            if (this.isTransaction) {
                alert('카테고리를 가져오는 중입니다.');
                return;
            }

            this.isTransaction = true;

            var promise = new Promise(function (resolve, reject) {

                $.ajax({
                    url: '/v1/space/spaces/categories',
                    method: "GET"
                }).then(function (res) {

                    spaceAPI.isTransaction = false;
                    resolve(res);

                }, function (res) {

                    spaceAPI.isTransaction = false;
                    reject(res);

                });
            });

            return promise;
        },

        getListRecommend: function (params) {

            var model;

            var promise = new Promise(function (resolve, reject) {

                params['float_type'] = 'best_like'; // notification
                params['user_info_id'] = spaceAPI._getUserId();

                $.ajax({
                    url: '/v1/space/spaces/list/float',
                    method: "GET",
                    data: params
                }).then(function (res) {

                    resolve(res);

                }, function (res) {

                    reject(res);

                });
            });

            return promise;
        },

        getListNotice: function (params) {

            var model;

            var promise = new Promise(function (resolve, reject) {

                params['float_type'] = 'notification'; // notification
                params['user_info_id'] = spaceAPI._getUserId();

                $.ajax({
                    url: '/v1/space/spaces/list/float',
                    method: "GET",
                    data: params
                }).then(function (res) {

                    resolve(res);

                }, function (res) {

                    reject(res);

                });
            });

            return promise;
        },

        /**
         * Space 목록 가져오기
         * @param {Object} params - limit:필요한 목록 개수, ordering:정렬 상태값, space_type:페이지ID
         * @returns {Promise}
         */
        getList: function (params) {

            var params = $.extend({}, params);
            params['user_info_id'] = spaceAPI._getUserId();

            if (this.isTransaction) {

                alert('목록을 가져오는 중입니다.');
                return;

            }

            this.isTransaction = true;

            var promise = new Promise(function (resolve, reject) {

                $.ajax({

                    url: '/v1/space/spaces/list',
                    method: "GET",
                    data: params

                }).then(function (res) {


                    spaceAPI.isTransaction = false;
                    resolve({model: res, params: params});

                }, function (res) {

                    spaceAPI.isTransaction = false;
                    reject(res);

                });
            });

            return promise;

        },

        getView: function (params) {

            params['user_info_id'] = spaceAPI._getUserId();

            if (this.isTransaction) {

                alert('보기화면을 가져오는 중입니다.');
                return;

            }

            this.isTransaction = true;

            var promise = new Promise(function (resolve, reject) {

                $.ajax({

                    url: '/v1/space/spaces/detail/' + params.ID,
                    method: "GET",
                    data: params

                }).then(function (res) {

                    spaceAPI.isTransaction = false;
                    resolve({model: res});

                }, function (res) {

                    spaceAPI.isTransaction = false;
                    reject(res);

                });
            });

            return promise;
        },

        getModify: function (ID) {

            var params = {
                'user_info_id': spaceAPI._getUserId()
            };

            var promise = new Promise(function (resolve, reject) {

                $.ajax({
                    url: '/v1/space/spaces/detail/' + ID,
                    method: "GET",
                    data: params
                }).then(function (res) {
                    resolve(res);
                }, function (res) {
                    reject(res);
                });

            });

            return promise;
        },

        getWrite: function () {

            var promise = new Promise(function (resolve, reject) {

                $.ajax({
                    url: '/v1/space/spaces/categories',
                    method: "GET"
                }).then(function (res) {

                    spaceAPI.isTransaction = false;
                    resolve({category: res});

                }, function (res) {

                    spaceAPI.isTransaction = false;
                    reject(res);

                });

            });

            return promise;

        },

        register: function (params) {

            var params = params;
            params['user_info_id'] = spaceAPI._getUserId();

            if (this.isTransaction) {
                alert('글등록 중입니다.');
                return;
            }

            this.isTransaction = true;

            var promise = new Promise(function (resolve, reject) {


                $.ajax({
                    url: '/v1/space/spaces/list',
                    method: "POST",
                    data: params

                }).then(function (res) {

                    spaceAPI.isTransaction = false;
                    resolve({model: res});

                }, function (res) {

                    spaceAPI.isTransaction = false;
                    reject(res);

                });
            });

            return promise;
        },

        modify: function (params) {

            params['user_info_id'] = spaceAPI._getUserId();

            if (this.isTransaction) {
                alert('글등록 중입니다.');
                return;
            }

            this.isTransaction = true;

            var promise = new Promise(function (resolve, reject) {

                $.ajax({
                    url: '/v1/space/spaces/detail/' + params.id,
                    method: "PUT",
                    data: params

                }).then(function (res) {

                    spaceAPI.isTransaction = false;
                    resolve({model: res});

                }, function (res) {

                    spaceAPI.isTransaction = false;
                    reject(res);

                });
            });

            return promise;
        },


        deleteList: function (idArray) {

            var promiseGroup = [],
                idArray = (idArray instanceof Array) ? idArray : [idArray];

            function promiseProcess(id) {

                return new Promise(function (resolve, reject) {

                    $.ajax({
                        url: '/v1/space/spaces/detail/' + id,
                        method: "DELETE",
                        success: function (res) {

                            spaceAPI.isTransaction = false;
                            resolve({model: res});

                        },
                        error: function (xhr, ajaxOptions, thrownError) {

                            spaceAPI.isTransaction = false;
                            reject(res);

                        }

                    });

                });
            }

            for (var idx in idArray) {
                promiseGroup.push(promiseProcess(idArray[idx]));
            }

            return Promise.all(promiseGroup);
        },

        changePolicy: function (idArray, status) {

            var promiseGroup = [],
                params = {
                    'is_public': status,
                    'user_info_id': spaceAPI._getUserId()
                };


            function promiseProcess(value) {

                return new Promise(function (resolve, reject) {

                    params['space_attr'] = value.space_attr;

                    $.ajax({
                        url: '/v1/space/spaces/detail/' + value.id,
                        method: "PUT",
                        data: params,
                        success: function (res) {
                            spaceAPI.isTransaction = false;
                            resolve({model: res});
                        },
                        error: function (xhr, ajaxOptions, thrownError) {

                            if(xhr.status == 406) {
                                reject({subject: value.subject, id: value.id, message: xhr.responseText});
                            }

                            spaceAPI.isTransaction = false;
                        }
                    });

                });
            }

            for (var idx in idArray) {
                promiseGroup.push(promiseProcess(idArray[idx]));
            }

            return Promise.all(promiseGroup);
        },

        comment: {

            getList: function (params) {

                var that = this;

                params['user_info_id'] = spaceAPI._getUserId();

                if (spaceAPI.isTransaction) {
                    alert('댓글 목록을 가져오는 중입니다.');
                    return;
                }

                spaceAPI.isTransaction = true;

                var promise = new Promise(function (resolve, reject) {

                    $.ajax({
                        url: '/v1/space/spaces/comments/' + params.ID,
                        method: "GET",
                        data: params

                    }).then(function (res) {

                        spaceAPI.isTransaction = false;
                        resolve({model: res, params: params});


                    }, function (res) {

                        spaceAPI.isTransaction = false;
                        reject(res);

                    });
                });

                return promise;

            },

            delete: function (ID) {

                var promise = new Promise(function (resolve, reject) {

                    $.ajax({
                        url: '/v1/space/spaces/comments/detail/' + ID,
                        method: "DELETE"

                    }).then(function (res) {

                        spaceAPI.isTransaction = false;
                        resolve({model: res});

                    }, function (res) {

                        spaceAPI.isTransaction = false;
                        reject(res);

                    });

                });

                return promise;
            },

            register: function (params) {

                params['user_info_id'] = spaceAPI._getUserId();

                var promise = new Promise(function (resolve, reject) {

                    $.ajax({
                        url: '/v1/space/spaces/comments',
                        method: "POST",
                        data: params
                    }).then(function (res) {

                        spaceAPI.isTransaction = false;
                        resolve({model: res});

                    }, function (res) {

                        spaceAPI.isTransaction = false;
                        reject(res);

                    });

                });

                return promise;
            },

            update: function (params) {
                params['user_info_id'] = spaceAPI._getUserId();

                var promise = new Promise(function (resolve, reject) {

                    $.ajax({
                        url: '/v1/space/spaces/comments/detail/' + params.commentId,
                        method: "PUT",
                        data: params
                    }).then(function (res) {

                        spaceAPI.isTransaction = false;
                        resolve({model: res});

                    }, function (res) {

                        spaceAPI.isTransaction = false;
                        reject(res);

                    });

                });

                return promise;
            }

        },

        setRecommend: function (params) {

            params['user_info_id'] = spaceAPI._getUserId();

            var promise = new Promise(function (resolve, reject) {

                $.ajax({
                    url: '/v1/space/spaces/detail/' + params.ID,
                    method: "PUT",
                    data: params

                }).then(function (res) {

                    spaceAPI.isTransaction = false;
                    resolve({model: res});

                }, function (res) {

                    spaceAPI.isTransaction = false;
                    reject(res);

                });

            });

            return promise;
        },


        removeRecommend: function (params) {

            params['user_info_id'] = spaceAPI._getUserId();

            var promise = new Promise(function (resolve, reject) {

                $.ajax({
                    url: '/v1/space/spaces/detail/' + params.ID,
                    method: "PUT",
                    data: params

                }).then(function (res) {

                    spaceAPI.isTransaction = false;
                    resolve({model: res});

                }, function (res) {

                    spaceAPI.isTransaction = false;
                    reject(res);

                });

            });

            return promise;
        },


        _getUserId: function () {
            return $("#spaceBbs").data('user-id')
        }

    };

    return spaceAPI;


});
